// Importing required modules
import { SerializableParam, selectorFamily } from "recoil";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import toast from "react-hot-toast";

// Interface for API error response data
export interface ApiErrorResponseData {
  errors?: Array<string>;
  message: string;
  name: string;
}

// Type for request parameters
export type RequestParams = {
  [key: string]: SerializableParam;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file?: any;
  handleErrorsAutomatically?: boolean;
};

// Function to check if the response is OK
export const isResponseOk = <T>(
  response: AxiosResponse<T> | AxiosError | null | unknown
): response is AxiosResponse<T> => {
  const axiosResponse = response as AxiosResponse;
  if (!axiosResponse) return false;
  return axiosResponse.status === 200 || axiosResponse.status === 201;
};

// Function to check if the API response is an Axios error
export const isApiResponseAxiosError = (
  axiosResponse: AxiosResponse | AxiosError | null | unknown
): axiosResponse is AxiosError<ApiErrorResponseData> => {
  return (
    axiosResponse !== null &&
    (axiosResponse as AxiosError).isAxiosError !== undefined
  );
};

// Function to handle errors
export const handleErrors = (
  err: AxiosError,
  handleErrorsAutomatically = true
): AxiosError => {
  if (handleErrorsAutomatically) {
    toast.error(err.message);
  }
  console.error(err);
  return err;
};

// Function to create an API client for unauthenticated requests
export const makeApiClient = (
  handleErrorsAutomatically = true
): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ICRC_API_URL,
  });
  apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
      return handleErrors(err, handleErrorsAutomatically);
    }
  );
  return apiClient;
};

// Selector family for API GET requests
export const ApiGet = selectorFamily({
  key: "ApiGet",
  get:
    <T>(params: RequestParams) =>
    async (): Promise<AxiosResponse<T>> => {
      const { config, url, handleErrorsAutomatically = true } = params;
      const apiClient = makeApiClient(handleErrorsAutomatically);
      const response = await apiClient.get<T>(url, config);
      return response;
    },
});

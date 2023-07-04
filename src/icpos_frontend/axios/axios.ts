import { SerializableParam, selectorFamily } from "recoil";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import toast from "react-hot-toast";

export interface ApiErrorResponseData {
  errors?: Array<string>;
  message: string;
  name: string;
}

export const isResponseOk = <T>(
  response: AxiosResponse<T> | AxiosError | null | unknown
): response is AxiosResponse<T> => {
  const axiosResponse = response as AxiosResponse;
  if (!axiosResponse) return false;
  return axiosResponse.status === 200 || axiosResponse.status === 201;
};

export const isApiResponseAxiosError = (
  axiosResponse: AxiosResponse | AxiosError | null | unknown
): axiosResponse is AxiosError<ApiErrorResponseData> => {
  return (
    axiosResponse !== null &&
    (axiosResponse as AxiosError).isAxiosError !== undefined
  );
};

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

/**
 * Handle error responses (excluding initial 401 response). Any HTTP Code which is not 2xx will be considered as error
 *
 * @param err
 */
export const handleErrors = (
  err: AxiosError,
  handleErrorsAutomatically = true
): AxiosError => {
  // Handling errors automatically means the error will be displayed to the user with a toast.
  // If not handled automatically, the error will just be logged to the console and returned.
  if (handleErrorsAutomatically) {
    toast.error(err.message);
  }
  console.error(err);
  return err;
};

/**
 * Api client for unathenticated requests
 *
 * @returns
 */
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

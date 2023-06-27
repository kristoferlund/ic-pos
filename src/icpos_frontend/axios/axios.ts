import { SerializableParam, selectorFamily } from "recoil";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

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

// type RequestDataParam = {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   file?: any;
// };

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
  if (!handleErrorsAutomatically) {
    console.error(err);
    return err;
  }

  // if (err?.response) {
  //   // If the response is a json blob, parse it and display the error message
  //   if (isJsonBlob(err.response.data)) {
  //     void (err.response.data as Blob).text().then((text) => {
  //       const json = JSON.parse(text);
  //       toast.error(json.message);
  //     });
  //   } else if ((err.response.data as Error).message) {
  //     toast.error((err.response.data as Error).message);
  //   } else {
  //     toast.error('Something went wrong');
  //   }
  // } else if (!err.response) {
  //   toast.error('Server did not respond');
  // }
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

export const ApiGet = selectorFamily<AxiosResponse<unknown>, RequestParams>({
  key: "ApiGet",
  get: (params: RequestParams) => async (): Promise<AxiosResponse<any>> => {
    const { config, url, handleErrorsAutomatically = true } = params;
    const apiClient = makeApiClient(handleErrorsAutomatically);
    const response = await apiClient.get(url, config);
    return response;
  },
});

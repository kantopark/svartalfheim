import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const serverUrl = !!process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : `${window.location.protocol}//${window.location.hostname}:7050`;

export class ApiClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.client = axios.create({ baseURL, ...config });
  }

  public get = <R = void>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
    this.execute<R>("GET", url, null, config);

  public put = <R = void>(url: string, data?: any, config?: AxiosRequestConfig) =>
    this.execute<R>("PUT", url, data, config);

  public post = <R = void>(url: string, data?: any, config?: AxiosRequestConfig) =>
    this.execute<R>("POST", url, data, config);

  public delete = <R = void>(url: string, data?: any, config?: AxiosRequestConfig) =>
    this.execute<R>("DELETE", url, data, config);

  private execute<R>(
    method: "GET" | "PUT" | "POST" | "DELETE",
    url: string,
    data?: any,
    config?: any
  ): Promise<AxiosResponse<R>> {
    url = url.replace(/^\//, "").replace(/\/$/, "");

    switch (method) {
      case "GET":
        return this.client.get(url, config);
      case "PUT":
        return this.client.put(url, config);
      case "POST":
        return this.client.post(url, data, config);
      case "DELETE":
        if (data) {
          config = { ...config, data };
        }
        return this.client.delete(url, config);
    }
  }
}

export const api = new ApiClient(`${serverUrl}/api`);

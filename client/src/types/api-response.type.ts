export interface AxiosResponse {
  data: {
    [x: string]: any;
    error?: string;
  };
}

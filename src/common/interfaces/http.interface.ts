import { AxiosBasicCredentials } from 'axios';

export interface IRequestHttp {
  baseUrl: string;
  endpoint?: string;
  config?: {
    headers?: any;
    auth?: AxiosBasicCredentials;
  };
  query?: { [key: string]: any };
  data?: any;
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { stringify } from 'qs';

import { HttpMethodEnum } from 'src/common/enums/http.enum';
import { IRequestHttp } from 'src/common/interfaces/http.interface';

@Injectable()
export class HttpRequestService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
    this.axiosRetryInit(this.axios);
  }

  private axiosRetryInit(axios: AxiosInstance) {
    return axiosRetry(axios, {
      retries: 3,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.code === 'ECONNABORTED' ||
        error.code === 'ENOTFOUND',
      retryDelay: () => 1000,
    });
  }

  private async send(method: HttpMethodEnum, reqProps: IRequestHttp) {
    const header = reqProps?.config?.headers || {};
    const options: AxiosRequestConfig = {
      timeout: 90 * 1000, // timeout in ms
      baseURL: reqProps?.baseUrl,
      url: reqProps?.endpoint || '/',
      method,
      headers: {
        'Content-type': 'application/json',
        device: 3,
        version: 1.5,
        key: 'client03-TSbs94s3q5H9PP2yNPBr',
        ...header,
      },
      params: reqProps?.query,
      data: reqProps?.data,
      paramsSerializer: (params) => stringify(params),
      auth: reqProps?.config?.auth,
    };

    const result = await this.axios.request(options);
    return result.data;
  }

  async GET<Response>(props?: IRequestHttp): Promise<Response> {
    console.log('Ir', props);

    return await this.send(HttpMethodEnum.GET, props);
  }

  async POST<Response>(props?: IRequestHttp): Promise<Response> {
    console.log('posts', props);
    return await this.send(HttpMethodEnum.POST, props);
  }

  async PUT<Response>(props?: IRequestHttp): Promise<Response> {
    return await this.send(HttpMethodEnum.PUT, props);
  }

  async PATCH<Response>(props?: IRequestHttp): Promise<Response> {
    return await this.send(HttpMethodEnum.PATCH, props);
  }

  DELETE<Response>(props?: IRequestHttp): Promise<Response> {
    return this.send(HttpMethodEnum.DELETE, props);
  }
}

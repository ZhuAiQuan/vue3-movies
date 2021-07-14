/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-06-30 14:03:21
 * @LastEditTime: 2021-07-08 15:01:55
 * @LastEditors: zaq
 * @Reference:
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
import type { Response } from '../types'

// declare module 'axios' {
//   export interface AxiosResponse<T = any> extends Promise<T> {}
// }

type Queue = {
  [key: string]: boolean;
};
type Method = "post" | "get";
interface Config {
  url: string;
  method: Method;
  data?: unknown;
  params?: unknown;
  headers?: Headers
}
interface Headers {
  [prop: string]: string
}
interface AxiosRequestCofigExtends extends AxiosRequestConfig {
  requestKey?: string;
}

const timeout = 10 * 1000;
const pendingRequests: Map<string, any> = new Map(); // 拦截重复请求

class Request {
  private baseURL: string;
  private queue: Queue;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.queue = {};
  }
  getConfig() {
    return {
      baseURL: this.baseURL,
      timeout,
      headers: {
        //
      },
    };
  }
  destroy(url: string) {
    delete this.queue[url];
  }
  interceptors(instance: AxiosInstance, url: string) {
    instance.interceptors.request.use(
      (config: AxiosRequestCofigExtends) => {
        // 重复请求拦截判断
        const requestKey = `${config.url}/${JSON.stringify(
          config.params
        )}/${JSON.stringify(config.data)}&request_type=${config.method}/${JSON.stringify(config.headers)}`; // map key值
        if (pendingRequests.has(requestKey)) {
          config.cancelToken = new axios.CancelToken((cancel) => {
            // cancel 函数的参数会作为 promise 的 error 被捕获
            cancel(`重复的请求被主动拦截: ${requestKey}`);
          });
        } else {
          pendingRequests.set(requestKey, config);
          config.requestKey = requestKey;
        }
        this.queue[url] = true;
        return config;
      },
      (error: unknown) => {
        // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
        pendingRequests.clear();
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res) => {
        const requestKey = (res.config as any).requestKey;
        pendingRequests.delete(requestKey);
        this.destroy(url);
        // const data = res.data;
        return res;
      },
      (error) => {
        if (axios.isCancel(error)) {
          return Promise.reject(error);
        }
        pendingRequests.clear();
        return Promise.reject(error);
      }
    );
  }
  request(config: Config): AxiosPromise<Response> {
    const instance = axios.create();
    const option = Object.assign(this.getConfig(), config);
    this.interceptors(instance, config.url);
    return instance(option);
  }
}

export default Request;

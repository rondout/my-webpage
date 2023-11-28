/*
 * Copyright © 2018-2021 Chengdu Vantron Technology Co., Ltd. All rights reserved.
 */
import axios from "axios"; // 引入axios模块
import { AxiosRequestConfig } from "axios";
import {
  BaseResponse,
  RespCode,
  STORAGE_TOKEN_KEY,
} from "../models/config.model";

// axios.defaults.baseURL = "http://192.168.16.120:8080";
axios.defaults.baseURL = "http://localhost:8000";

axios.defaults.timeout = 60000; // 设置请求超时时间

axios.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      const token = window.localStorage.getItem(STORAGE_TOKEN_KEY);
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response?.status?.toString().startsWith("20")) {
      if (response.data?.code === RespCode.SUCCESS) {
        return Promise.resolve(response.data.data);
      } else {
        return Promise.reject(response.data);
      }
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // 如果检测到返回的401或者token有效时间已经过期就跳转到登录页面
    if (error?.response?.status === 401) {
      //   window.location.his = "/login";
      alert("没有登录");
    }
    if (error?.response) {
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default class HttpController {
  get<T = any>(url: string, config: AxiosRequestConfig<any> = {}) {
    return axios.get<any, T>(url, config);
  }

  post<T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig<any> = {}
  ) {
    return axios.post<any, T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return axios.put<any, T>(url, data, config);
  }

  delete<T = any>(url: string, params?: any) {
    return axios.delete<any, T>(url, { data: params });
  }

  all(promiseArray: Promise<any>[]) {
    return new Promise((resolve, reject) => {
      Promise.all(promiseArray)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

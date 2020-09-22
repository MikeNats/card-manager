import  { AxiosRequestConfig } from 'axios';

export const isMock = (axiosRequestConfig: AxiosRequestConfig): AxiosRequestConfig => {
  if ((axiosRequestConfig.url || '').includes('mock')) {
      const newAxiosConfig: AxiosRequestConfig = Object.assign(axiosRequestConfig, 
        {url: `${(axiosRequestConfig.url || '')}-${axiosRequestConfig.method}.json`},
        {method: 'get'})
        return newAxiosConfig;
  }
  return axiosRequestConfig;
}
import axios, {AxiosRequestConfig}  from 'axios'
import { isMock } from './utils'

export const fetchData = (config: AxiosRequestConfig): Promise<any> => 
  axios(isMock(config))
 
import axios from 'axios'
import cmsConfig from './.cms.config.json'

export const fetchCms = async<T>(endPoint: string): Promise<T> => {
  const key = {
    headers: { 'X-API-KEY':  cmsConfig.get_api_key },
  }
  const response = await axios.get<any>(`https://categorys-bff-min.microcms.io/api/v1/${endPoint}`, key)
  const responseData = response.data
  return responseData
}

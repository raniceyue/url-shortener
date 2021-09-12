import axios from 'axios'
import dotenv from 'dotenv'

import { API_BASEURL } from '../util/global'

dotenv.config()

export interface Url {
  short: string;
  long: string;
}

/**
 * Function that makes API call to create short link
 * @param data - Date used to create short link, contains hash and long link
 * @returns Promise<any> - API response data
 */
export async function createShort(data: Url): Promise<any> {
  const res = await axios
    .post(API_BASEURL, data)
    .then((res: any) => {
      return res
    })
    .catch((error) => {
      return error.response
    })
  return res
}

/**
 * Function that makes API call to retrieve long link based on hash provided
 * @param short - Hash to get long link
 * @returns Promise<any> - API response data
 */
export async function getLong(short: string): Promise<any> {
  const res = await axios
    .get(API_BASEURL + short)
    .then((res: any) => {
      return res
    })
    .catch((error: any) => {
      return error.response
    })
  return res
}
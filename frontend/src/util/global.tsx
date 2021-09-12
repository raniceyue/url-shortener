import dotenv from 'dotenv'

dotenv.config()

const IS_PROD = process.env.NODE_ENV === 'production' 

export const API_BASEURL: string = (IS_PROD ? process.env.REACT_APP_PROD_BASEURL : process.env.REACT_APP_LOCAL_BASEURL) + 'api/urls/'
export const SHORT_BASEURL: string | undefined = IS_PROD ? process.env.REACT_APP_PROD_BASEURL : process.env.REACT_APP_LOCAL_BASEURL
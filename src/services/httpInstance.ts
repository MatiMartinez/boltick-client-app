import axios from 'axios';
export type { AxiosResponse as ApiResponse } from 'axios';

const httpInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://aohlv2yk11.execute-api.us-east-1.amazonaws.com/api',
});

export default httpInstance;

import axios from "axios";
export type { AxiosResponse as ApiResponse } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    isPrivate?: boolean;
  }
}

let currentToken: string | null = null;

const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpInstance.interceptors.request.use(
  (config) => {
    if (config.isPrivate && currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const updateAuthToken = (token: string | null) => {
  currentToken = token;
};

export default httpInstance;

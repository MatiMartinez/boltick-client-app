import axios from "axios";
export type { AxiosResponse as ApiResponse } from "axios";

const httpInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://49saj7x6z9.execute-api.us-east-1.amazonaws.com/api",
});

export default httpInstance;

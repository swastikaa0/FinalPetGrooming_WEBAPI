import axios from "axios";
import { getTokenCookie } from "../cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASIC
    || "http://localhost:5000";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
   
});
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getTokenCookie();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if (!(config.data instanceof FormData) && !config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
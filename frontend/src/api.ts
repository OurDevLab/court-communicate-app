import axios from "axios";

import { ConfigVariables, RoutesPaths, ServerStatuses } from "./config";

const { serverURL, tokenKey, authHeader } = ConfigVariables;
const { LOGIN } = RoutesPaths;
const { UNAUTHORIZED } = ServerStatuses;

const api = axios.create({
    baseURL: serverURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
        config.headers.Authorization = `${authHeader} ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === UNAUTHORIZED) {
            localStorage.removeItem(tokenKey);
            window.location.href = LOGIN;
        }
        return Promise.reject(error);
    }
);

export default api;

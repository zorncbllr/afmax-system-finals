import { refreshToken } from "@/features/auth/api/services";
import axios from "axios";

export const SERVER_BASEURL = "http://localhost";

export const axiosInstance = axios.create({
  baseURL: `${SERVER_BASEURL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let firstFetch = true;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = error.response;

    if (response.status === 401 && firstFetch) {
      firstFetch = false;

      try {
        const newResponse = await refreshToken();

        localStorage.setItem("token", newResponse.accessToken);
        const refetchedResponse = await axiosInstance(error.config);

        return Promise.resolve(refetchedResponse);
      } catch (err: any) {}
    }

    firstFetch = true;

    return Promise.reject(error);
  }
);

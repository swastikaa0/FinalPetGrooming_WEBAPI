import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const getActiveServices = async () => {
  try {
    const response = await axiosInstance.get(
      API.SERVICE.GET_ACTIVE
    );

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch services"
    );
  }
};
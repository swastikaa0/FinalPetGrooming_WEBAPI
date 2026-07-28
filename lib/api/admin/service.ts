import axiosInstance from "../axios-instance";
import { API } from "../endpoints";

export const getAllServices = async ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const response = await axiosInstance.get(
      API.ADMIN.SERVICES.GET_ALL,
      {
        params: {
          page,
          limit,
          search,
        },
      }
    );

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch services"
    );
  }
};

export const getServiceById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      API.ADMIN.SERVICES.GET_BY_ID(id)
    );
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch service"
    );
  }
};

export const createService = async (data: FormData) => {
  try {
    const response = await axiosInstance.post(
      API.ADMIN.SERVICES.CREATE,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to create service"
    );
  }
};

export const updateService = async (
  id: string,
  data: FormData
) => {
  try {
    const response = await axiosInstance.put(
      API.ADMIN.SERVICES.UPDATE(id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update service"
    );
  }
};

export const deleteService = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      API.ADMIN.SERVICES.DELETE(id)
    );

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to delete service"
    );
  }
};
import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

const extractErrorMessage = (
  error: any,
  fallbackMessage: string
): string => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage
  );
};

export const createPet = async (data: FormData) => {
  try {
    const response = await axiosInstance.post(
      API.PET.CREATE,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      extractErrorMessage(error, "Failed to create pet")
    );
  }
};

export const getMyPets = async () => {
  try {
    const response = await axiosInstance.get(API.PET.GET_ALL);

    return response.data;
  } catch (error: any) {
    throw new Error(
      extractErrorMessage(error, "Failed to fetch pets")
    );
  }
};

export const updatePet = async (
  id: string,
  data: FormData
) => {
  try {
    const response = await axiosInstance.patch(
      API.PET.UPDATE(id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      extractErrorMessage(error, "Failed to update pet")
    );
  }
};

export const deletePet = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      API.PET.DELETE(id)
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      extractErrorMessage(error, "Failed to delete pet")
    );
  }
};
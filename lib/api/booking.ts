import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const createBooking = async (data: any) => {
  const response = await axiosInstance.post(
    API.BOOKING.CREATE,
    data
  );

  return response.data;
};

export const getMyBookings = async () => {
  const response = await axiosInstance.get(
    API.BOOKING.GET_ALL
  );

  return response.data;
};

export const getBookingById = async (id: string) => {
  const response = await axiosInstance.get(
    API.BOOKING.GET_BY_ID(id)
  );

  return response.data;
};

export const updateBooking = async (
  id: string,
  data: any
) => {
  const response = await axiosInstance.patch(
    API.BOOKING.UPDATE(id),
    data
  );

  return response.data;
};

export const cancelBooking = async (id: string) => {
  const response = await axiosInstance.patch(
    API.BOOKING.CANCEL(id)
  );

  return response.data;
};

export const deleteBooking = async (id: string) => {
  const response = await axiosInstance.delete(
    API.BOOKING.DELETE(id)
  );

  return response.data;
};

export const getAllBookings = async () => {
  const response = await axiosInstance.get(
    API.BOOKING.GET_ALL_BOOKINGS
  );

  return response.data;
};


export const adminUpdateBooking = async (
  id: string,
  data: any
) => {
  const response = await axiosInstance.patch(
    API.BOOKING.UPDATE(id),
    data
  );

  return response.data;
};


export const adminDeleteBooking = async (
  id: string
) => {
  const response = await axiosInstance.delete(
    API.BOOKING.DELETE(id)
  );

  return response.data;
};
"use server";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  deleteBooking,
  getAllBookings,
  adminUpdateBooking,
  adminDeleteBooking,
} from "../api/booking";

type ActionResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

const buildResponse = <T>(
  success: boolean,
  message: string,
  data?: T
): ActionResponse<T> => ({
  success,
  message,
  data,
});

export async function handleCreateBooking(data: any) {
  try {
    const response = await createBooking(data);

    return buildResponse(
      true,
      response.message || "Booking created successfully",
      response.data
    );
  } catch (error: any) {
    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to create booking"
    );
  }
}

export async function handleGetMyBookings() {
  try {
    const response = await getMyBookings();
     console.log("BOOKING RESPONSE:", response);
    return buildResponse(
      true,
      response.message || "Bookings fetched successfully",
      response.data
    );
  } catch (error: any) {
    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to fetch bookings"
    );
  }
}

export async function handleGetBookingById(id: string) {
  try {
    const response = await getBookingById(id);

    return buildResponse(
      true,
      response.message || "Booking fetched successfully",
      response.data
    );
  } catch (error: any) {
    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to fetch booking"
    );
  }
}

export async function handleUpdateBooking(
  id: string,
  data: any
) {
  try {
    const response = await updateBooking(id, data);

    return buildResponse(
      true,
      response.message || "Booking updated successfully",
      response.data
    );
  } catch (error: any) {
    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to update booking"
    );
  }
}

export async function handleCancelBooking(id: string) {
  try {
    const response = await cancelBooking(id);

    return buildResponse(
      true,
      response.message || "Booking cancelled successfully",
      response.data
    );
  } catch (error: any) {
    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to cancel booking"
    );
  }
}

export async function handleDeleteBooking(id: string) {
  try {
    const response = await deleteBooking(id);

    return buildResponse(
      true,
      response.message || "Booking deleted successfully",
      response.data
    );
  } catch (error: any) {
    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to delete booking"
    );
  }
}
export async function handleGetAllBookings() {

  try {

    const response = await getAllBookings();

    return buildResponse(
      true,
      response.message || "All bookings fetched successfully",
      response.data
    );

  } catch (error: any) {

    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to fetch all bookings"
    );

  }

}

export async function handleAdminUpdateBooking(
  id: string,
  data: any
) {

  try {

    const response = await adminUpdateBooking(id, data);

    return buildResponse(
      true,
      response.message || "Booking updated successfully",
      response.data
    );

  } catch (error: any) {

    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to update booking"
    );

  }

}
  
export async function handleAdminDeleteBooking(
  id: string
) {

  try {

    const response = await adminDeleteBooking(id);

    return buildResponse(
      true,
      response.message || "Booking deleted successfully",
      response.data
    );

  } catch (error: any) {

    return buildResponse(
      false,
      error?.response?.data?.message || "Failed to delete booking"
    );

  }

}
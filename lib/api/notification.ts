import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const getNotifications = async () => {
  const response = await axiosInstance.get(API.NOTIFICATION.GET_ALL);
  return response.data;
};

export const markNotificationRead = async (id: string) => {
  const response = await axiosInstance.patch(
    API.NOTIFICATION.MARK_AS_READ(id)
  );
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await axiosInstance.patch(
    API.NOTIFICATION.MARK_ALL_READ
  );
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await axiosInstance.delete(
    API.NOTIFICATION.DELETE(id)
  );
  return response.data;
};

export const deleteAllNotifications = async () => {
  const response = await axiosInstance.delete(
    API.NOTIFICATION.DELETE_ALL
  );
  return response.data;
};
"use server";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  deleteAllNotifications,
} from "@/lib/api/notification";

export async function handleGetNotifications() {
  try {
    const response = await getNotifications();

    return {
      success: response.success,
      message: response.message,
      data: response.data || [],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch notifications",
      data: [],
    };
  }
}

export async function handleMarkAsRead(id: string) {
  try {
    const response = await markNotificationRead(id);

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to mark notification as read",
    };
  }
}

export async function handleMarkAllRead() {
  try {
    const response = await markAllNotificationsRead();

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to mark all notifications as read",
    };
  }
}

export async function handleDeleteNotification(id: string) {
  try {
    const response = await deleteNotification(id);

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete notification",
    };
  }
}

export async function handleDeleteAllNotifications() {
  try {
    const response = await deleteAllNotifications();

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete all notifications",
    };
  }
}
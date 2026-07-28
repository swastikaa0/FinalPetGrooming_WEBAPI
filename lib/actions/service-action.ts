"use server";

import { getActiveServices } from "@/lib/api/service";

export const handleGetActiveServices = async () => {
  try {
    const result = await getActiveServices();

    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to fetch services",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch services",
    };
  }
};
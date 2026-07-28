"use server";

import { revalidatePath } from "next/cache";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "@/lib/api/admin/service";

export const handleCreateService = async (data: FormData) => {
  try {
    const result = await createService(data);

    if (result.success) {
      revalidatePath("/admin/services");

      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Service creation failed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Service creation failed",
    };
  }
};

export const handleGetAllServices = async ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const currentPage = page && page > 0 ? page : 1;
    const currentLimit = limit && limit > 0 ? limit : 10;
    const currentSearch = search || "";

    const result = await getAllServices({
      page: currentPage,
      limit: currentLimit,
      search: currentSearch,
    });

    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
        pagination: result.pagination,
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

export const handleGetServiceById = async (id: string) => {
  try {
    const result = await getServiceById(id);

    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to fetch service",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch service",
    };
  }
};

export const handleUpdateService = async (
  id: string,
  data: FormData
) => {
  try {
    const result = await updateService(id, data);

    if (result.success) {
      revalidatePath("/admin/services");

      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update service",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update service",
    };
  }
};

export const handleDeleteService = async (id: string) => {
  try {
    const result = await deleteService(id);

    if (result.success) {
      revalidatePath("/admin/services");

      return {
        success: true,
        message: result.message,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to delete service",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete service",
    };
  }
};
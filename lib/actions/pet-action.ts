"use server";

import { revalidatePath } from "next/cache";

import {
  createPet,
  getMyPets,
  deletePet,
} from "@/lib/api/pet";

export const handleCreatePet = async (formData: FormData) => {
  try {

    const result = await createPet(formData);

    if (result.success) {

      revalidatePath("/pets");

      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message,
    };

  } catch (error: any) {

    return {
      success: false,
      message: error.message,
    };

  }
};

export const handleGetPets = async () => {

  try {

    const result = await getMyPets();

    return result;

  } catch (error: any) {

    return {
      success: false,
      message: error.message,
    };

  }

};

export const handleDeletePet = async (id: string) => {

  try {

    const result = await deletePet(id);

    revalidatePath("/pets");

    return result;

  } catch (error: any) {

    return {
      success: false,
      message: error.message,
    };

  }

};
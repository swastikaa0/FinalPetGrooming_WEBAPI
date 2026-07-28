
"use server";

import { login, register,whoami,updateUser,updatePassword, resetPassword, forgotPassword } from "@/lib/api/auth";
import {
  RegisterFormData,
  LoginFormData,
} from "@/app/(auth)/_components/schema";

import { setTokenCookie, storeUserData } from "@/lib/cookies";
import { revalidatePath } from "next/cache";
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

export async function handleRegisterUser(
  formData: RegisterFormData
): Promise<ActionResponse> {
  try {
    const response = await register(formData);

    if (!response?.success) {
      return buildResponse(
        false,
        response?.message ?? "Unable to register user"
      );
    }

    return buildResponse(
      true,
      response.message,
      response.data
    );
  } catch (err: any) {
    return buildResponse(
      false,
      err?.message ?? "Something went wrong during registration"
    );
  }
}

export async function handleLoginUser(
  credentials: LoginFormData
): Promise<ActionResponse> {
  try {
    const response = await login(credentials);

    if (!response?.success) {
      return buildResponse(
        false,
        response?.message ?? "Authentication failed"
      );
    }

    const { token, user } = response.data;

    await Promise.all([
      setTokenCookie(token),
      storeUserData(user),
    ]);

    return buildResponse(
      true,
      response.message,
      response.data
    );
  } catch (err: any) {
    return buildResponse(
      false,
      err?.message ?? "Unable to login"
    );
  }
}
export const handleWhoami = async () => {  
    try{
        const result = await whoami();
        if(result.success){
            return { success: true, message: result.message, data: result.data }; 
        }else{
            return { success: false, message: result.message || 'Fetch user data failed' };    
        }
    }catch (error: Error | any){
        return { success: false, message: error?.message || 'Fetch user data failed' };
    }
}

export const handleUpdateUser = async (data: FormData) => {
    try{
        const result = await updateUser(data);
        if(result.success){
            revalidatePath("/dashboard/profile");
            return { success: true, message: result.message, data: result.data }; 
        }else{
            return { success: false, message: result.message || 'Update user failed' };    
        }
    }catch (error: Error | any){
        return { success: false, message: error?.message || 'Update user failed' };
    }
}

export const handleUpdatePassword = async (data: any) => {
    try {
        const response = await updatePassword(data);
        return { success: true, message: response.message };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function handleForgotPassword(email: string): Promise<ActionResponse> {
  try {
    const response = await forgotPassword(email);

    return buildResponse(
      true,
      response.message,
      response.data
    );
  } catch (err: any) {
    return buildResponse(
      false,
      err?.message ?? "Failed to send reset link"
    );
  }
}

export async function handleResetPassword(
  token: string,
  password: string,
  confirmPassword: string
): Promise<ActionResponse> {
  try {
    const response = await resetPassword(
      token,
      password,
      confirmPassword
    );

    return buildResponse(
      true,
      response.message,
      response.data
    );
  } catch (err: any) {
    return buildResponse(
      false,
      err?.message ?? "Failed to reset password"
    );
  }
}

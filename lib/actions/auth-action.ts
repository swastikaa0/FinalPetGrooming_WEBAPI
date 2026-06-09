// "use server"; // server side api call
// import { login, register } from "@/lib/api/auth";
// import { RegisterFormData } from "@/app/(auth)/_components/schema";
// import { LoginFormData } from "@/app/(auth)/_components/schema";
// import { setTokenCookie, storeUserData } from "@/lib/cookies";

// export const handleRegisterUser = async (data: RegisterFormData) => {
//     try {
        
//         const result = await register(data);

//         if (result.success) {
//             return { success: true, message: result.message, data: result.data };
//         } else {
//             return { success: false, message: result.message || 'Registration failed' };
//         }
//     } catch (error: Error | any) {
//         return { success: false, message: error?.message || 'Registration failed' };
//     }
// };

// export const handleLoginUser = async (data: LoginFormData) => {
//     try {
        
//         const result = await login(data);

//         //set token 
//         const user =result.data.user;
//         const token =result.data.token;
//         await setTokenCookie(token);
//         await storeUserData(user);
        
//         if (result.success) {
//             return { success: true, message: result.message, data: result.data };
//         } else {
//             return { success: false, message: result.message || 'Login failed' };
//         }
//     } catch (error: Error | any) {
//         return { success: false, message: error?.message || 'Login failed' };
//     }
// };
"use server";

import { login, register } from "@/lib/api/auth";
import {
  RegisterFormData,
  LoginFormData,
} from "@/app/(auth)/_components/schema";
import { setTokenCookie, storeUserData } from "@/lib/cookies";

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
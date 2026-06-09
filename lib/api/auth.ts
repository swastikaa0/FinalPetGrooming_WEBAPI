// import axiosInstance from "./axios-instance";
// import { API } from "./endpoints";

// export const register =async (data:any) => {
//     try{
//         const response=
//         await axiosInstance.post(API.AUTH.REGISTER,data); //path,data
//     return response.data;
//     }
//     catch(error: Error |any){
//         throw new Error(error?.response?.data?.message
//             || 'Registeration failed');


//     }
// }

// export const login =async (data:any) => {
//     try{
//         const response=
//         await axiosInstance.post(API.AUTH.LOGIN,data); //path,data
//     return response.data;
//     }
//     catch(error: Error |any){
//         throw new Error(error?.response?.data?.message
//             || 'Login failed');

        
//     }
// }
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

export const register = async (userData: any) => {
  try {
    const { data } = await axiosInstance.post(
      API.AUTH.REGISTER,
      userData
    );

    return data;
  } catch (error: any) {
    throw new Error(
      extractErrorMessage(error, "User registration failed")
    );
  }
};

export const login = async (credentials: any) => {
  try {
    const { data } = await axiosInstance.post(
      API.AUTH.LOGIN,
      credentials
    );

    return data;
  } catch (error: any) {
    throw new Error(
      extractErrorMessage(error, "User login failed")
    );
  }
};
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

export const whoami = async () => {
    try {
        const response =
            await axiosInstance.get(API.AUTH.WHOAMI); // path, data
        return response.data; // reponse ko body
    } catch (error: Error | any) {
        throw new Error(error?.response?.data?.message
            || 'Fetch user data failed');
    }
}

export const updateUser = async (data: any) => {
    try {
        const response = await axiosInstance
            .patch(
                API.AUTH.UPDATE, 
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // multer api
                    },
                }
            );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error?.response?.data?.message || 'Update user failed');
    }
}
// export const updateUser = async (data: FormData) => {
//     try {
//         const response = await axiosInstance.patch(
//             API.AUTH.UPDATE,
//             data
//         );
//         return response.data;
//     } catch (error: Error | any) {
//         throw new Error(error?.response?.data?.message || 'Update user failed');
//     }
// }

export const updatePassword = async (data: any) => {
    try {
        const response = await axiosInstance.patch(API.AUTH.UPDATE_PASSWORD, data);
        return response.data; 
    }
    catch (error: Error | any) {
        throw new Error(error?.response?.data?.message
            || 'Failed to update password');
    }
}
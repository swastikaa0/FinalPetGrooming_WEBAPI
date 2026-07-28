export const API ={
    AUTH:{
        REGISTER:"/api/v1/auth/register",
        LOGIN:"/api/v1/auth/login",
        WHOAMI:"/api/v1/auth/whoami",
        UPDATE:'/api/v1/auth/update',
         UPDATE_PASSWORD: "/api/v1/auth/update-password",
         FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    },
     ADMIN: {
        USERS: {
            GET_ALL: "/api/v1/admin/users",
            GET_BY_ID: (id: string) => `/api/v1/admin/users/${id}`,
            CREATE: "/api/v1/admin/users",
            UPDATE: (id: string) => `/api/v1/admin/users/${id}`,
            UPDATE_PASSWORD: (id: string) => `/api/v1/admin/users/${id}/password`,
            DELETE: (id: string) => `/api/v1/admin/users/${id}`,
        },
         SERVICES: {
            GET_ALL: "/api/v1/admin/services",
            CREATE: "/api/v1/admin/services",
            GET_BY_ID: (id: string) => `/api/v1/admin/services/${id}`,
            UPDATE: (id: string) => `/api/v1/admin/services/${id}`,
            DELETE: (id: string) => `/api/v1/admin/services/${id}`,
  },
    },
    PET: {
    CREATE: "/api/v1/pets",
    GET_ALL: "/api/v1/pets",
    UPDATE: (id: string) => `/api/v1/pets/${id}`,
    DELETE: (id: string) => `/api/v1/pets/${id}`,
  },

  BOOKING: {
    CREATE: "/api/v1/bookings",

    GET_ALL: "/api/v1/bookings",

     // admin all bookings
  GET_ALL_BOOKINGS:"api/v1/bookings/all",


    GET_BY_ID: (id: string) =>
      `/api/v1/bookings/${id}`,

    UPDATE: (id: string) =>
      `/api/v1/bookings/${id}`,

    CANCEL: (id: string) =>
      `/api/v1/bookings/${id}/cancel`,

    DELETE: (id: string) =>
      `/api/v1/bookings/${id}`,
  },

  SERVICE: {
  GET_ACTIVE: "/api/v1/services/active",
},

NOTIFICATION: {
    GET_ALL: "/api/v1/notifications",
    MARK_ALL_READ: "/api/v1/notifications/read-all",
    DELETE_ALL: "/api/v1/notifications/delete-all",

    MARK_AS_READ: (id:string)=>
        `/api/v1/notifications/${id}/read`,

    DELETE:(id:string)=>
        `/api/v1/notifications/${id}`,
},

  
};
import { axiosInstance } from "./axiosInstance";

/* signup user*/
export const SignupUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/signup", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

/* login user*/
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

/* get Current user*/
export const FetchCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/fetchCurrentUser");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

/* fetch all users */
export const FetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/fetchUsers");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

/* Change user Status */
export const ChangeUserStatus = async (id, status) => {
       try{
          const response = await axiosInstance.put(`/api/users/changeUserStatus/${id}`, {status}
       );
       return response.data;
       } catch (error){
        return error.message;   
     }
};
  
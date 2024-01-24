import { axiosInstance } from "./axiosInstance";

/* add new notification*/
export const AddNotification = async (data) => {
    try{
           const response = await axiosInstance.post("/api/notifications/notify", data);
           return response.data;   
    } catch(error){
           return error.response.data
    }
};
/* get all notifications by user*/
export const FetchAllNotifications = async (filters) => {
    try{
           const response = await axiosInstance.get("/api/notifications/fetchAllNotifications",);
           return response.data;   
    } catch(error){
           return error.response.data
    }
};

/* delete a existing notification  by id*/
export const DeleteNotification = async (id) => {
    try{
           const response = await axiosInstance.delete(`/api/notifications/deleteNotification/${id}`);
           return response.data;   
    } catch(error){
           return error.response.data;
    }
};

/* read/seen/visited all notifications by user */
export const SeenAllNotifications = async () => {
    try{
           const response = await axiosInstance.put("/api/notifications/seenAllNotifications");
           return response.data;   
    } catch(error){
           return error.response.data
    }
};

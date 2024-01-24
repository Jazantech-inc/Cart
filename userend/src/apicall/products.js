import { axiosInstance } from "./axiosInstance";

/* add new product*/
export const AddProduct = async (payload) => {
       try {
              const response = await axiosInstance.post(
                     "/api/products/addProduct",
                     payload
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

/* get all products*/
export const FetchProducts = async (filters) => {
       try {
              const response = await axiosInstance.post(
                     "/api/products/fetchProducts",
                     filters
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

/* update a existing product by id*/
export const UpdateProduct = async (id, payload) => {
       try {
              const response = await axiosInstance.put(
                     `/api/products/updateProduct/${id}`,
                     payload
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

/*  Fetch Product by product id for single product */
export const FetchProductById = async (id) => {
       try {
              const response = await axiosInstance.get(
                     `/api/products/fetchProductById/${id}`
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

/* delete a existing product  by id*/
export const DeleteProduct = async (id) => {
       try {
              const response = await axiosInstance.delete(
                     `/api/products/deleteProduct/${id}`
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

/* Upload Product Image */
export const UploadProductImage = async (payload) => {
       try {
              const response = await axiosInstance.post(
                     "/api/products/uploadImageToProduct",
                     payload
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

export const ChangeProductStatus = async (id, status) => {
       try {
              const response = await axiosInstance.put(
                     `/api/products/changeProductStatus/${id}`,
                     { status }
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

/* Place a new bid*/
export const PlaceNewBid = async (payload) => {
       try {
              const response = await axiosInstance.post("/api/bids/placeNewBid", payload);
              return response.data;
       } catch (error) {
              return error.message;
       }
};

/* fetch all bids */
export const FetchAllBids = async (filters) => {
       try {
              const response = await axiosInstance.post(
                     "/api/bids/fetchAllBids",
                     filters
              );
              return response.data;
       } catch (error) {
              return error.message;
       }
};

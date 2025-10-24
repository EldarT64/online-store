import axiosInstance from "./axios.js";

export const getAllCategories = async () => {
    const response = await axiosInstance.get('/categories/allCategories');
    return response.data;
};
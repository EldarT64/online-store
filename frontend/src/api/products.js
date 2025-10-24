import axiosInstance from "./axios.js";

export const getAllProducts = async () => {
    const response = await axiosInstance.get('/products/allProducts');
    return response.data;
};

export const getProductsByCategory = async (categoryId) => {
    const response = await axiosInstance.get(`/products/category/${categoryId}`);
    return response.data;
};

export const deleteProductById = async (productId) => {
    const response = await axiosInstance.delete(`/products/delete/${productId}`);
    return response.data;
}

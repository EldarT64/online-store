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

export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post("/products/createOrder", orderData);
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Failed to place order. Please try again later.");
    }
};

export const getUserOrders = async () => {
    try {
        const response = await axiosInstance.get("/products/myOrders");
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении заказов пользователя:", error);
        throw new Error("Не удалось получить заказы пользователя");
    }
};
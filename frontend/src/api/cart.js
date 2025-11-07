import axiosInstance from './axios.js';

export const addToCart = async (productId, quantity = 1) => {
    const response = await axiosInstance.post('/cart/add', { productId, quantity });
    return response.data; // возвращаем обновлённую корзину
};

export const getCart = async () => {
    const response = await axiosInstance.get('/cart/getCart');
    return response.data; // возвращает корзину с товарами
};

export const removeFromCart = async (productId) => {
    const response = await axiosInstance.delete(`/cart/remove/${productId}`);
    return response.data; // возвращает обновлённую корзину
};

export const clearCart = async () => {
    const response = await axiosInstance.delete('/cart/clear');
    return response.data;
};

export const updateCart = async (items) => {
    const response = await axiosInstance.put("/cart/update", { items });
    return response.data;
};

export const getProductById = async (id) => {
    const res = await axiosInstance.get(`/cart/product/${id}`);
    return res.data;
};
import axiosInstance from "./axios.js";

// Получить все товары из вишлиста конкретного пользователя
export const getWishlistByUser = async (userId) => {
    const response = await axiosInstance.get(`/wishlist/${userId}`);
    return response.data;
};

// Добавить товар в вишлист
export const addToWishlist = async (userId, productId) => {
    const response = await axiosInstance.post("/wishlist/add", { userId, productId });
    return response.data;
};

// Удалить товар из вишлиста
export const removeFromWishlist = async (userId, productId) => {
    const response = await axiosInstance.delete("/wishlist/remove", {
        data: { userId, productId },
    });
    return response.data;
};

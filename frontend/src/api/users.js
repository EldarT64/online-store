import axiosInstance from './axios.js';
import config from './config.js';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    localStorage.setItem(config.TOKEN_KEY, response.data.token);
    return response.data.user;
};

export const loginUser = async (userData) => {
    const response = await axiosInstance.post('/auth/login', userData);
    localStorage.setItem(config.TOKEN_KEY, response.data.token);
    return response.data.user;
};

export const getMe = async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data.user;
};

export const updateProfile = async ({ name, email, currentPassword, newPassword }) => {
    const body = {};
    if (name) body.name = name;
    if (email) body.email = email;
    if (currentPassword && newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
    }

    const response = await axiosInstance.put('/auth/update-profile', body);

    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.message || 'Ошибка обновления профиля');
    }

    return response.data.user; // просто возвращаем пользователя
};


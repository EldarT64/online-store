import { create } from 'zustand';
import {registerUser, loginUser, getMe} from '../api/users.js';

const useUserStore = create((set) => ({
    isGetMeLoading: true,
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,

    register: async ({ name, email, password }) => {
        set({ loading: true, error: null });

        if (!name || !email || !password) {
            set({ error: 'Все поля обязательны', loading: false });
            return false;
        }
        if (password.length < 6) {
            set({ error: 'Пароль должен быть не менее 6 символов', loading: false });
            return false;
        }

        try {
            const user = await registerUser({ name, email, password });
            set({ user, token: localStorage.getItem('token'), loading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Ошибка сервера',
                loading: false
            });
            return false;
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
            const user = await loginUser({ email, password });
            set({ user, token: localStorage.getItem('token'), loading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Ошибка сервера',
                loading: false
            });
            return false;
        }
    },

    clearLoginAndRegisterError: () => set({error: null}),

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    loadUser: async () => {
        set({ isGetMeLoading: true });
        const token = localStorage.getItem('token');
        if (!token) {
            set({ isGetMeLoading: false });
            return;
        }
        try {
            const user = await getMe();
            set({ user, isGetMeLoading: false });
        } catch (err){
            console.error('loadUser error:', err?.response?.data || err.message);
            set({ user: null, isGetMeLoading: false });
        }
    }
}));

export default useUserStore;

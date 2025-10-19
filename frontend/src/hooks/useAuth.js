import useUserStore from '../store/auth.js';
import React from "react";

export const useAuth = () => {
    const { user, token, loadUser, loading, error } = useUserStore();

    React.useEffect(() => {
        if (!user && token) {
            loadUser();
        }
    }, [user, token, loadUser]);

    return {
        data: user,
        isLoading: loading,
        isError: !!error,
    };
};

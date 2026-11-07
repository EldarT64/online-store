const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
    IMAGE_BASE_URL: import.meta.env.VITE_IMAGE_BASE_URL ?? 'http://localhost:8000',
    TOKEN_KEY: 'token',
};

export default config;

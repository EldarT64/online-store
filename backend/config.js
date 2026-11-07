import 'dotenv/config';

const config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/online-shop',
    jwtSecret: process.env.JWT_SECRET || 'my_secret_jwt',
    port: Number(process.env.PORT) || 8000
};

export default config;

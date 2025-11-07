import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import config from "./config.js";

dotenv.config();

const categories = [
    'Phones',
    'Computers',
    'Watches',
    'Cameras',
    'Headphones',
    'Gaming'
];

const seedCategories = async () => {
    try {
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        // Удаляем существующие категории
        await Category.deleteMany({});
        console.log('Existing categories removed');

        // Создаем новые категории
        const createdCategories = await Category.insertMany(
            categories.map(name => ({ name }))
        );

        console.log('Categories seeded:', createdCategories);
        process.exit();
    } catch (err) {
        console.error('Error seeding categories:', err);
        process.exit(1);
    }
};

seedCategories();

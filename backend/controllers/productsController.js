import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении продуктов' });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.find({ category: id }).populate('category');
        res.status(200).json(products);
    } catch (error) {
        console.error('Ошибка при получении продуктов по категории:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении продуктов по категории' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Изображение обязательно" });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            image: imagePath
        });

        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Ошибка при создании продукта:", error);
        res.status(500).json({ message: "Ошибка сервера при создании продукта" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Ошибка при получении продукта:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении продукта' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;

        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        await product.save();

        res.status(200).json({
            message: 'Продукт успешно обновлён',
            product
        });
    } catch (error) {
        console.error('Ошибка при обновлении продукта:', error);
        res.status(500).json({ message: 'Ошибка сервера при обновлении продукта' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Product deleted successfully', id });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error while deleting product' });
    }
};


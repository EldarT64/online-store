import Product from "../models/Product.js";
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ quantity: { $gt: 0 } }).populate('category'); // фильтруем
        res.status(200).json(products);
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении продуктов' });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.find({ category: id, quantity: { $gt: 0 } }).populate('category'); // фильтруем
        res.status(200).json(products);
    } catch (error) {
        console.error('Ошибка при получении продуктов по категории:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении продуктов по категории' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, quantity } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Изображение обязательно" });
        }

        if (quantity == null || quantity < 0) {
            return res.status(400).json({ message: "Количество (quantity) должно быть указано и не может быть отрицательным" });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            quantity,
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
        const { name, price, description, category, quantity } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;

        // Если quantity пришёл в запросе, обновляем
        if (quantity !== undefined) {
            if (quantity < 0) {
                return res.status(400).json({ message: "Количество не может быть отрицательным" });
            }
            product.quantity = quantity;
        }

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

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, userInfo } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const validItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found` });
            }

            if (product.quantity < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}. Only ${product.quantity} left.`,
                });
            }

            product.quantity -= item.quantity;
            await product.save();

            validItems.push({
                productId: product._id,
                quantity: item.quantity,
            });
        }

        // сохраняем заказ
        const newOrder = new Order({
            userId,
            items: validItems,
            userInfo,
            createdAt: new Date(),
        });

        await newOrder.save();

        // очищаем корзину
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error while creating order:", error);
        res.status(500).json({ message: "Server error while placing order" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId })
            .populate('items.productId')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Server error while fetching orders" });
    }
};


import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

/**
 * Получить все товары из вишлиста конкретного пользователя
 */
export const getWishlistByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await Wishlist.findOne({ userId }).populate("products");

        if (!wishlist) {
            return res.status(200).json({ products: [] });
        }

        res.status(200).json(wishlist.products);
    } catch (error) {
        console.error("Ошибка при получении вишлиста:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Добавить товар в вишлист пользователя
 */
export const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Проверим, существует ли товар
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Найдём или создадим вишлист пользователя
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [] });
        }

        // Проверим, нет ли уже этого товара
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        wishlist.products.push(productId);
        await wishlist.save();

        res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
        console.error("Ошибка при добавлении в вишлист:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Удалить товар из вишлиста пользователя
 */
export const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );
        await wishlist.save();

        res.status(200).json({ message: "Product removed from wishlist", wishlist });
    } catch (error) {
        console.error("Ошибка при удалении из вишлиста:", error);
        res.status(500).json({ message: "Server error" });
    }
};

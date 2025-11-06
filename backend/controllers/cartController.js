import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Товар не найден" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ productId, quantity: quantity || 1 }]
            });
            return res.status(201).json(cart);
        }

        const existingItem = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({ productId, quantity: quantity || 1 });
        }

        await cart.save();

        const updatedCart = await cart.populate("items.productId");

        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении в корзину" });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart) {
            return res.status(404).json({ message: "Корзина пуста" });
        }

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении корзины" });
    }
};

export const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // обновляем количество товаров
        cart.items = cart.items.map((item) => {
            const updated = items.find(
                (i) => i.productId.toString() === item.productId.toString()
            );
            return updated ? { ...item.toObject(), quantity: updated.quantity } : item;
        });

        await cart.save();

        const updatedCart = await cart.populate("items.productId");
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating cart" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();
        const updatedCart = await cart.populate("items.productId");
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing product from cart" });
    }
};

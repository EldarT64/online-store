import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const qtyToAdd = quantity || 1;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "This product was not found." });
        }

        // Check stock
        if (qtyToAdd > product.quantity) {
            return res.status(400).json({
                message: `Only ${product.quantity} item(s) left in stock.`,
            });
        }

        let cart = await Cart.findOne({ userId });

        // Create a new cart if user doesn’t have one
        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ productId, quantity: qtyToAdd }],
            });
            return res.status(201).json(await cart.populate("items.productId"));
        }

        const existingItem = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + qtyToAdd;

            if (newQuantity > product.quantity) {
                return res.status(400).json({
                    message: `You can’t add more than ${product.quantity} item(s) for this product.`,
                });
            }

            existingItem.quantity = newQuantity;
        } else {
            cart.items.push({ productId, quantity: qtyToAdd });
        }

        await cart.save();
        const updatedCart = await cart.populate("items.productId");

        res.json({
            message: "Item successfully added to your cart!",
            cart: updatedCart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while adding the item to your cart. Please try again later." });
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
            return res.status(404).json({ message: "Cart not found." });
        }

        for (const updatedItem of items) {
            const existingItem = cart.items.find(
                (i) => i.productId.toString() === updatedItem.productId
            );

            if (!existingItem) continue;

            const product = await Product.findById(updatedItem.productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            // Проверяем, чтобы пользователь не добавил больше, чем доступно
            if (updatedItem.quantity > product.quantity) {
                return res.status(400).json({
                    message: `Only ${product.quantity} item(s) left in stock.`,
                });
            }

            existingItem.quantity = updatedItem.quantity;
        }

        await cart.save();

        const updatedCart = await cart.populate("items.productId");
        res.json({
            message: "Your cart has been updated successfully.",
            cart: updatedCart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while updating your cart. Please try again later." });
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

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate("category");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
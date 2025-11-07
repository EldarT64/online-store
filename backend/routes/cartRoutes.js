import express from "express";
import {addToCart, getProductById, getUserCart, removeFromCart, updateCart} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get('/getCart', protect, getUserCart);
router.get('/product/:id', protect, getProductById);
router.put('/update', protect, updateCart);
router.delete('/remove/:productId', protect, removeFromCart);

export default router;

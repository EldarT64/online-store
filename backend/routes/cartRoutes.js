import express from "express";
import {addToCart, getUserCart, removeFromCart, updateCart} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get('/getCart', protect, getUserCart);
router.put('/update', protect, updateCart);
router.delete('/remove/:productId', protect, removeFromCart);

export default router;

import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {addToWishlist, getWishlistByUser, removeFromWishlist} from "../controllers/wishlistControllers.js";

const router = express.Router();

router.get("/:userId", protect, getWishlistByUser);

// Добавить товар в вишлист
router.post("/add", protect,  addToWishlist);

// Удалить товар из вишлиста
router.delete("/remove", protect, removeFromWishlist);

export default router;

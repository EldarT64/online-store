import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {getAllCategories} from "../controllers/categoriesController.js";

const router = express.Router();

router.get('/allCategories', protect, getAllCategories);

export default router;

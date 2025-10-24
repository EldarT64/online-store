import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {
    createProduct, deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory, updateProduct
} from "../controllers/productsController.js";
import upload from '../middleware/upload.js'

const router = express.Router();

router.get('/allProducts', protect, getAllProducts);
router.get('/category/:id', protect, getProductsByCategory);
router.post("/create", upload.single("image"), createProduct);
router.get('/get/:id', getProductById);
router.put('/edit/:id', upload.single('image'), updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;

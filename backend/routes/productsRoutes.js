import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {
    createOrder,
    createProduct, deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory, getUserOrders, updateProduct
} from "../controllers/productsController.js";
import upload from '../middleware/upload.js'

const router = express.Router();

router.get('/allProducts', protect, getAllProducts);
router.get('/category/:id', protect, getProductsByCategory);
router.post("/create", upload.single("image"), createProduct);
router.post("/createOrder", protect, createOrder);
router.get('/myOrders', protect, getUserOrders);
router.get('/get/:id', getProductById);
router.put('/edit/:id', upload.single('image'), updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;

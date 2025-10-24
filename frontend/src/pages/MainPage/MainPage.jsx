import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import phones from '../../assets/main_page_phone.svg';
import computers from '../../assets/main_page_computer.svg';
import watches from '../../assets/main_page_watch.svg';
import camera from '../../assets/main_page_camera.svg';
import headphones from '../../assets/main_page_headphone.svg';
import game from '../../assets/main_page_game.svg';
import Divider from '@mui/material/Divider';
import config from '../../api/config.js';
import { Delete } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { getAllCategories } from '../../api/categories.js';
import { getAllProducts, getProductsByCategory, deleteProductById} from "../../api/products.js";
import { useNavigate } from "react-router";
import bus from "../../assets/bus.svg";
import guard from "../../assets/guard.svg";
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';

const MainPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    const categoryImages = {
        Phones: phones,
        Computers: computers,
        Watches: watches,
        Cameras: camera,
        Headphones: headphones,
        Gaming: game
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data.slice(0, 8)); // показываем только первые 8
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleCategoryClick = async (categoryId) => {
        if (activeCategory === categoryId) {
            // Сбрасываем категорию
            setActiveCategory(null);
            try {
                const data = await getAllProducts();
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        } else {
            // Выбираем категорию
            setActiveCategory(categoryId);
            try {
                const data = await getProductsByCategory(categoryId);
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error('Ошибка при загрузке продуктов по категории:', error);
            }
        }
    };


    const handleOpenDialog = (productId) => {
        setSelectedProductId(productId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProductId(null);
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProductById(selectedProductId);
            setProducts(products.filter(p => p._id !== selectedProductId));
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
        } finally {
            handleCloseDialog();
        }
    };

    return (
        <div className={styles.mainPage}>
            <div className={styles.container}>
                {/* Категории */}
                <div className={styles.redBrickWrapper}>
                    <div className={styles.redBrick}></div>
                    <span>Categories</span>
                </div>

                <div className={styles.categoriesWrapper}>
                    <h3 className={styles.flashSalesTitle}>Browse By Category</h3>
                    <div className={styles.categoryBox}>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div
                                    key={category._id}
                                    className={`${styles.categoryItem} ${activeCategory === category._id ? styles.active : ''}`}
                                    onClick={() => handleCategoryClick(category._id)}
                                >
                                    <img
                                        src={categoryImages[category.name] || ''}
                                        alt={category.name}
                                        className={styles.categoryImage}
                                    />
                                    <span>{category.name}</span>
                                </div>
                            ))
                        ) : (
                            <p>No categories found</p>
                        )}
                    </div>
                </div>

                <Divider sx={{ mb: '50px' }} />

                {/* Продукты */}
                <div className={styles.products}>
                    <div className={styles.redBrickWrapper}>
                        <div className={styles.redBrick}></div>
                        <span>Our Products</span>
                    </div>
                    <h3 className={styles.flashSalesTitle}>Explore Our Products</h3>

                    <div className={styles.productsGrid}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Card key={product._id} className={styles.productCard}>
                                    <div className={styles.cardImageWrapper}>
                                        <CardMedia
                                            component="img"
                                            image={config.IMAGE_BASE_URL + product.image}
                                            alt={product.name}
                                            onClick={() => navigate(`/edit-product/${product._id}`)}
                                            className={styles.cardImage}
                                        />
                                        <IconButton
                                            className={styles.deleteButton}
                                            onClick={() => handleOpenDialog(product._id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </div>
                                    <CardContent className={styles.cardContent}>
                                        <Typography variant="subtitle1" component="div" className={styles.productName}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="h6" color="error" className={styles.productPrice}>
                                            ${product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p>No products</p>
                        )}
                    </div>
                </div>

                <div className={styles.features}>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={bus} alt="" />
                            <h4>Free & Fast Shipping</h4>
                            <span>Free shipping on all orders over 2000 KGS</span>
                        </div>
                    </div>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={headphones} alt="" />
                            <h4>24/7 Customer Support</h4>
                            <span>Friendly support available 24/7</span>
                        </div>
                    </div>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={guard} alt="" />
                            <h4>Money-Back Guarantee</h4>
                            <span>We refund money within 30 days</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Диалог подтверждения удаления */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="error" onClick={handleDeleteProduct}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MainPage;
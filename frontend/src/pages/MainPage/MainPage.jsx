import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import phones from '../../assets/main_page_phone.svg';
import computers from '../../assets/main_page_computer.svg';
import watches from '../../assets/main_page_watch.svg';
import camera from '../../assets/main_page_camera.svg';
import headphones from '../../assets/main_page_headphone.svg';
import game from '../../assets/main_page_game.svg';
import wishList from '../../assets/wishlist.svg';
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
import { getAllProducts, getProductsByCategory, deleteProductById } from "../../api/products.js";
import { useNavigate } from "react-router";
import bus from "../../assets/bus.svg";
import guard from "../../assets/guard.svg";
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import {addToWishlist, getWishlistByUser, removeFromWishlist} from '../../api/wishlist.js';
import useUserStore from "../../store/auth.js";

const MainPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();
    const {user} = useUserStore();

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
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await getWishlistByUser(user._id); // делаем запрос к серверу
                const productIds = data.map(p => p._id); // вытаскиваем id товаров
                setWishlist(productIds); // сохраняем в стейт
            } catch (error) {
                console.error("Ошибка при загрузке вишлиста:", error);
            }
        };
        if (user?._id) fetchWishlist(); // проверка, что user есть
    }, [user]);

    const handleCategoryClick = async (categoryId) => {
        if (activeCategory === categoryId) {
            setActiveCategory(null);
            const data = await getAllProducts();
            setProducts(data.slice(0, 8));
        } else {
            setActiveCategory(categoryId);
            const data = await getProductsByCategory(categoryId);
            setProducts(data.slice(0, 8));
        }
    };

    const toggleWishlist = async (productId) => {
        try {
            if (wishlist.includes(productId)) {
                // Удаляем из вишлиста
                await removeFromWishlist(user._id, productId);
                setWishlist(prev => prev.filter(id => id !== productId));
            } else {
                // Добавляем в вишлист
                await addToWishlist(user._id, productId);
                setWishlist(prev => [...prev, productId]);
            }
        } catch (error) {
            console.error("Ошибка при обновлении вишлиста:", error);
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

                <div className={styles.products}>
                    <div className={styles.redBrickWrapper}>
                        <div className={styles.redBrick}></div>
                        <span>Our Products</span>
                    </div>
                    <h3 className={styles.flashSalesTitle}>Explore Our Products</h3>

                    <div className={styles.productsGrid}>
                        {products.length > 0 ? (
                            products.map((product) => {
                                const isLiked = wishlist.includes(product._id);
                                return (
                                    <Card key={product._id} className={styles.productCard}>
                                        {/* Иконки вынесены над картинкой */}
                                        <div className={styles.iconGroup}>
                                            <IconButton
                                                className={styles.wishlistButton}
                                                onClick={() => toggleWishlist(product._id)}
                                            >
                                                <img
                                                    src={wishList}
                                                    alt="wishlist"
                                                    className={styles.iconImg}
                                                    style={{
                                                        filter: isLiked
                                                            ? 'invert(27%) sepia(97%) saturate(7471%) hue-rotate(352deg) brightness(89%) contrast(119%)'
                                                            : 'invert(0%)',
                                                    }}
                                                />
                                            </IconButton>

                                            <IconButton
                                                className={styles.deleteButton}
                                                onClick={() => handleOpenDialog(product._id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </div>

                                        <div className={styles.cardImageWrapper}>
                                            <CardMedia
                                                component="img"
                                                image={config.IMAGE_BASE_URL + product.image}
                                                alt={product.name}
                                                onClick={() => navigate(`/edit-product/${product._id}`)}
                                                className={styles.cardImage}
                                            />
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
                                );
                            })
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

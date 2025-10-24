import React, { useEffect, useState } from 'react';
import styles from './Wishlist.module.scss';
import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import config from '../../api/config.js';
import { getWishlistByUser, removeFromWishlist } from '../../api/wishlist.js';
import { useNavigate } from 'react-router';
import useUserStore from "../../store/auth.js";

const Wishlist = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const navigate = useNavigate();
    const { user } = useUserStore();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await getWishlistByUser(user._id);
                setWishlistProducts(data);
            } catch (error) {
                console.error("Ошибка при загрузке вишлиста:", error);
            }
        };
        fetchWishlist();
    }, [user]);

    const handleRemove = async (productId) => {
        try {
            await removeFromWishlist(user._id, productId);
            setWishlistProducts(prev => prev.filter(p => p._id !== productId));
        } catch (error) {
            console.error("Ошибка при удалении из вишлиста:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.flashSalesTitle}>Your Wishlist</h2>
            {wishlistProducts.length > 0 ? (
                <div className={styles.productsGrid}>
                    {wishlistProducts.map((product) => (
                        <Card key={product._id} className={styles.productCard}>
                            {/* Верхняя панель с кнопками */}
                            <div className={styles.iconGroup}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ShoppingCartIcon />}
                                    className={styles.addToCartButton}
                                >
                                    Add to cart
                                </Button>
                                <IconButton
                                    className={styles.deleteButton}
                                    onClick={() => handleRemove(product._id)}
                                >
                                    <Delete />
                                </IconButton>
                            </div>

                            {/* Изображение продукта */}
                            <div className={styles.cardImageWrapper}>
                                <CardMedia
                                    component="img"
                                    image={config.IMAGE_BASE_URL + product.image}
                                    alt={product.name}
                                    onClick={() => navigate(`/edit-product/${product._id}`)}
                                    className={styles.cardImage}
                                />
                            </div>

                            {/* Информация о продукте */}
                            <CardContent className={styles.cardContent}>
                                <Typography variant="subtitle1" component="div" className={styles.productName}>
                                    {product.name}
                                </Typography>
                                <Typography variant="h6" color="error" className={styles.productPrice}>
                                    ${product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className={styles.emptyMessage}>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;

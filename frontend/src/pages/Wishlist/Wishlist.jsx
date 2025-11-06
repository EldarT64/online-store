import React, { useEffect, useState } from "react";
import styles from "./Wishlist.module.scss";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Snackbar,
    Alert
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import config from "../../api/config.js";
import { getWishlistByUser, removeFromWishlist } from "../../api/wishlist.js";
import { addToCart, getCart } from "../../api/cart.js";
import { useNavigate } from "react-router";
import useUserStore from "../../store/auth.js";

const Wishlist = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();
    const { user } = useUserStore();

    // Загружаем вишлист и корзину при загрузке
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [wishlistData, cartData] = await Promise.all([
                    getWishlistByUser(user.id),
                    getCart()
                ]);

                setWishlistProducts(wishlistData);
                setCartItems(cartData.items || []);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };
        fetchData();
    }, [user]);

    const handleRemove = async (productId) => {
        try {
            await removeFromWishlist(user.id, productId);
            setWishlistProducts((prev) => prev.filter((p) => p._id !== productId));
        } catch (error) {
            console.error("Ошибка при удалении из вишлиста:", error);
        }
    };

    // Добавление в корзину
    const handleAddToCart = async (productId) => {
        try {
            const alreadyInCart = cartItems.some(
                (item) => item.productId._id === productId || item.productId === productId
            );

            if (alreadyInCart) {
                setSnackbar({
                    open: true,
                    message: "This product is already in your cart!",
                    severity: "warning"
                });
                return;
            }

            const updatedCart = await addToCart(productId, 1);
            setCartItems(updatedCart.items);
            setSnackbar({
                open: true,
                message: "Product added to cart!",
                severity: "success"
            });
        } catch (error) {
            console.error("Ошибка при добавлении в корзину:", error);
            setSnackbar({
                open: true,
                message: "Failed to add product to cart.",
                severity: "error"
            });
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.flashSalesTitle}>Your Wishlist</h2>
            {wishlistProducts.length > 0 ? (
                <div className={styles.productsGrid}>
                    {wishlistProducts.map((product) => (
                        <Card key={product._id} className={styles.productCard}>
                            <div className={styles.iconGroup}>
                                <IconButton
                                    onClick={() => handleAddToCart(product._id)}
                                >
                                    <ShoppingCartOutlinedIcon
                                        style={{
                                            color: cartItems.some(
                                                (item) => item.productId?._id === product._id || item.productId === product._id
                                            )
                                                ? "#ff4d4f" // красный, если уже в корзине
                                                : "inherit"
                                        }}
                                    />
                                </IconButton>

                                <IconButton
                                    className={styles.deleteButton}
                                    onClick={() => handleRemove(product._id)}
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
                                <Typography variant="subtitle1" className={styles.productName}>
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

            {/* Snackbar уведомление */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Wishlist;

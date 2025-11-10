import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './DetailedView.module.scss';
import config from '../../api/config.js';
import { getProductById } from '../../api/cart.js'; // API для получения товара
import { addToCart, getCart } from '../../api/cart.js';
import { addToWishlist, getWishlistByUser } from '../../api/wishlist.js';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useUserStore from "../../store/auth.js";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DetailedView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const { user } = useUserStore();

    // Загружаем товар
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Error loading product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    // Загружаем корзину
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getCart();
                console.log(data);
                setCart(data.items.map(item => item.productId._id));
            } catch (error) {
                console.error("Error loading cart:", error);
            }
        };
        fetchCart();
    }, []);

    // Загружаем вишлист
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await getWishlistByUser(user.id);
                const productIds = data.map(p => p._id);
                setWishlist(productIds);
            } catch (error) {
                console.error("Error loading wishlist:", error);
            }
        };
        if (user?.id) fetchWishlist();
    }, [user]);

    const handleAddToCart = async () => {
        try {
            if (cart.includes(product._id)) {
                setSnackbar({
                    open: true,
                    message: "Product is already in your cart",
                    severity: "warning",
                });
                return;
            }

            await addToCart(product._id);
            setCart(prev => [...prev, product._id]);
            setSnackbar({
                open: true,
                message: "Product added to cart",
                severity: "success",
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
            setSnackbar({
                open: true,
                message: "Server Error",
                severity: "error",
            });
        }
    };

    const handleAddToWishlist = async () => {
        try {
            if (wishlist.includes(product._id)) {
                setSnackbar({
                    open: true,
                    message: "Product is already in your wishlist",
                    severity: "warning",
                });
                return;
            }

            await addToWishlist(user.id, product._id);
            setWishlist(prev => [...prev, product._id]);
            setSnackbar({
                open: true,
                message: "Product added to wishlist",
                severity: "success",
            });
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            setSnackbar({
                open: true,
                message: "Server Error",
                severity: "error",
            });
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.productWrapper}>
                <div className={styles.imageWrapper}>
                    <img
                        src={config.IMAGE_BASE_URL + product.image}
                        alt={product.name}
                        className={styles.productImage}
                    />
                </div>
                <div className={styles.infoWrapper}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.category}>
                        Category: <span>{product.category.name}</span>
                    </p>
                    <h2 className={styles.price}>${product.price}</h2>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.actions}>
                        <button className={styles.addToCart} onClick={handleAddToCart}>
                            <ShoppingCartOutlinedIcon /> Add to Cart
                        </button>
                        <IconButton className={styles.wishlistBtn} onClick={handleAddToWishlist}>
                            <FavoriteBorderIcon
                                style={{
                                    color: wishlist.includes(product._id) ? "#ff4d4f" : "inherit",
                                }}
                            />
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className={styles.features}>
                <div className={styles.featureBox}>
                    <h4>Free & Fast Shipping</h4>
                    <span>Free shipping on all orders</span>
                </div>
                <div className={styles.featureBox}>
                    <h4>24/7 Customer Support</h4>
                    <span>Friendly support available 24/7</span>
                </div>
                <div className={styles.featureBox}>
                    <h4>Money-Back Guarantee</h4>
                    <span>We refund money within 30 days</span>
                </div>
            </div>

            {/* Snackbar */}
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

export default DetailedView;

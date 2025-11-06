import React, {useEffect, useState} from "react";
import {getCart, updateCart, removeFromCart} from "../../api/cart.js";
import styles from "./Cart.module.scss";
import {IconButton, Snackbar, Alert, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import config from "../../api/config.js";
import {Link} from "react-router";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({open: false, message: "", severity: "success"});

    const fetchCartData = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const handleQuantityChange = async (itemId, delta) => {
        const item = cart.items.find(i => i._id === itemId);
        if (!item) return;

        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;

        const updatedItems = cart.items.map(i =>
            i._id === itemId ? {...i, quantity: newQuantity} : i
        );
        setCart({...cart, items: updatedItems});

        try {
            await updateCart(updatedItems.map(i => ({productId: i.productId._id, quantity: i.quantity})));
        } catch (err) {
            console.error(err);
            setSnackbar({open: true, message: "Failed to update quantity", severity: "error"});
        }
    };

    const handleRemove = async (itemId) => {
        try {
            const updatedCart = await removeFromCart(itemId);
            setCart(updatedCart);
            setSnackbar({open: true, message: "Product removed from cart", severity: "success"});
        } catch (err) {
            console.error(err);
            setSnackbar({open: true, message: "Failed to remove product", severity: "error"});
        }
    };

    const handleSaveCart = async () => {
        try {
            const itemsToSave = cart.items.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
            }));

            const updatedCart = await updateCart(itemsToSave);
            setCart(updatedCart);
            setSnackbar({ open: true, message: "Cart saved successfully!", severity: "success" });
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: "Failed to save cart", severity: "error" });
        }
    };

    if (loading) return <div className={styles.status}>Loading...</div>;
    if (!cart || !cart.items || cart.items.length === 0) return <div className={styles.status}>Your cart is empty</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My Cart</h2>

            <div className={styles.tableHeader}>
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
                <div>Action</div>
            </div>

            {cart.items.map(item => {
                const product = item.productId;
                const subtotal = product.price * item.quantity;

                return (
                    <div key={item._id} className={styles.tableRow}>
                        <div className={styles.productInfo}>
                            <img src={config.IMAGE_BASE_URL + product.image} alt={product.name}
                                 className={styles.productImage}/>
                            <div>
                                <div className={styles.productName}>{product.name}</div>
                                <div className={styles.productDesc}>{product.description}</div>
                            </div>
                        </div>

                        <div className={styles.price}>{product.price} $</div>

                        <div className={styles.quantity}>
                            <IconButton size="small" onClick={() => handleQuantityChange(item._id, -1)}>
                                <RemoveIcon/>
                            </IconButton>
                            <span className={styles.qtyValue}>{item.quantity}</span>
                            <IconButton size="small" onClick={() => handleQuantityChange(item._id, 1)}>
                                <AddIcon/>
                            </IconButton>
                        </div>

                        <div className={styles.subtotal}>{subtotal.toFixed(2)} $</div>

                        {/* Кнопка удаления в конце */}
                        <div className={styles.action}>
                            <IconButton
                                color="error"
                                onClick={() => handleRemove(item.productId._id)}
                                sx={{display: 'flex', alignItems: 'center'}}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
                );
            })}

            <div className={styles.buttons}>
                <button type="button"><Link to="/"> Return to shop </Link></button>
                <button type="button" onClick={handleSaveCart}> Save Cart</button>
            </div>


            <div className={styles.totalSection}>
                <span>Total:</span>
                <span>{cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0).toFixed(2)} $</span>
                <button className={styles.checkout}>
                    Go to checkout
                </button>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({...snackbar, open: false})}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
            >
                <Alert
                    onClose={() => setSnackbar({...snackbar, open: false})}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Cart;

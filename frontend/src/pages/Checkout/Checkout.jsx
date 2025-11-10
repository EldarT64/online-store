import React, { useState, useEffect } from 'react';
import styles from './Checkout.module.scss';
import { getCart } from '../../api/cart.js';
import config from '../../api/config.js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {createOrder} from "../../api/products.js";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        phone: '',
        apartment: '',
        floor: '',
        payment: 'cash'
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getCart();
                setCartItems(data.items || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCart();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setFormData({ ...formData, payment: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (cartItems.length === 0) {
                setSnackbar({
                    open: true,
                    message: 'Your cart is empty!',
                    severity: 'warning'
                });
                return;
            }

            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                }))
            };

            const data = await createOrder(orderData);

            setCartItems([]);

            setSnackbar({
                open: true,
                message: data.message || "Order placed successfully!",
                severity: "success"
            });

        } catch (err) {
            setSnackbar({
                open: true,
                message: err.message || "Error while placing order",
                severity: "error"
            });
        }
    };


    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Checkout</h2>
            <div className={styles.columns}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="street">Street Address</label>
                    <input type="text" id="street" value={formData.street} onChange={handleChange} required />

                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={formData.city} onChange={handleChange} required />

                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" value={formData.phone} onChange={handleChange} required />

                    <label htmlFor="apartment">Apartment (optional)</label>
                    <input type="text" id="apartment" value={formData.apartment} onChange={handleChange} />

                    <label htmlFor="floor">Floor (optional)</label>
                    <input type="text" id="floor" value={formData.floor} onChange={handleChange} />

                    <div className={styles.payment}>
                        <p>Payment Method:</p>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                                checked={formData.payment === 'cash'}
                                onChange={handlePaymentChange}
                            /> Cash on Delivery
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={formData.payment === 'card'}
                                onChange={handlePaymentChange}
                            /> Card Payment
                        </label>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Place Order</button>
                </form>

                <div className={styles.cart}>
                    <h3>Order Summary</h3>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <div>
                            {cartItems.map(item => (
                                <div key={item.productId._id} className={styles.cartItem}>
                                    <img
                                        src={config.IMAGE_BASE_URL + item.productId.image}
                                        alt={item.productId.name}
                                        className={styles.cartImage}
                                    />
                                    <div className={styles.cartInfo}>
                                        <p className={styles.cartName}>{item.productId.name}</p>
                                        <p className={styles.cartQuantity}>Quantity: {item.quantity}</p>
                                        <p className={styles.cartPrice}>
                                            ${(item.productId.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.total}>
                                <strong>Total:</strong> ${totalPrice.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Checkout;

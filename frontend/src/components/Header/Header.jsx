import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from "react-router";
import wishList from '../../assets/wishlist.svg';
import cart from '../../assets/cartIcon.svg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = menuOpen ? "auto" : "hidden";
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.headerNavigation}>
                    <h2 className={styles.shopName}>Shopify</h2>

                    <div className={styles.burger} onClick={toggleMenu}>
                        {menuOpen ? <CloseIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 32 }} />}
                    </div>

                    <div className={`${styles.headerMenuList} ${menuOpen ? styles.menuOpen : ''}`}>
                        <ul>
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Главная</NavLink>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Контакты</NavLink>
                                <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>О нас</NavLink>
                                <NavLink to="/register" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Регистрация</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.headerMenuIcons}>
                        <ul>
                            <li>
                                <Link to="/wishlist">
                                    <img src={wishList} alt="wishlist"/>
                                </Link>
                                <Link to="/cart">
                                    <img src={cart} alt="cart"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

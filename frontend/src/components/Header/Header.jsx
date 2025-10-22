import React, {useState} from 'react';
import styles from './Header.module.scss';
import {Link, NavLink} from "react-router";
import wishList from '../../assets/wishlist.svg';
import cart from '../../assets/cartIcon.svg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useUserStore from "../../store/auth.js";

const Header = () => {
    const {user} = useUserStore();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = menuOpen ? "auto" : "hidden";
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = "auto";
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.headerNavigation}>
                    <h2 className={styles.shopName}>Shopify</h2>

                    <div className={styles.burger} onClick={toggleMenu}>
                        {menuOpen ? <CloseIcon sx={{fontSize: 32}}/> : <MenuIcon sx={{fontSize: 32}}/>}
                    </div>

                    <div className={`${styles.headerMenuList} ${menuOpen ? styles.menuOpen : ''}`}>
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={closeMenu}
                                    className={({isActive}) => isActive ? styles.activeLink : styles.link}
                                >
                                    Главная
                                </NavLink>

                                <NavLink
                                    to="/contacts"
                                    onClick={closeMenu}
                                    className={({isActive}) => isActive ? styles.activeLink : styles.link}
                                >
                                    Контакты
                                </NavLink>

                                <NavLink
                                    to="/about"
                                    onClick={closeMenu}
                                    className={({isActive}) => isActive ? styles.activeLink : styles.link}
                                >
                                    О нас
                                </NavLink>

                                {user ? null : (
                                    <NavLink
                                        to="/register"
                                        onClick={closeMenu}
                                        className={({isActive}) => isActive ? styles.activeLink : styles.link}
                                    >
                                        Регистрация
                                    </NavLink>
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className={styles.headerMenuIcons}>
                        <ul>
                            <li>
                                <Link to="/wishlist" onClick={closeMenu}>
                                    <img src={wishList} alt="wishlist"/>
                                </Link>
                                <Link to="/cart" onClick={closeMenu}>
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

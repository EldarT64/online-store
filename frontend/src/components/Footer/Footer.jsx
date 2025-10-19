import React from 'react';
import {Link} from 'react-router';
import facebook from '../../assets/facebook_icon.svg';
import twitterIcon from '../../assets/twitter_icon.svg';
import instagramIcon from '../../assets/instagram_icon.svg';
import styles from './Footer.module.scss';

const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.support}>
                        <h3>Shopify</h3>
                        <span>Бишкек, Проспект Мира</span>
                        <span>shopify@gmail.com</span>
                        <span>+995 555-444-333</span>
                    </div>
                    <div className={styles.account}>
                        <h3>Account</h3>
                        <Link to="/profile">My Account</Link>
                        <span>Login / Register</span>
                        <Link to="/cart">Chart</Link>
                        <Link to="/wishlist">Wishlist</Link>
                    </div>
                    <div className={styles.quickLink}>
                        <h3>Quick Link</h3>
                        <span>FAQ</span>
                        <span>Contact</span>
                    </div>
                    <div className={styles.socialMedia}>
                        <h3>Our Socials</h3>
                        <div className={styles.iconsWrapper}>
                            <img src={facebook} alt="facebook"/>
                            <img src={twitterIcon} alt="twitter"/>
                            <img src={instagramIcon} alt="instagram"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
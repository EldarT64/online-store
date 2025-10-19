import React from 'react';
import Header from "../Header/Header.jsx";
import {Outlet} from "react-router";
import styles from "./Layout.module.scss";
import Footer from "../Footer/Footer.jsx";

const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <main className={styles.main}>
                <div className={styles.outlet}>
                    <Outlet/>
                </div>
            </main>
        </div>
    );
};

export default Layout;

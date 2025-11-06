import React from 'react';
import { useNavigate } from 'react-router';
import styles from './NotFound.module.scss';

const NotFound = () => {
    const navigate = useNavigate();

    const goToProducts = () => {
        navigate('/');
    };

    return (
        <div className={styles.notFoundWrapper}>
            <div className={styles.container}>
                <span className={styles.title}>404 Страница не найдена</span>
                <p className={styles.text}>
                    Страница, которую вы пытаетесь открыть, не существует. Вы можете перейти на страницу товаров.
                </p>
                <button className={styles.button} onClick={goToProducts}>
                    Перейти на главную
                </button>
            </div>
        </div>
    );
};

export default NotFound;

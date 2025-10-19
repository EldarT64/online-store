import React from 'react';
import styles from './MainPage.module.scss';

const MainPage = () => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.redBrickWrapper}>
                    <div className={styles.redBrick}></div>
                    <span>Today's</span>
                </div>
                <h2 className={styles.flashSalesTitle}>Flash Sales</h2>
            </div>
        </div>
    );
};

export default MainPage;
import React, { JSX } from 'react';
import styles from './AppLayout.module.css';
import logo from '@assets/images/qantas-logo.png';

const AppLayout = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return (
        <div className={styles.outterContainer}>
            <div className={styles.innerContainer}>
                <header className={styles.header}>
                    <img src={logo} alt="qantas logo" />
                </header>
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
import React, { useState } from 'react';
import registration from '../../assets/registration_page_image.svg';
import styles from './Registration.module.scss';
import {Link, Navigate, useNavigate} from 'react-router';
import { Button, TextField } from "@mui/material";
import useUserStore from '../../store/auth.js';

const Registration = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { register, error, loading } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     alert('Введите корректный email');
        //     return;
        // }

        const success = await register({ name, email, password });

        if (success) {
            navigate('/products'); // например, переходим на страницу логина
        }
    };

    const nameError = !name && error ? 'Имя обязательно' : '';
    const emailError = error?.toLowerCase().includes('пользователь') || error?.toLowerCase().includes('email') ? error : '';
    const passwordError = password.length < 6 && error ? 'Пароль должен быть не менее 6 символов' : '';

    const token = localStorage.getItem('accessToken');
    if (token) return <Navigate to="/" replace />;

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <div className={styles.registerWrapper}>
                    <img src={registration} alt="..." />
                    <div className={styles.right}>
                        <div className={styles.titlesWrapper}>
                            <h2>Создать аккаунт</h2>
                            <span className={styles.details}>Введите ваши данные</span>
                        </div>
                        <form className={styles.fieldsContainer} onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                variant="standard"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!!nameError}
                                helperText={nameError}
                            />
                            <TextField
                                label="Почта"
                                variant="standard"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                            />
                            <TextField
                                label="Пароль"
                                variant="standard"
                                type={isPasswordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                                helperText={passwordError}
                            />

                            <Button
                                variant="contained"
                                sx={{background: "#EA4335", width: "50%", marginBottom: "30px", margin: '0 auto'}}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Создание...' : 'Создать аккаунт'}
                            </Button>
                        </form>
                        <div className={styles.alreadyHaveAccount}>
                            <span>Уже есть аккаунт ? </span>
                            <Link to="/login" style={{textDecoration: "underline"}}>Войти</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;

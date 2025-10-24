import React, {useState} from 'react';
import registration from '../../assets/registration_page_image.svg';
import {Link, Navigate, useNavigate} from 'react-router';
import {Button, TextField} from "@mui/material";
import useUserStore from '../../store/auth.js';
import styles from './Login.module.scss';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, error, loading} = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login({email, password});

        if (success) {
            navigate('/');
        }
    };

    const emailError = error?.toLowerCase().includes('пользователь') || error?.toLowerCase().includes('email') ? error : '';
    const passwordError = password.length < 6 && error ? 'Пароль должен быть не менее 6 символов' : '';

    const token = localStorage.getItem('token');
    if (token) return <Navigate to="/" replace/>;

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <div className={styles.registerWrapper}>
                    <img src={registration} alt="..."/>
                    <div className={styles.right}>
                        <div className={styles.titlesWrapper}>
                            <h2>Войти</h2>
                            <span className={styles.details}>Введите ваши данные</span>
                        </div>
                        <form className={styles.fieldsContainer} onSubmit={handleSubmit}>
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
                                type={"password"}
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
                                {loading ? 'Вход...' : 'Войти'}
                            </Button>

                            {error && (
                                <div className={styles.formError}>
                                    {error}
                                </div>
                            )}
                        </form>
                        <div className={styles.alreadyHaveAccount}>
                            <span>Нет аккаунта ? </span>
                            <Link to="/register" style={{textDecoration: "underline"}}>Зарегистрироваться</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

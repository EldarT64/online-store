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
    const passwordError = password.length < 6 && error ? 'Password must be at least 6 characters long' : '';

    const token = localStorage.getItem('token');
    if (token) return <Navigate to="/" replace/>;

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <div className={styles.registerWrapper}>
                    <img src={registration} alt="..."/>
                    <div className={styles.right}>
                        <div className={styles.titlesWrapper}>
                            <h2>Sign in</h2>
                            <span className={styles.details}>Enter your data</span>
                        </div>
                        <form className={styles.fieldsContainer} onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                variant="standard"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="standard"
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                sx={{background: "#EA4335", width: "50%", marginBottom: "30px", margin: '0 auto'}}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </Button>

                            {error && (
                                <div className={styles.formError}>
                                    {error}
                                </div>
                            )}
                        </form>
                        <div className={styles.alreadyHaveAccount}>
                            <span>Dont have an account ? </span>
                            <Link to="/register" style={{textDecoration: "underline"}}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

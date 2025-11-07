import React, {useEffect, useState} from 'react';
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

    const { register, error, loading, clearLoginAndRegisterError } = useUserStore();

    useEffect(() => {
        return () => {
            clearLoginAndRegisterError();
        };
    }, [clearLoginAndRegisterError]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await register({ name, email, password });

        if (success) {
            navigate('/');
        }
    };

    const nameError = !name && error ? 'Name is required' : '';
    const emailError = error?.toLowerCase().includes('пользователь') || error?.toLowerCase().includes('email') ? error : '';
    const passwordError = password.length < 6 && error ? 'Password must be at least 6 characters' : '';

    const token = localStorage.getItem('token');
    if (token) return <Navigate to="/" replace />;

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <div className={styles.registerWrapper}>
                    <img src={registration} alt="..." />
                    <div className={styles.right}>
                        <div className={styles.titlesWrapper}>
                            <h2>Create Account</h2>
                            <span className={styles.details}>Enter your details</span>
                        </div>
                        <form className={styles.fieldsContainer} onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                variant="standard"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!!nameError}
                                helperText={nameError}
                            />
                            <TextField
                                label="Email"
                                variant="standard"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                            />
                            <TextField
                                label="Password"
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
                                {loading ? 'Creating...' : 'Create Account'}
                            </Button>

                            {error && (
                                <div className={styles.formError}>
                                    {error}
                                </div>
                            )}
                        </form>
                        <div className={styles.alreadyHaveAccount}>
                            <span>Already have an account? </span>
                            <Link to="/login" style={{textDecoration: "underline"}}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;

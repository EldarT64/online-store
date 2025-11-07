import React, { useState } from 'react';
import styles from './Profile.module.scss';
import useUserStore from "../../store/auth.js";
import { updateProfile } from '../../api/users.js';
import { Visibility, VisibilityOff, Logout  } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import Divider from "@mui/material/Divider";

const Profile = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const togglePassword = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((formData.newPassword || formData.confirmPassword) &&
            formData.newPassword !== formData.confirmPassword) {
            setSnackbar({ open: true, message: 'Новый пароль и подтверждение не совпадают', severity: 'error' });
            return;
        }

        try {
            const body = {};
            if (formData.name !== user?.name) body.name = formData.name;
            if (formData.email !== user?.email) body.email = formData.email;
            if (formData.currentPassword && formData.newPassword) {
                body.currentPassword = formData.currentPassword;
                body.newPassword = formData.newPassword;
            }

            await updateProfile(body);

            setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
            setSnackbar({ open: true, message: 'Профиль успешно обновлён', severity: 'success' });
        } catch (err) {
            // Берём сообщение с бэка, если оно есть
            const msg = err.response?.data?.message || err.message || 'Ошибка обновления профиля';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <form className={styles.profile} onSubmit={handleSubmit}>
                <h2>Edit your profile</h2>
                <label htmlFor="name">First Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={formData.email} onChange={handleChange} />

                <h3>Password changes</h3>

                <label htmlFor="currentPassword">Current Password</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword.current ? 'text' : 'password'}
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Current Password"
                    />
                    <IconButton
                        size="small"
                        onClick={() => togglePassword('current')}
                        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}
                    >
                        {showPassword.current ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>

                </div>

                <label htmlFor="newPassword">New Password</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword.new ? 'text' : 'password'}
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                    />
                    <IconButton
                        size="small"
                        onClick={() => togglePassword('new')}
                        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}
                    >
                        {showPassword.new ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                </div>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                    />
                    <IconButton
                        size="small"
                        onClick={() => togglePassword('confirm')}
                        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}
                    >
                        {showPassword.confirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                </div>

                <button type="submit">Save changes</button>
                <Divider/>
                <Divider/>
                <button
                    type="button"
                    onClick={handleLogout}
                    title="Выйти из аккаунта"
                    style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                >
                    <Logout fontSize="small" />
                    <span>Logout</span>
                </button>
            </form>


            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Profile;

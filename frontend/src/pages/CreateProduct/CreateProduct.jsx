// CreateProduct.jsx
import React, { useEffect, useState } from 'react';
import styles from './CreateProduct.module.scss';
import { getAllCategories } from '../../api/categories.js';
import axiosInstance from '../../api/axios.js';

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('price', form.price);
            formData.append('description', form.description);
            formData.append('category', form.category);
            formData.append('image', form.image);

            await axiosInstance.post('/products/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess(true);
            setForm({ name: '', price: '', description: '', category: '', image: null });
        } catch (err) {
            console.error(err);
            setError('Ошибка при создании продукта');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Создание продукта</h2>
            <form className={styles.productForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Название продукта"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Цена"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Описание продукта"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <div className={styles.imagePreview}>
                    {form.image && (
                        <img
                            src={URL.createObjectURL(form.image)}
                            alt="Превью"
                        />
                    )}
                </div>

                <label className={styles.fileLabel}>
                    {form.image ? form.image.name : 'Загрузить изображение'}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        hidden
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Создание...' : 'Создать продукт'}
                </button>
                {success && <p className={styles.success}>Продукт успешно создан!</p>}
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default CreateProduct;

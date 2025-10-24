import React, { useEffect, useState } from 'react';
import styles from './EditProduct.module.scss';
import { getAllCategories } from '../../api/categories.js';
import axiosInstance from '../../api/axios.js';
import { useParams, useNavigate } from 'react-router';
import config from '../../api/config.js';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
    });
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`/products/get/${id}`);
                const product = res.data;
                setForm({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category?._id || '',
                    image: null,
                });
                setPreview(product.image || '');
            } catch (err) {
                console.error(err);
                setError('Ошибка при загрузке продукта');
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file));
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
            if (form.image) formData.append('image', form.image);

            await axiosInstance.put(`/products/edit/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess(true);
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error(err);
            setError('Ошибка при сохранении изменений');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Редактирование продукта</h2>

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
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {preview && (
                    <div className={styles.imagePreview}>
                        <img
                            src={
                                preview.startsWith('blob:')
                                    ? preview
                                    : config.IMAGE_BASE_URL + preview
                            }
                            alt="Preview"
                        />
                    </div>
                )}


                <label className={styles.fileLabel}>
                    {form.image ? form.image.name : 'Заменить изображение'}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        hidden
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Сохранение...' : 'Сохранить изменения'}
                </button>

                {success && <p className={styles.success}>Изменения успешно сохранены!</p>}
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default EditProduct;

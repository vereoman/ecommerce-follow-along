import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ onSuccess }) => {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [category, setCategory] = useState('running');
    const [gender, setGender] = useState('unisex');

    const categories = {
        athletic: [
            'running',
            'training',
            'basketball',
            'tennis',
            'soccer',
            'golf',
            'hiking'
        ],
        casual: [
            'sneakers',
            'loafers',
            'boots',
            'sandals',
            'slip-ons'
        ],
        formal: [
            'dress-shoes',
            'oxfords',
            'derby',
            'loafers',
            'boots'
        ],
        specialty: [
            'dance',
            'skateboarding',
            'wrestling',
            'cycling',
            'boxing'
        ]
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found. Please login again.');
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('description', e.target.description.value);
        formData.append('price', e.target.price.value);
        formData.append('category', category);
        formData.append('gender', gender);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            e.target.reset();
            setImage(null);
            setPreviewUrl(null);
            onSuccess();
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Session expired. Please login again.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            } else {
                setError(error.response?.data?.message || 'Error creating product');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                    name="name"
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product description"
                    rows={4}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <optgroup label="Athletic">
                            {categories.athletic.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </optgroup>
                        <optgroup label="Casual">
                            {categories.casual.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </optgroup>
                        <optgroup label="Formal">
                            {categories.formal.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </optgroup>
                        <optgroup label="Specialty">
                            {categories.specialty.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="mens">Men's</option>
                        <option value="womens">Women's</option>
                        <option value="kids">Kids</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {previewUrl && (
                    <div className="mt-4">
                        <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Creating Product...' : 'Create Product'}
            </button>
        </form>
    );
};

export default ProductForm;
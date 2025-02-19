import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AlertCircle } from 'lucide-react';

const EditUserForm = ({ user, onClose, onUpdate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            bio: user?.bio || ''
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/users/profile`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            const updatedUser = response.data;
            onUpdate(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            onClose();

        } catch (error) {
            console.error('Error updating user:', error);
            setSubmitError(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-lg p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                {submitError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        <span>{submitError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            {...register('name', { 
                                required: 'Name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters'
                                }
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            disabled={isSubmitting}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            disabled={isSubmitting}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number (optional)
                        </label>
                        <input
                            type="tel"
                            {...register('phone', {
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Please enter a valid 10-digit phone number'
                                }
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            disabled={isSubmitting}
                        />
                        {errors.phone && (
                            <span className="text-red-500 text-sm">{errors.phone.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bio (optional)
                        </label>
                        <textarea
                            {...register('bio', {
                                maxLength: {
                                    value: 500,
                                    message: 'Bio must be less than 500 characters'
                                }
                            })}
                            rows={4}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            disabled={isSubmitting}
                        />
                        {errors.bio && (
                            <span className="text-red-500 text-sm">{errors.bio.message}</span>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditUserForm;
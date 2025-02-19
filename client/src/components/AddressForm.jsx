import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddressForm = ({ onClose, userId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_API_URL}/addresses`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            onClose();
        } catch (error) {
            console.error('Error saving address:', error);
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
                <h2 className="text-2xl font-bold mb-6">Add Address</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                        </label>
                        <input
                            {...register('street', { required: 'Street address is required' })}
                            className="w-full p-2 border rounded-lg"
                        />
                        {errors.street && (
                            <span className="text-red-500 text-sm">{errors.street.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <input
                            {...register('city', { required: 'City is required' })}
                            className="w-full p-2 border rounded-lg"
                        />
                        {errors.city && (
                            <span className="text-red-500 text-sm">{errors.city.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>
                        <input
                            {...register('state', { required: 'State is required' })}
                            className="w-full p-2 border rounded-lg"
                        />
                        {errors.state && (
                            <span className="text-red-500 text-sm">{errors.state.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Postal Code
                        </label>
                        <input
                            {...register('postalCode', { 
                                required: 'Postal code is required',
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: 'Please enter a valid 6-digit postal code'
                                }
                            })}
                            className="w-full p-2 border rounded-lg"
                        />
                        {errors.postalCode && (
                            <span className="text-red-500 text-sm">{errors.postalCode.message}</span>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddressForm;
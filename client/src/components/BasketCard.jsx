import React from 'react';
import { TrashSimple, Minus, Plus } from '@phosphor-icons/react';

const BasketCard = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden w-full max-w-[280px] mx-auto h-[400px] flex flex-col transition-all duration-200 hover:border-black">
            <div className="relative h-[200px]">
                <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col space-y-2 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                    {item.product.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                    Size: {item.size}
                </p>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="flex items-center border rounded-md">
                        <button
                            onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-gray-50"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item._id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    >
                        <TrashSimple size={18} className="text-red-600" />
                    </button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-lg font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BasketCard;
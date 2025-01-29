import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/items/products");
                setProducts(response.data);
            } catch (error) {
                setError("Error fetching products");
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-200">Loading...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-950 text-red-400">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200">
            <div className="max-w-[1400px] mx-auto px-8 py-12">
                <h1 className="text-4xl font-bold mb-12 text-gray-100">Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            name={product.name}
                            price={parseFloat(product.price)}
                            image={`http://localhost:5000${product.imageUrl}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ChevronDown } from 'lucide-react';

const SportsShoesPage = () => {
    const [sportsShoes, setSportsShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeFilters, setActiveFilters] = useState({
        gender: 'all',
        price: 'all',
        size: 'all',
        color: 'all',
        height: 'all'
    });

    const [openFilter, setOpenFilter] = useState(null);

    const filterOptions = {
        gender: ['All', 'Men', 'Women', 'Unisex'],
        price: ['All', 'Under $100', '$100-$150', 'Over $150'],
        size: ['All', '6', '7', '8', '9', '10', '11', '12'],
        color: ['All', 'Black', 'White', 'Red', 'Blue', 'Multi'],
        height: ['All', 'Low', 'Mid', 'High']
    };

    useEffect(() => {
        const fetchSportsShoes = async () => {
            try {
                const response = await fetch('/api/sports-shoes');
                if (!response.ok) {
                    throw new Error('Failed to fetch sports shoes');
                }
                const data = await response.json();
                setSportsShoes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSportsShoes();
    }, []);

    const FilterDropdown = ({ type, options }) => (
        <div className="relative">
            <button
                onClick={() => setOpenFilter(openFilter === type ? null : type)}
                className="px-4 py-2 border rounded-full flex items-center justify-between min-w-[120px] bg-white hover:bg-gray-50 transition-colors duration-200"
            >
                <span className="capitalize">{type}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFilter === type ? 'rotate-180' : ''}`} />
            </button>

            {openFilter === type && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                setActiveFilters(prev => ({ ...prev, [type]: option.toLowerCase() }));
                                setOpenFilter(null);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                                activeFilters[type] === option.toLowerCase() ? 'bg-gray-50' : ''
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    const filteredShoes = sportsShoes.filter(shoe => {
        return (
            (activeFilters.gender === 'all' || shoe.gender.toLowerCase() === activeFilters.gender) &&
            (activeFilters.color === 'all' || shoe.color.toLowerCase() === activeFilters.color) &&
            (activeFilters.height === 'all' || shoe.height.toLowerCase() === activeFilters.height) &&
            (activeFilters.price === 'all' || 
                (activeFilters.price === 'under $100' && shoe.price < 100) ||
                (activeFilters.price === '$100-$150' && shoe.price >= 100 && shoe.price <= 150) ||
                (activeFilters.price === 'over $150' && shoe.price > 150)) &&
            (activeFilters.size === 'all' || shoe.size.includes(activeFilters.size))
        );
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {Object.entries(filterOptions).map(([type, options]) => (
                        <FilterDropdown key={type} type={type} options={options} />
                    ))}
                </div>

                {loading && <p className="text-center text-gray-500">Loading sports shoes...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && (
                    <div className="max-w-7xl mx-auto">
                        {filteredShoes.length === 0 ? (
                            <p className="text-center text-gray-500">No sports shoes found.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredShoes.map(shoe => (
                                    <ProductCard key={shoe.id} {...shoe} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SportsShoesPage;

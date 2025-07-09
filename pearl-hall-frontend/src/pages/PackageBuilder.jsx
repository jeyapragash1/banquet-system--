import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import apiClient from '../api';
import { LuCheck, LuStar, LuPencil, LuTrash2 } from 'react-icons/lu';

const PackageBuilder = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPackages = () => {
        setLoading(true);
        apiClient.get('/v1/event-packages')
            .then(response => {
                setPackages(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching packages:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleDelete = (packageId) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            apiClient.delete(`/v1/event-packages/${packageId}`)
                .then(() => {
                    fetchPackages();
                })
                .catch(error => alert('Failed to delete package.'));
        }
    };

    // --- THIS IS THE KEY FIX ---
    // A helper function to safely parse the services data.
    const getServicesArray = (services) => {
        if (Array.isArray(services)) {
            return services; // It's already an array, just return it.
        }
        if (typeof services === 'string') {
            try {
                // Try to parse it as JSON.
                const parsed = JSON.parse(services);
                // Ensure the parsed result is an array.
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                // If parsing fails, it's probably a plain string. Return an empty array.
                return [];
            }
        }
        // If it's not an array or a string, return an empty array.
        return [];
    };

    if (loading) return <div className="text-center text-white">Loading Packages...</div>;

    return (
        <div>
            <PageHeader title="Event Package Builder" buttonText="Create New Package" buttonLink="/admin/packages/new" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <div className="p-6 bg-secondary text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">{pkg.name}</h3>
                            {pkg.is_popular ? <span className="text-xs bg-warning text-white font-semibold px-2 py-1 rounded-full flex items-center gap-1"><LuStar size={12}/> Popular</span> : null}
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <p className="text-4xl font-bold text-white mb-4">LKR {parseFloat(pkg.price).toLocaleString()}</p>
                            <ul className="space-y-3 text-gray-300 mb-6 flex-grow">
                                {/* Use the safe helper function here */}
                                {getServicesArray(pkg.services).map((service, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <LuCheck className="text-primary w-5 h-5 flex-shrink-0" />
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                                <button onClick={() => navigate(`/admin/packages/edit/${pkg.id}`)} className="flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                    <LuPencil size={16}/> Edit
                                </button>
                                <button onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-red-400" title="Delete Package">
                                    <LuTrash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageBuilder;
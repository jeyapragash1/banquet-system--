import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { LuArrowLeft, LuSave, LuPackage, LuDollarSign, LuList } from 'react-icons/lu';

const AddEditPackage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const title = isEditing ? 'Edit Event Package' : 'Create New Event Package';

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        services: '',
        is_popular: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            apiClient.get(`/v1/event-packages/${id}`)
                .then(res => {
                    const packageData = res.data;
                    
                    // --- THIS IS THE KEY FIX ---
                    // Safely handle the 'services' data from the API.
                    let servicesString = '';
                    if (Array.isArray(packageData.services)) {
                        servicesString = packageData.services.join('\n');
                    } else if (typeof packageData.services === 'string') {
                        // If it's a JSON string, parse it. If not, use as is.
                        try {
                            const parsed = JSON.parse(packageData.services);
                            if (Array.isArray(parsed)) {
                                servicesString = parsed.join('\n');
                            }
                        } catch (e) {
                            servicesString = packageData.services;
                        }
                    }
                    
                    setFormData({
                        ...packageData,
                        services: servicesString,
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch package data:", err);
                    setError("Could not load package data.");
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const apiCall = isEditing
            ? apiClient.put(`/v1/event-packages/${id}`, formData)
            : apiClient.post('/v1/event-packages', formData);

        try {
            await apiCall;
            navigate('/admin/packages');
        } catch (err) {
            console.error("Failed to save package:", err.response?.data);
            setError("Failed to save package. Please check your input.");
        } finally {
            setLoading(false);
        }
    };
    
    if (isEditing && loading) {
        return <div className="text-center text-white p-8">Loading Package Details...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <button onClick={() => navigate('/admin/packages')} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                    <LuArrowLeft /> Back to Packages
                </button>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center">{error}</div>}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Package Name</label>
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuPackage /></span>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="e.g., Gold Wedding Package" className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required />
                             </div>
                        </div>
                        <div>
                             <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price (LKR)</label>
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuDollarSign /></span>
                                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} placeholder="8500" className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required />
                             </div>
                        </div>
                     </div>
                     <div>
                        <label htmlFor="services" className="block text-sm font-medium text-gray-300 mb-1">Services Included (one per line)</label>
                        <div className="relative">
                            <span className="absolute top-3 left-0 flex items-center pl-3 text-gray-400"><LuList /></span>
                            <textarea
                                id="services"
                                name="services"
                                rows={6}
                                value={formData.services}
                                onChange={handleChange}
                                className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md"
                                placeholder="Premium Decor
Catering for 150 pax
DJ Services"
                                required
                            />
                        </div>
                     </div>
                     <div className="flex items-center">
                        <input
                            id="is_popular"
                            name="is_popular"
                            type="checkbox"
                            checked={formData.is_popular}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-500 bg-gray-600 text-secondary focus:ring-secondary"
                        />
                        <label htmlFor="is_popular" className="ml-3 block text-sm font-medium text-gray-300">
                            Mark as Popular Package
                        </label>
                    </div>
                     <div className="flex justify-end gap-4 pt-4">
                         <button type="button" onClick={() => navigate('/admin/packages')} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-gray-500">
                            <LuSave /> {loading ? 'Saving...' : (isEditing ? 'Save Package' : 'Create Package')}
                        </button>
                    </div>
                 </form>
            </div>
        </div>
    );
};

export default AddEditPackage;
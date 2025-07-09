import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { LuArrowLeft, LuSave, LuPackage, LuList, LuHash } from 'react-icons/lu';

const AddEditInventory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const title = isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item';

    const [formData, setFormData] = useState({
        name: '',
        category: 'Furniture', // Default category
        quantity: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            apiClient.get(`/v1/inventory-items/${id}`)
                .then(res => {
                    setFormData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch item data", err);
                    setError("Could not load item data.");
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const apiCall = isEditing
            ? apiClient.put(`/v1/inventory-items/${id}`, formData)
            : apiClient.post('/v1/inventory-items', formData);

        try {
            await apiCall;
            navigate('/admin/inventory');
        } catch (err) {
            console.error("Failed to save item:", err.response?.data);
            setError("Failed to save item. Please check your input.");
        } finally {
            setLoading(false);
        }
    };
    
    if (isEditing && loading) {
        return <div className="text-center text-white p-8">Loading Item Details...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <button onClick={() => navigate('/admin/inventory')} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                    <LuArrowLeft /> Back to Inventory
                </button>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center">{error}</div>}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                             <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Item Name</label>
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuPackage /></span>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="e.g., Chiavari Chairs (Gold)" className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required />
                             </div>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuList /></span>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required>
                                    <option>Furniture</option>
                                    <option>Crockery</option>
                                    <option>Linens</option>
                                    <option>Decor</option>
                                    <option>Equipment</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">Current Quantity</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuHash /></span>
                                <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} placeholder="450" className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required />
                            </div>
                        </div>
                     </div>
                     <div className="flex justify-end gap-4 pt-4">
                         <button type="button" onClick={() => navigate('/admin/inventory')} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-gray-500">
                            <LuSave /> {loading ? 'Saving...' : (isEditing ? 'Save Item' : 'Add Item')}
                        </button>
                    </div>
                 </form>
            </div>
        </div>
    );
};

export default AddEditInventory;
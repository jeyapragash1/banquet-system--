import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { LuArrowLeft, LuSave, LuCalendar, LuList, LuFileText, LuDollarSign } from 'react-icons/lu';

const AddEditExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const title = isEditing ? 'Edit Expense' : 'Log New Expense';

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        category: 'Utilities',
        description: '',
        amount: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            apiClient.get(`/v1/expenses/${id}`)
                .then(res => {
                    setFormData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch expense data:", err);
                    setError("Could not load expense data.");
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const apiCall = isEditing
            ? apiClient.put(`/v1/expenses/${id}`, formData)
            : apiClient.post('/v1/expenses', formData);

        try {
            await apiCall;
            navigate('/admin/expenses');
        } catch (err) {
            setError('Failed to log expense. Please check your input.');
            console.error(err.response?.data);
        } finally {
            setLoading(false);
        }
    };
    
    if (isEditing && loading) {
        return <div className="text-center text-white p-8">Loading Expense Details...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <button onClick={() => navigate('/admin/expenses')} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                    <LuArrowLeft /> Back to Expenses
                </button>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg">{error}</div>}
                    
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuCalendar /></span>
                            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuList /></span>
                            <select name="category" id="category" value={formData.category} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required>
                                <option>Utilities</option>
                                <option>Maintenance</option>
                                <option>Cleaning</option>
                                <option>Staff</option>
                                <option>Marketing</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuFileText /></span>
                            <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} placeholder="e.g., Monthly Electricity Bill" className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount (LKR)</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuDollarSign /></span>
                            <input type="number" step="0.01" name="amount" id="amount" value={formData.amount} onChange={handleChange} placeholder="e.g., 1400.00" className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" required />
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-4">
                         <button type="button" onClick={() => navigate('/admin/expenses')} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-gray-500">
                            <LuSave /> {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Log Expense')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditExpense;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { LuArrowLeft, LuSave, LuUser, LuMail, LuKey, LuUserCog } from 'react-icons/lu';

const AddEditStaff = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const title = isEditing ? 'Edit Staff Member' : 'Add New Staff Member';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'staff',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            apiClient.get(`/v1/users/${id}`)
                .then(res => {
                    // Pre-fill form data but leave password fields blank for security
                    setFormData({ ...res.data, password: '', password_confirmation: '' });
                    setLoading(false);
                })
                .catch(err => {
                    setError("Could not load staff data.");
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Frontend password confirmation check
        if (formData.password && formData.password !== formData.password_confirmation) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');

        // Use /register endpoint for creating new users, and /users/{id} for updating
        const apiCall = isEditing
            ? apiClient.put(`/v1/users/${id}`, formData)
            : apiClient.post('/register', formData);

        try {
            await apiCall;
            navigate('/admin/staff');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save staff member. Please check the details.');
            console.error(err.response?.data);
        } finally {
            setLoading(false);
        }
    };
    
    if (isEditing && loading) {
        return <div className="text-center text-white p-8">Loading Staff Details...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <button onClick={() => navigate('/admin/staff')} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                    <LuArrowLeft /> Back to Staff
                </button>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center">{error}</div>}
                    
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuUser/></span><input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md" required /></div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuMail/></span><input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md" required /></div>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                        <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuUserCog/></span>
                            <select name="role" id="role" value={formData.role} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md" required>
                                <option value="staff">Staff</option>
                                <option value="admin">Admin</option>
                                <option value="super-admin">Super Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password {isEditing ? '(leave blank to keep)' : ''}</label>
                            <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuKey/></span><input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md" required={!isEditing} /></div>
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                            <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuKey/></span><input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md" required={!isEditing || formData.password} /></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-4">
                         <button type="button" onClick={() => navigate('/admin/staff')} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500">Cancel</button>
                         <button type="submit" disabled={loading} className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-gray-500">
                             <LuSave /> {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Staff Member')}
                         </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditStaff;
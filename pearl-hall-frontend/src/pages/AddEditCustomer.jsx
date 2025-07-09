import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { LuArrowLeft, LuSave, LuUser, LuPhone, LuMail, LuHouse, LuUsers } from 'react-icons/lu';
import FormInput from '../components/FormInput'; // <-- Import the new component

const AddEditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const title = isEditing ? 'Edit Customer Profile' : 'Add New Customer';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact_number: '',
        address: '',
        alternate_contact: '',
        pax_sawan: '',
        religion_community: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            apiClient.get(`/v1/customers/${id}`)
                .then(res => {
                    const data = res.data;
                    // Ensure no null values are passed to inputs, which can cause issues
                    Object.keys(data).forEach(key => {
                        if (data[key] === null) {
                            data[key] = '';
                        }
                    });
                    setFormData(data);
                })
                .catch(err => {
                    console.error("Failed to fetch customer data", err);
                    setError("Could not load customer data.");
                })
                .finally(() => setLoading(false));
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
            ? apiClient.put(`/v1/customers/${id}`, formData)
            : apiClient.post('/v1/customers', formData);
            
        try {
            await apiCall;
            navigate('/admin/customers');
        } catch (err) {
            console.error("Failed to save customer:", err.response?.data || err.message);
            setError('Failed to save customer. Please check your input and try again.');
        } finally {
            setLoading(false);
        }
    };
    
    if (isEditing && loading) {
        return <div className="text-center text-white p-8">Loading Customer Details...</div>
    }

    return (
        <div>
             <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <button onClick={() => navigate('/admin/customers')} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                    <LuArrowLeft /> Back to Customers
                </button>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center">{error}</div>}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" icon={<LuUser />} required={true} />
                        <FormInput label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" icon={<LuMail />} type="email" required={true} />
                        <FormInput label="Contact Number" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="555-0101" icon={<LuPhone />} required={true} />
                        <FormInput label="Alternate Contact" name="alternate_contact" value={formData.alternate_contact} onChange={handleChange} placeholder="555-0102" icon={<LuPhone />} />
                        <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, Anytown" icon={<LuHouse />} />
                        <FormInput label="No. of Pax / Sawan" name="pax_sawan" value={formData.pax_sawan} onChange={handleChange} placeholder="150" icon={<LuUsers />} />
                        <FormInput label="Religion / Community" name="religion_community" value={formData.religion_community} onChange={handleChange} placeholder="Christian" icon={<LuUsers />} />
                    </div>

                     <div className="flex justify-end gap-4 pt-4">
                         <button type="button" onClick={() => navigate('/admin/customers')} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-gray-500">
                            <LuSave /> {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Customer')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditCustomer;
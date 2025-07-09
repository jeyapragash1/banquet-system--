import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api';
// --- THIS IS THE CORRECTED LINE ---
// We have added all the missing icons: LuPartyPopper, LuBuilding
import { LuArrowLeft, LuSave, LuUser, LuCalendar, LuClipboardList, LuDollarSign, LuTicket, LuBuilding, LuCheck, LuPartyPopper } from 'react-icons/lu';

// Reusable Form Input Component
const FormInput = ({ label, name, value, onChange, placeholder, icon, type = 'text', required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
            <input
                type={type}
                name={name}
                id={name}
                value={value || ''}
                onChange={onChange}
                className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                placeholder={placeholder}
                required={required}
            />
        </div>
    </div>
);

// Reusable Form Select Component
const FormSelect = ({ label, name, value, onChange, options, icon, required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
            <select
                id={name}
                name={name}
                value={value || ''}
                onChange={onChange}
                className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                required={required}
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    </div>
);


const AddEditEventInquiry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const title = isEditing ? 'Edit Event Inquiry' : 'Create New Event Inquiry';

    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        customer_id: '',
        inquiry_date: new Date().toISOString().split('T')[0],
        event_type: 'Wedding',
        event_date: '',
        agreed_amount: '',
        discount_amount: '0',
        advance_payment: '0',
        receipt_number: '',
        status: 'Pending',
        stage_throne_option: 'Not Included',
        stage_throne_amount: '0',
        event_taken_by: JSON.parse(localStorage.getItem('user'))?.name || '',
        event_confirmed_by: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        apiClient.get('/v1/customers')
            .then(res => setCustomers(res.data))
            .catch(err => console.error("Failed to fetch customers", err));

        if (isEditing) {
            // Logic to fetch inquiry data for editing
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
    
    // --- THIS IS THE KEY FIX ---
    // Create a new object with cleaned data to send to the API.
    // This converts any empty string financial fields to 0 before sending.
    const dataToSubmit = {
        ...formData,
        agreed_amount: Number(formData.agreed_amount) || 0,
        discount_amount: Number(formData.discount_amount) || 0,
        advance_payment: Number(formData.advance_payment) || 0,
        stage_throne_amount: Number(formData.stage_throne_amount) || 0,
    };
    
    const apiCall = isEditing 
        ? apiClient.put(`/v1/event-inquiries/${id}`, dataToSubmit)
        : apiClient.post('/v1/event-inquiries', dataToSubmit);

    try {
        await apiCall;
        navigate('/admin/inquiries');
    } catch (err) {
        setError('Failed to save inquiry. Please check the form for errors.');
        // Log the detailed validation errors from Laravel if they exist
        console.error("Save failed:", err.response?.data || err.message);
    } finally {
        setLoading(false);
    }
};
    
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <button onClick={() => navigate('/admin/inquiries')} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                    <LuArrowLeft /> Back to Inquiries
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
                {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6">{error}</div>}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div className="p-6 border border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
                             <div className="space-y-4">
                                <FormSelect label="Customer" name="customer_id" value={formData.customer_id} onChange={handleChange}
                                    options={[
                                        { value: '', label: 'Select a Customer' },
                                        ...customers.map(c => ({ value: c.id, label: c.name }))
                                    ]}
                                    icon={<LuUser />} required={true} />
                                <FormSelect label="Event Type" name="event_type" value={formData.event_type} onChange={handleChange}
                                    options={[
                                        { value: 'Wedding', label: 'Wedding' },
                                        { value: 'Reception', label: 'Reception' },
                                        { value: 'Birthday', label: 'Birthday' },
                                        { value: 'Corporate', label: 'Corporate Event' },
                                        { value: 'Other', label: 'Other' },
                                    ]}
                                    icon={<LuPartyPopper />} required={true} />
                                <FormInput label="Event Date" name="event_date" value={formData.event_date} onChange={handleChange} type="date" icon={<LuCalendar />} required={true} />
                             </div>
                        </div>
                        <div className="p-6 border border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-4">Stage & Throne</h3>
                            <div className="space-y-4">
                               <FormSelect label="Option" name="stage_throne_option" value={formData.stage_throne_option} onChange={handleChange}
                                    options={[
                                        { value: 'Not Included', label: 'Not Included' },
                                        { value: 'Provided by Customer', label: 'Provided by Customer' },
                                        { value: 'Provided by Pearl', label: 'Provided by Pearl' },
                                    ]}
                                    icon={<LuBuilding />} />
                                {formData.stage_throne_option === 'Provided by Pearl' && (
                                     <FormInput label="Amount for Stage/Throne (LKR)" name="stage_throne_amount" value={formData.stage_throne_amount} onChange={handleChange} type="number" placeholder="e.g., 15000" icon={<LuDollarSign />} />
                                )}
                           </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                       <div className="p-6 border border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-4">Financials</h3>
                             <div className="space-y-4">
                                <FormInput label="Agreed Amount (LKR)" name="agreed_amount" value={formData.agreed_amount} onChange={handleChange} type="number" placeholder="e.g., 85000" icon={<LuDollarSign />} required={true} />
                                <FormInput label="Discount Amount (LKR)" name="discount_amount" value={formData.discount_amount} onChange={handleChange} type="number" placeholder="e.g., 5000" icon={<LuDollarSign />} />
                                <FormInput label="Advance Payment (LKR)" name="advance_payment" value={formData.advance_payment} onChange={handleChange} type="number" placeholder="e.g., 40000" icon={<LuDollarSign />} />
                                <FormInput label="Receipt Number" name="receipt_number" value={formData.receipt_number} onChange={handleChange} placeholder="e.g., RCT-001" icon={<LuTicket />} />
                             </div>
                        </div>
                        <div className="p-6 border border-gray-700 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-4">Admin & Status</h3>
                             <div className="space-y-4">
                               <FormInput label="Event Taken By" name="event_taken_by" value={formData.event_taken_by} onChange={handleChange} icon={<LuUser />} required={true} />
                               <FormInput label="Event Confirmed By" name="event_confirmed_by" value={formData.event_confirmed_by} onChange={handleChange} placeholder="Admin name" icon={<LuCheck />} />
                               <FormSelect label="Status" name="status" value={formData.status} onChange={handleChange}
                                    options={[
                                        { value: 'Pending', label: 'Pending' },
                                        { value: 'Confirmed', label: 'Confirmed' },
                                        { value: 'Completed', label: 'Completed' },
                                        { value: 'Cancelled', label: 'Cancelled' },
                                    ]}
                                    icon={<LuClipboardList />} required={true} />
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={() => navigate('/admin/inquiries')} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-500">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-gray-500">
                        <LuSave /> {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Inquiry')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditEventInquiry;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import apiClient from '../api';
import { LuEye, LuPencil, LuFileText, LuTrash2 } from 'react-icons/lu';

const EventInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchInquiries = () => {
        setLoading(true);
        apiClient.get('/v1/event-inquiries')
            .then(response => {
                setInquiries(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching inquiries:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            apiClient.delete(`/v1/event-inquiries/${id}`)
                .then(() => {
                    // Refresh the list after deleting
                    fetchInquiries();
                })
                .catch(error => console.error('Failed to delete inquiry', error));
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer.name' },
        { header: 'Event Type', accessor: 'event_type' },
        { header: 'Event Date', accessor: 'event_date' },
        { header: 'Amount', accessor: 'agreed_amount' },
        { header: 'Status', accessor: 'status' },
        { header: 'Actions', accessor: 'actions' },
    ];
  
    const inquiryDataWithActions = inquiries.map(inquiry => ({
        ...inquiry,
        agreed_amount: `LKR${parseFloat(inquiry.agreed_amount).toLocaleString()}`,
        actions: (
          <div className="flex gap-3">
            <button onClick={() => navigate(`/admin/inquiries/edit/${inquiry.id}`)} className="text-green-500 hover:text-green-700" title="Edit Inquiry"><LuPencil /></button>
            <button onClick={() => handleDelete(inquiry.id)} className="text-red-500 hover:text-red-700" title="Delete Inquiry"><LuTrash2 /></button>
            <button className="text-purple-500 hover:text-purple-700" title="Generate Invoice"><LuFileText /></button>
          </div>
        )
    }));
    
    if (loading) return <div className="text-center text-white">Loading Inquiries...</div>;

    return (
        <div>
            <PageHeader title="Event Inquiries" buttonText="Create New Inquiry" buttonLink="/admin/inquiries/new" />
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md">
                <DataTable
                    title="All Event Inquiries"
                    columns={columns}
                    data={inquiryDataWithActions}
                />
            </div>
        </div>
    );
};

export default EventInquiries;
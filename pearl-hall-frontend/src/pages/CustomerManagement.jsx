import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for editing
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import apiClient from '../api';
import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  // Function to fetch customers from the API
  const fetchCustomers = () => {
    setLoading(true);
    apiClient.get('/v1/customers')
      .then(response => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  };

  // Fetch customers when the component first loads
  useEffect(() => {
    fetchCustomers();
  }, []);

  // --- NEW: Function to handle deleting a customer ---
  const handleDelete = (customerId) => {
    // Show a confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      apiClient.delete(`/v1/customers/${customerId}`)
        .then(() => {
          // If deletion is successful, refresh the customer list
          fetchCustomers();
        })
        .catch(error => {
          console.error("Failed to delete customer:", error);
          alert('Failed to delete customer.');
        });
    }
  };

  // --- NEW: Function to handle editing a customer ---
  const handleEdit = (customerId) => {
    // Navigate to the edit form page for the specific customer
    navigate(`/admin/customers/edit/${customerId}`);
  };

  const columns = [
    { header: 'Customer Name', accessor: 'name' },
    { header: 'Contact', accessor: 'contact_number' },
    { header: 'Pax/Sawan', accessor: 'pax_sawan' },
    { header: 'Total Events', accessor: 'total_events' },
    { header: 'Total Spent', accessor: 'total_spent' },
    { header: 'Actions', accessor: 'actions' },
  ];
  
  // Map the customer data and add the interactive action buttons
  const customerDataWithActions = customers.map(customer => ({
    ...customer,
    total_spent: `LKR ${parseFloat(customer.total_spent || 0).toLocaleString()}`,
    actions: (
      <div className="flex gap-4">
        <button className="text-blue-500 hover:text-blue-700" title="View Details (coming soon)"><LuEye /></button>
        {/* --- UPDATED: Edit button now calls handleEdit --- */}
        <button onClick={() => handleEdit(customer.id)} className="text-green-500 hover:text-green-700" title="Edit Customer"><LuPencil /></button>
        {/* --- UPDATED: Delete button now calls handleDelete --- */}
        <button onClick={() => handleDelete(customer.id)} className="text-red-500 hover:text-red-700" title="Delete Customer"><LuTrash2 /></button>
      </div>
    )
  }));
  
  if (loading && customers.length === 0) return <div className="text-center text-white">Loading Customers...</div>;

  return (
    <div>
      <PageHeader title="Customer Management" buttonText="Add New Customer" buttonLink="/admin/customers/new" />
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
        <DataTable
          title="All Customers"
          columns={columns}
          data={customerDataWithActions}
        />
      </div>
    </div>
  );
};

export default CustomerManagement;
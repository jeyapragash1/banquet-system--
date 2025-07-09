import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import apiClient from '../api';
import { LuPencil, LuTrash2, LuHistory } from 'react-icons/lu';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchItems = () => {
        setLoading(true);
        apiClient.get('/v1/inventory-items')
            .then(response => {
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching inventory:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = (itemId) => {
        if (window.confirm('Are you sure you want to delete this inventory item?')) {
            apiClient.delete(`/v1/inventory-items/${itemId}`)
                .then(() => {
                    fetchItems(); // Refresh the list after deleting
                })
                .catch(error => {
                    console.error('Failed to delete item', error);
                    alert('Failed to delete item.');
                });
        }
    };

    const columns = [
        { header: 'Item Name', accessor: 'name' },
        { header: 'Category', accessor: 'category' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Status', accessor: 'status' },
        { header: 'Actions', accessor: 'actions' },
    ];
  
    const inventoryDataWithActions = items.map(item => ({
        ...item,
        status: (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                item.status === 'In Stock' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
            }`}>
                {item.status}
            </span>
        ),
        actions: (
          <div className="flex gap-4">
            <button onClick={() => navigate(`/admin/inventory/edit/${item.id}`)} className="text-green-500 hover:text-green-700" title="Edit Item"><LuPencil /></button>
            <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700" title="Delete Item"><LuTrash2 /></button>
            <button className="text-blue-500 hover:text-blue-700" title="View Stock Log (coming soon)"><LuHistory /></button>
          </div>
        )
    }));
    
    if (loading && items.length === 0) return <div className="text-center text-white">Loading Inventory...</div>;

    return (
        <div>
            <PageHeader title="Inventory Management" buttonText="Add New Item" buttonLink="/admin/inventory/new" />
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md">
                <DataTable
                    title="All Inventory Items"
                    columns={columns}
                    data={inventoryDataWithActions}
                />
            </div>
        </div>
    );
};

export default Inventory;
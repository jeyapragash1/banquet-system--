import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import apiClient from '../api';
import { LuPencil, LuTrash2 } from 'react-icons/lu';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchExpenses = () => {
        setLoading(true);
        apiClient.get('/v1/expenses')
            .then(response => {
                setExpenses(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching expenses:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDelete = (expenseId) => {
        if (window.confirm('Are you sure you want to delete this expense entry?')) {
            apiClient.delete(`/v1/expenses/${expenseId}`)
                .then(() => {
                    fetchExpenses(); // Refresh the list after deleting
                })
                .catch(error => {
                    console.error("Failed to delete expense:", error);
                    alert('Failed to delete expense.');
                });
        }
    };

    const columns = [
        { header: 'Date', accessor: 'date' },
        { header: 'Category', accessor: 'category' },
        { header: 'Description', accessor: 'description' },
        { header: 'Amount (LKR)', accessor: 'amount' },
        { header: 'Actions', accessor: 'actions' },
    ];

    const expenseDataWithActions = expenses.map(e => ({
        ...e, 
        amount: parseFloat(e.amount).toLocaleString('en-US', { minimumFractionDigits: 2 }),
        actions: (
            <div className="flex gap-4">
                <button onClick={() => navigate(`/admin/expenses/edit/${e.id}`)} className="text-green-500 hover:text-green-700" title="Edit Expense"><LuPencil /></button>
                <button onClick={() => handleDelete(e.id)} className="text-red-500 hover:text-red-700" title="Delete Expense"><LuTrash2 /></button>
            </div>
        )
    }));
    
    if (loading && expenses.length === 0) return <div className="text-center text-white p-8">Loading Expenses...</div>;

    return (
        <div>
            <PageHeader title="Utilities & Expense Tracker" buttonText="Log New Expense" buttonLink="/admin/expenses/new" />
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md">
                <DataTable
                    title="Expense Log"
                    columns={columns}
                    data={expenseDataWithActions}
                />
            </div>
        </div>
    );
};

export default Expenses;
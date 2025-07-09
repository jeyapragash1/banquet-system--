import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import apiClient from '../api';
import { LuPencil, LuTrash2 } from 'react-icons/lu';

const StaffManagement = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const fetchStaff = () => {
        setLoading(true);
        apiClient.get('/v1/users')
            .then(response => {
                setStaff(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching staff:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStaff();
    }, []);
    
    const handleDelete = (userId, userName) => {
        if (currentUser?.id === userId) {
            alert("Action not allowed: You cannot delete your own account.");
            return;
        }

        if (window.confirm(`Are you sure you want to delete the user "${userName}"?`)) {
            apiClient.delete(`/v1/users/${userId}`)
                .then(() => {
                    fetchStaff(); // Refresh the list after deleting
                })
                .catch(err => {
                    alert(err.response?.data?.message || "Failed to delete staff member.");
                    console.error(err);
                });
        }
    };

    // Helper to generate consistent placeholder avatars
    const getAvatarUrl = (name) => `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}`;
    
    if (loading) return <div className="text-center text-white p-8">Loading Staff...</div>;

    return (
        <div>
            {/* The "Add New Employee" button is only visible to Super Admins */}
            {currentUser?.role === 'super-admin' && (
                <PageHeader title="Staff Management" buttonText="Add New Employee" buttonLink="/admin/staff/new" />
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {staff.map(member => (
                    <div key={member.id} className="relative group bg-gray-800 border border-gray-700 text-center p-6 rounded-lg shadow-lg">
                        <img 
                            src={getAvatarUrl(member.name)}
                            alt={member.name} 
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700"
                        />
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-secondary font-medium text-sm capitalize">{member.role.replace('-', ' ')}</p>
                        <p className="text-gray-400 text-xs mt-1">{member.email}</p>

                        {/* Action buttons are only visible to Super Admins */}
                        {currentUser?.role === 'super-admin' && (
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => navigate(`/admin/staff/edit/${member.id}`)} className="bg-gray-700 p-2 rounded-full text-green-400 hover:bg-green-500 hover:text-white" title="Edit Staff Member">
                                    <LuPencil size={16} />
                                </button>
                                <button onClick={() => handleDelete(member.id, member.name)} className="bg-gray-700 p-2 rounded-full text-red-400 hover:bg-red-500 hover:text-white" title="Delete Staff Member">
                                    <LuTrash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffManagement;
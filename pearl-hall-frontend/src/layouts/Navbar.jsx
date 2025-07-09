import React from 'react';
import { LuSearch, LuBell, LuUser, LuLogOut } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            await apiClient.post('/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            navigate('/admin/login');
        }
    };

    return (
        <header className="h-20 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-8">
            <div>
                <h2 className="text-xl font-semibold text-white">Welcome, {user?.name || 'Admin'}</h2>
                <p className="text-sm text-gray-400">Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-6">
                {/* ... Search and Bell icon code ... */}
                
                <button 
                    onClick={handleLogout}
                    title="Logout"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <LuLogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
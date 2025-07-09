import React, { useState } from 'react';
import { LuUser, LuLock } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api'; // Import our simplified API client

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('superadmin@pearlhall.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // We now make a direct login request. No CSRF call needed.
            const response = await apiClient.post('/login', {
                email,
                password,
            });

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            navigate('/admin/dashboard');

        } catch (err) {
            console.error("Login failed:", err);
            setError('Login failed. Please check credentials or console.');
        } finally {
            setLoading(false);
        }
    };

    // Your full JSX for the form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Pearl <span className="text-secondary">Hall</span></h1>
                    <p className="text-gray-400 mt-2">Admin Panel Login</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center">{error}</div>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuUser /></span>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 block w-full py-3 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <div className="relative">
                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><LuLock /></span>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 block w-full py-3 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg" required />
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-opacity-90 disabled:bg-gray-500">
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import DataTable from '../components/DataTable';
import apiClient from '../api';
import { LuUsers, LuCalendarCheck2, LuDollarSign, LuTrendingUp, LuTriangleAlert } from 'react-icons/lu';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchDashboardData = (year) => {
        setLoading(true);
        const statsUrl = `/v1/dashboard?year=${year}`;
        const chartUrl = `/v1/dashboard/chart-data?year=${year}`;

        Promise.all([
            apiClient.get(statsUrl),
            apiClient.get(chartUrl)
        ]).then(([statsResponse, chartResponse]) => {
            setDashboardData(statsResponse.data);
            setChartData(chartResponse.data.data); // The chart data is nested
            // Set available years only on the first load
            if (availableYears.length === 0) {
                setAvailableYears(statsResponse.data.availableYears);
            }
            setSelectedYear(statsResponse.data.activeYear);
        }).catch(err => {
            setError('Failed to load dashboard data. Please try again later.');
            console.error("Dashboard fetch error:", err);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        // Fetch data for the initially selected year when the component mounts
        fetchDashboardData(selectedYear);
    }, []); // Run only once on mount

    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
        fetchDashboardData(year); // Re-fetch data when the year changes
    };

    if (loading && !dashboardData) {
        return <div className="text-center text-white text-xl p-8">Loading Dashboard...</div>;
    }
    if (error) {
        return <div className="text-center text-red-400 text-xl p-8">{error}</div>;
    }

    const eventColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer.name' },
        { header: 'Status', accessor: 'status' },
    ];

    const stockColumns = [
        { header: 'Item Name', accessor: 'name' },
        { header: 'Stock Left', accessor: 'quantity' },
        { header: 'Status', accessor: 'status' },
    ];

    return (
        <div className="space-y-8">
            {/* --- NEW: YEAR SELECTOR --- */}
            <div className="flex justify-end items-center">
                <label htmlFor="year-select" className="text-white mr-2">Year:</label>
                <select 
                    id="year-select" 
                    value={selectedYear} 
                    onChange={handleYearChange}
                    className="bg-gray-700 border border-gray-600 text-white rounded-md p-2"
                >
                    {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Bookings" value={dashboardData?.stats?.totalBookings || '0'} icon={<LuCalendarCheck2 className="w-8 h-8 text-secondary" />} />
                <StatCard title={`Revenue (${selectedYear})`} value={`LKR ${dashboardData?.stats?.totalRevenue || '0.00'}`} icon={<LuDollarSign className="w-8 h-8 text-primary" />} />
                <StatCard title={`Expenses (${selectedYear})`} value={`LKR ${dashboardData?.stats?.totalExpenses || '0.00'}`} icon={<LuTrendingUp className="w-8 h-8 text-danger" />} />
                <StatCard title="Inventory Alerts" value={dashboardData?.stats?.inventoryAlerts || '0'} icon={<LuTriangleAlert className="w-8 h-8 text-warning" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <RevenueChart 
                        data={chartData} 
                        title={`Monthly Revenue vs Expenses (${selectedYear})`} 
                    />
                </div>
                <div className="lg:col-span-2">
                    <DataTable title="Recent Inquiries" data={dashboardData?.recentInquiries || []} columns={eventColumns} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <DataTable title="Low Stock Items" data={dashboardData?.lowStockItems || []} columns={stockColumns} />
            </div>
        </div>
    );
};

export default Dashboard;
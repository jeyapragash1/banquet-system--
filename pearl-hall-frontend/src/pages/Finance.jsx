import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import apiClient from '../api';
import { LuSave } from 'react-icons/lu';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Finance = () => {
    // --- State for Tax Configuration ---
    const [taxSettings, setTaxSettings] = useState({
        tax_type: 'Percentage',
        tax_value: 0,
    });
    const [loadingTax, setLoadingTax] = useState(true);
    const [savingTax, setSavingTax] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // --- State for Report Generation ---
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportType, setReportType] = useState('daily');
    const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
    const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7));
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    useEffect(() => {
        if (currentUser?.role === 'super-admin') {
            setLoadingTax(true);
            apiClient.get('/v1/settings/tax')
                .then(response => {
                    setTaxSettings(response.data);
                })
                .catch(error => {
                    console.error("Failed to fetch tax settings:", error);
                })
                .finally(() => {
                    setLoadingTax(false);
                });
        } else {
            setLoadingTax(false);
        }
    }, [currentUser?.role]);

    // --- Functions for Tax Configuration ---
    const handleTaxChange = (e) => {
        const { name, value } = e.target;
        setTaxSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleTaxSave = async (e) => {
        e.preventDefault();
        setSavingTax(true);
        setSuccessMessage('');
        try {
            const response = await apiClient.post('/v1/settings/tax', taxSettings);
            setSuccessMessage(response.data.message);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            alert('Failed to save settings.');
            console.error(error.response?.data);
        } finally {
            setSavingTax(false);
        }
    };
    
    // --- Functions for Report Generation ---
    const openReportModal = (type) => {
        setReportType(type);
        setIsReportModalOpen(true);
    };

    const handleGenerateReport = async () => {
        setIsGeneratingReport(true);
        const params = reportType === 'daily' 
            ? { type: 'daily', date: reportDate }
            : { type: 'monthly', month: reportMonth };
        
        try {
            const response = await apiClient.post('/v1/reports/generate', params);
            generatePDF(response.data);
            setIsReportModalOpen(false);
        } catch (error) {
            alert('Could not generate report. Please try again.');
            console.error("Report generation failed:", error);
        } finally {
            setIsGeneratingReport(false);
        }
    };

    const generatePDF = (data) => {
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text(`Financial Report - ${data.period}`, 14, 22);
        
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
        
        const tableData = [
            ['Total Income', `LKR ${data.totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}`],
            ['Total Expenses', `LKR ${data.totalExpenses.toLocaleString('en-US', {minimumFractionDigits: 2})}`],
        ];
        
        autoTable(doc, {
            startY: 40,
            head: [['Description', 'Amount']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] },
            foot: [['Net Profit / Loss', `LKR ${data.netProfit.toLocaleString('en-US', {minimumFractionDigits: 2})}`]],
            footStyles: { fontStyle: 'bold', fillColor: data.netProfit >= 0 ? [39, 174, 96] : [192, 57, 43] },
        });

        doc.save(`Financial_Report_${data.period.replace(/\s/g, '_')}.pdf`);
    };

    // Main render logic
    if (loadingTax) {
        return <div className="text-center text-white p-8">Loading Finance Settings...</div>;
    }

    return (
        <div>
            <PageHeader title="Tax & Finance Management" />

            {/* Tax Configuration Section - Only for Super Admin */}
            {currentUser?.role === 'super-admin' ? (
                <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Tax Configuration</h2>
                    <form onSubmit={handleTaxSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div>
                                <label htmlFor="tax_type" className="block text-sm font-medium text-gray-300 mb-1">Tax Type</label>
                                <select id="tax_type" name="tax_type" value={taxSettings.tax_type} onChange={handleTaxChange} className="block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm">
                                    <option>Percentage</option>
                                    <option>Flat Rate</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tax_value" className="block text-sm font-medium text-gray-300 mb-1">Value</label>
                                <input type="number" step="0.01" name="tax_value" id="tax_value" value={taxSettings.tax_value} onChange={handleTaxChange} className="block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm" placeholder="e.g., 7.5 or 100" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            <button type="submit" disabled={savingTax} className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-gray-500">
                                <LuSave /> {savingTax ? 'Saving...' : 'Save Configuration'}
                            </button>
                            {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}
                        </div>
                    </form>
                </div>
            ) : (
                 <div className="bg-gray-800 text-center text-gray-400 p-8 rounded-lg">
                    You do not have permission to configure tax settings.
                </div>
            )}
            
            {/* Financial Reports Section - Available to all admins */}
            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg mt-8">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Financial Reports</h2>
                <p className="text-gray-400 mb-4">Generate detailed financial summaries for specific periods.</p>
                <div className="flex gap-4">
                    <button onClick={() => openReportModal('daily')} className="bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600">Generate Daily Income Report</button>
                    <button onClick={() => openReportModal('monthly')} className="bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600">Generate Monthly Income Report</button>
                </div>
            </div>

            {/* Report Generation Modal */}
            <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title={`Generate ${reportType === 'daily' ? 'Daily' : 'Monthly'} Report`}>
                <div>
                    {reportType === 'daily' ? (
                        <div>
                            <label htmlFor="report_date" className="block text-sm font-medium text-gray-300 mb-2">Select Date:</label>
                            <input type="date" id="report_date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className="block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" />
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="report_month" className="block text-sm font-medium text-gray-300 mb-2">Select Month:</label>
                            <input type="month" id="report_month" value={reportMonth} onChange={(e) => setReportMonth(e.target.value)} className="block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md" />
                        </div>
                    )}
                    <div className="flex justify-end gap-4 mt-6">
                        <button onClick={() => setIsReportModalOpen(false)} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500">Cancel</button>
                        <button onClick={handleGenerateReport} disabled={isGeneratingReport} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 disabled:bg-green-800">
                            {isGeneratingReport ? 'Generating...' : 'Generate & Download'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Finance;
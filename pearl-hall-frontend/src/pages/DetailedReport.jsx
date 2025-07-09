import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';

const DetailedReport = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    // Capitalize the first letter of the report type for the title
    const reportTitle = type.charAt(0).toUpperCase() + type.slice(1) + " Report";
    
    return (
        <div>
             <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">{reportTitle}</h1>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                    <LuArrowLeft /> Back
                </button>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg">
                <p className="text-gray-300">This is a placeholder for the detailed {type} report.</p>
                <p className="text-gray-400 mt-2">
                    Here you would display specific, filterable data tables or charts related to "{reportTitle}".
                    For example, if this were a Customer Report, you'd show all events for a specific customer.
                </p>
            </div>
        </div>
    );
};

export default DetailedReport;
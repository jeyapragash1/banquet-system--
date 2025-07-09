import React from 'react';

const DataTable = ({ title, data, columns }) => {
  const getStatusChip = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2 py-1 text-xs font-semibold text-green-300 bg-green-500/20 rounded-full">Confirmed</span>;
      case 'Pending':
        return <span className="px-2 py-1 text-xs font-semibold text-yellow-300 bg-yellow-500/20 rounded-full">Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold text-gray-300 bg-gray-500/20 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full">
      <h3 className="font-bold text-lg text-white mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-4 py-3">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                {columns.map((col, colIndex) => {
                  // --- THIS IS THE KEY CHANGE ---
                  // It checks for a custom 'render' function on the column definition.
                  // If it exists, it uses it. Otherwise, it defaults to showing the data directly.
                  let cellContent = row[col.accessor];
                  if (col.accessor.includes('.')) {
                    const keys = col.accessor.split('.');
                    cellContent = row[keys[0]] ? row[keys[0]][keys[1]] : 'N/A';
                  }

                  if (col.render) {
                    cellContent = col.render(row);
                  } else if (col.accessor === 'status') {
                    cellContent = getStatusChip(row[col.accessor]);
                  }
                  
                  return (
                    <td key={colIndex} className="px-4 py-4 font-medium text-gray-200 whitespace-nowrap">
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
import React from 'react';

const Table = ({ playerarr, winner }) => {
  const playerr = ['John', 'Kaif', 'Alice']; // Hardcoded nicknames

  // Fallback if playerarr is empty or undefined
  if (!Array.isArray(playerarr) || playerarr.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Players:</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-gray-700">#</th>
                <th className="px-4 py-2 text-gray-700">Address</th>
                <th className="px-4 py-2 text-gray-700">Nickname</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" className="text-center px-4 py-2 text-gray-500">
                  No players found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Players:</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-gray-700">#</th>
              <th className="px-4 py-2 text-gray-700">Address</th>
              <th className="px-4 py-2 text-gray-700">Nickname</th>
            </tr>
          </thead>
          <tbody>
            {playerarr.map((address, index) => (
              <tr key={index} className={`border-t border-gray-300 ${winner === address ? 'bg-yellow-200' : ''}`}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{address}</td>
                <td className="px-4 py-2">{playerr[index] || 'N/A'}</td> {/* Fallback for missing nickname */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

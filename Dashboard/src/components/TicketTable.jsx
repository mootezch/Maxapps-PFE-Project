import React from 'react';

const TicketTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase">Client</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase">Subject</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200">
            <td className="px-4 py-3 flex items-center">
              <img src="url_to_profile_pic" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
              <span className="text-sm text-gray-700">John Doe</span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">Issue with login</td>
            <td className="px-4 py-3 text-sm font-semibold text-yellow-500">Pending</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;

import React from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaProjectDiagram, FaTicketAlt, FaUsers, FaClipboardList, FaFolderOpen } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D'],
    datasets: [
      {
        label: 'Tickets',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tickets per Project',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Statistics Overview */}
          <section aria-labelledby="statistics-overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/projet" className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:shadow-xl transition-shadow">
                <FaProjectDiagram className="text-blue-500 text-3xl mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Projects</h2>
                  <p className="text-gray-600 text-lg">8</p>
                </div>
              </Link>


              <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              
              <Link to="/ticket" className="bg-white  rounded-lg p-6 flex items-center hover:shadow-l transition-shadow">
              <FaTicketAlt className="text-green-500 text-3xl mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tickets</h2>
                  <p className="text-gray-600 text-lg">45</p>
                </div>
              </Link>

                
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <Link to="/users" className="bg-white  rounded-lg p-6 flex items-center hover:shadow-l transition-shadow">
                <FaUsers className="text-blue-500 text-3xl mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Users</h2>
                  <p className="text-gray-600 text-lg">8</p>
                </div>
              </Link>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                <FaClipboardList className="text-red-500 text-3xl mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pending Tickets</h2>
                  <p className="text-gray-600 text-lg">10</p>
                </div>
              </div>
            </div>
          </section>
          {/* Projects Overview */}
          <section aria-labelledby="projects-overview" className="mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-4 rounded-lg shadow flex items-start">
                  <FaFolderOpen className="text-blue-900 text-2xl mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Project A</h3>
                    <p className="text-blue-800">Client: Client X</p>
                    <p className="text-blue-800">Status: Active</p>
                  </div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow flex items-start">
                  <FaFolderOpen className="text-blue-900 text-2xl mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Project B</h3>
                    <p className="text-blue-800">Client: Client Y</p>
                    <p className="text-blue-800">Status: Inactive</p>
                  </div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow flex items-start">
                  <FaFolderOpen className="text-blue-900 text-2xl mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Project C</h3>
                    <p className="text-blue-800">Client: Client Z</p>
                    <p className="text-blue-800">Status: Active</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Tickets per Project Chart */}
          <section aria-labelledby="tickets-per-project" className="mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tickets per Project</h2>
              <Bar data={data} options={options} />
            </div>
          </section>
          {/* Recent Users */}
          <section aria-labelledby="recent-users" className="mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200">John Doe</td>
                      <td className="py-2 px-4 border-b border-gray-200">Administrator</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200">Jane Smith</td>
                      <td className="py-2 px-4 border-b border-gray-200">Moderator</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200">Alice Johnson</td>
                      <td className="py-2 px-4 border-b border-gray-200">User</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

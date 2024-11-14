import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateUserModal from './modify-user';
import DeleteUserModal from './delete-user';
import { toast } from 'react-hot-toast';
import { api_nestjs } from "../../utils/client"; // Ensure you have this utility to handle API requests

const Users = () => {
  const [clients, setClients] = useState([]); // State for clients
  const { isLoading: clientsLoading, refetch, isError: clientsError, error: clientsErrorData } = useQuery('clients', () =>
    api_nestjs.get('/clients', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onSuccess: (data) => {
        setClients(data);
      },
      onError: (error) => {
        toast.error(error.message || "An error occurred while fetching clients");
      }
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setIsDeleteConfirmationOpen(true);
  };

  const openModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUserFromList = (idClient) => {
    setClients(clients.filter(client => client.idClient !== idClient));
  };

  if (clientsLoading) {
    return <p>Loading...</p>;
  }

  if (clientsError) {
    return <p>Error loading data: {clientsErrorData.message}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Clients List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Telephone</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {clients && clients.map(client => (
              <tr key={client.idClient} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{`${client.nom} ${client.prenom}`}</td>
                <td className="py-3 px-6 text-left">{client.user.email}</td>
                <td className="py-3 px-6 text-left">{client.telephone}</td>
                <td className="py-3 px-6 text-left">{client.adresse}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${client.user.status ? 'bg-green-500' : 'bg-blue-500'}`}
                  >
                    {client.user.status ? 'ACTIVE' : 'DISABLED'}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => openModal(client)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <span className="mx-2">|</span>
                    <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => handleDeleteUser(client)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modals */}
      <UpdateUserModal user={currentUser} refetch={refetch} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DeleteUserModal user={currentUser} refetch={refetch} isOpen={isDeleteConfirmationOpen} onClose={() => setIsDeleteConfirmationOpen(false)} onDeleteUser={handleDeleteUserFromList} />
    </div>
  );
};

export default Users;

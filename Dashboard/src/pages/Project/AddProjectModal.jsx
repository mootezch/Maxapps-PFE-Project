import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { api_nestjs } from "../../utils/client"; // Ensure you have this utility to handle API requests

const AddProjectModal = ({ isOpen, onClose }) => {
  const [projectData, setProjectData] = useState({
    nom: '',
    deadline: '',
    idClient: '',
    description: '',
    status: 'Pending' // Default to Pending
  });

  const queryClient = useQueryClient();

  const { data: clients, isLoading: clientsLoading, isError: clientsError } = useQuery('clients', () =>
    api_nestjs.get('/clients', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onError: (error) => {
        toast.error(error.message || "An error occurred while fetching clients");
      }
    }
  );

  const mutation = useMutation(
    newProject => api_nestjs.post('/projects/add', newProject, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        toast.success('Project added successfully');
        onClose();
      },
      onError: (error) => {
        toast.error(error.message || "An error occurred while adding the project");
      }
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(projectData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="nom" name="nom" value={projectData.nom} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
            <input type="date" id="deadline" name="deadline" value={projectData.deadline} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="idClient" className="block text-sm font-medium text-gray-700">Client</label>
            <select id="idClient" name="idClient" value={projectData.idUser} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" required>
              <option value="">Select a client</option>
              {clients && clients.map(client => (
                <option key={client.idClient} value={client.idClient}>
                  {client.nom} {client.prenom}
                </option>
              ))}
            </select>
            {clientsLoading && <p>Loading clients...</p>}
            {clientsError && <p>Error loading clients</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={projectData.description} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" name="status" value={projectData.status} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" required>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { api_nestjs } from "../../utils/client"; // Ensure you have this utility to handle API requests

const UpdateProjectModal = ({ project, isOpen, onClose }) => {
  const [projectData, setProjectData] = useState({
    nom: '',
    deadline: '',
    idClient: '',
    description: '',
    status: ''
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (project) {
      setProjectData({
        nom: project.nom,
        deadline: project.deadline,
        idClient: project.idClient,
        description: project.description,
        status: project.status
      });
    }
  }, [project]);

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
    updatedProject => api_nestjs.put(`/projects/${project.id}`, updatedProject, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        toast.success('Project updated successfully');
        onClose();
      },
      onError: (error) => {
        toast.error(error.message || "An error occurred while updating the project");
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
        <h3 className="text-xl font-semibold mb-4">Update Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="nom" name="nom" value={projectData.nom} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
            <input type="date" id="deadline" name="deadline" value={projectData.deadline} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="idUser" className="block text-sm font-medium text-gray-700">Client</label>
            <select id="idClient" name="idClient" value={projectData.idUser} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
              <option value="">Select a client</option>
              {clients && clients.map(client => (
                <option key={client.idClient} value={client.idClient} selected={client.idClient === project.idClient}>
                  {client.nom} {client.prenom}
                </option>
              ))}
            </select>
            {clientsLoading && <p>Loading clients...</p>}
            {clientsError && <p>Error loading clients</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={projectData.description} onChange={handleChange} rows="3" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" name="status" value={projectData.status} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
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
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectModal;

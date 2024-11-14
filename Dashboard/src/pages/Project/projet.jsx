import React, { useState} from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import UpdateProjectModal from './update-projet';
import DeleteProjectModal from './delete-projet';
import AddProjectModal from './AddProjectModal';
import { toast } from 'react-hot-toast';
import { api_nestjs } from "../../utils/client"; // Ensure you have this utility to handle API requests

const Projects = () => {
  const { data: projects, isLoading: projectsLoading, isError: projectsError, error: projectsErrorData } = useQuery('projects', () =>
    api_nestjs.get('/projects', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onError: (error) => {
        toast.error(error.message || "An error occurred while fetching projects");
      }
    }
  );

  const { data: clients, isLoading: clientsLoading, isError: clientsError, error: clientsErrorData } = useQuery('clients', () =>
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleDeleteProject = (project) => {
    setCurrentProject(project);
    setIsDeleteConfirmationOpen(true);
  };

  const openModal = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const addProject = (newProject) => {
    // Add your add project logic here
    setIsAddProjectModalOpen(false);
  };

  if (projectsLoading || clientsLoading) {
    return <p>Loading...</p>;
  }

  if (projectsError || clientsError) {
    return <p>Error loading data: {projectsError ? projectsErrorData.message : clientsErrorData.message}</p>;
  }

  const getClientName = (idUser) => {
    const client = clients.find(client => client.idUser === idUser);
    return client ? `${client.nom} ${client.prenom}` : 'No client assigned';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Projects List</h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsAddProjectModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Deadline</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Client</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {projects && projects.map(project => (
              <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{project.nom}</td>
                <td className="py-3 px-6 text-left">{project.deadline}</td>
                <td className="py-3 px-6 text-left">{project.description}</td>
                <td className="py-3 px-6 text-left">{project.status}</td>
                <td className="py-3 px-6 text-left">{project.client.nom} {project.client.prenom}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => openModal(project)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <span className="mx-2">|</span>
                    <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => handleDeleteProject(project)}>
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
      <UpdateProjectModal project={currentProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DeleteProjectModal project={currentProject} isOpen={isDeleteConfirmationOpen} onClose={() => setIsDeleteConfirmationOpen(false)} />
      <AddProjectModal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} addProject={addProject} />
    </div>
  );
};

export default Projects;

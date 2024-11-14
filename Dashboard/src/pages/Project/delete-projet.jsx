import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { api_nestjs } from "../../utils/client"; // Ensure you have this utility to handle API requests

const DeleteProjectModal = ({ project, isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    projectId => api_nestjs.delete(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        toast.success('Project deleted successfully');
        onClose();
      },
      onError: (error) => {
        toast.error(error.message || "An error occurred while deleting the project");
      }
    }
  );

  const handleConfirmDelete = () => {
    if (project && project.id) {
      mutation.mutate(project.id);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 w-full max-w-md rounded">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this project?</p>
        <div className="flex justify-between items-center">
          <span style={{ fontSize: '2rem' }}>🤔</span>
          <div className="flex justify-end">
            <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded mr-2">Yes</button>
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;

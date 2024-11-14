import React, { useState } from 'react';

const ModifyTicketModal = ({ isOpen, onClose, onUpdateTicket, ticket }) => {
  const [formData, setFormData] = useState({ ...ticket });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTicket(formData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 w-full max-w-lg rounded">
        <h2 className="text-lg font-semibold">Modify Ticket</h2>
        <form onSubmit={handleSubmit}>
          <label className="block">
            Project Name
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full border-2 p-2"
            />
          </label>
          <label className="block">
            Client Name
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full border-2 p-2"
            />
          </label>
          <label className="block">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border-2 p-2"
            />
          </label>
          <label className="block">
            Date
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border-2 p-2"
            />
          </label>
          <label className="block">
            Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border-2 p-2 mt-2"
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
            </select>
          </label>
          <label className="block">
            Ticket Type
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className="w-full border-2 p-2 mt-2"
            >
              <option value="Type A">Type A</option>
              <option value="Type B">Type B</option>
              <option value="Type C">Type C</option>
            </select>
          </label>
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyTicketModal;

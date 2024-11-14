import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { api_nestjs } from '../../utils/client'; // Ensure you have this utility to handle API requests

const ModifyUserModal = ({ user, isOpen, onClose,refetch }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    console.log(user)
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nom || !formData?.user?.email || !formData.adresse || !formData.telephone) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {

      let formdata_new = {...formData}

      delete formdata_new["user"]

      const response = await api_nestjs.put(`users/${user.idUser}`, formdata_new, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('User updated successfully');
      refetch()
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while updating the user');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 w-full max-w-lg rounded">
        <h2 className="text-lg font-semibold">Modify User</h2>
        <form onSubmit={handleSubmit}>
          <label className="block">
            Name
            <input
              type="text"
              name="nom"
              value={formData.nom || ''}
              onChange={handleChange}
              className="w-full border-2 p-2"
            />
          </label>
          <label className="block">
            Email
            <input
              type="email"
              name="email"
              value={formData?.user?.email || ''}
              onChange={handleChange}
              className="w-full border-2 p-2"
            />
          </label>
          <label className="block">
            Address
            <input
              type="text"
              name="adresse"
              value={formData.adresse || ''}
              onChange={handleChange}
              className="w-full border-2 p-2"
            />
          </label>
          <div className="mb-4">
            <label htmlFor="userStatus" className="block">Status</label>
            <select id="userStatus" name="userStatus"  onChange={handleChange} className="w-full border-2 p-2" required>
              <option value="">Select a status</option>
                <option value={true}>true
                </option>
                <option value={false}>false
                </option>
            </select>
          </div>

          <label className="block">
            Telephone
            <input
              type="text"
              name="telephone"
              value={formData.telephone || ''}
              onChange={handleChange}
              className="w-full border-2 p-2"
              pattern="\d*"
              title="Only numeric values are allowed"
            />
          </label>
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyUserModal;

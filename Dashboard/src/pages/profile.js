import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [role, setRole] = useState('Software Engineer');
  const [profilePic, setProfilePic] = useState(() => {
    // Retrieve profile picture URL from local storage, if available
    return localStorage.getItem('profilePic') || 'https://via.placeholder.com/150';
  });

  useEffect(() => {
    // Save profile picture URL to local storage
    localStorage.setItem('profilePic', profilePic);
  }, [profilePic]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = () => {
    setEditing(false);
    // You can add logic here to save profile changes
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-semibold mb-4">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4 flex items-center justify-center">
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          {editing && (
            <label htmlFor="profilePic" className="ml-4 cursor-pointer text-indigo-500 hover:underline">
              Change Profile Picture
              <input
                type="file"
                id="profilePic"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </label>
          )}
        </div>
        {editing ? (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                Role:
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={handleRoleChange}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-800 mb-4">Name: {name}</p>
            <p className="text-gray-800 mb-4">Email: {email}</p>
            <p className="text-gray-800 mb-4">Role: {role}</p>
            <div className="flex justify-end">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

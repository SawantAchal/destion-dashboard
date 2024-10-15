import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const email = localStorage.getItem('currentUserEmail');
    if (email) {
      const storedUser = JSON.parse(localStorage.getItem(email));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Profile</h1>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">User Information</h2>
          <p className="text-lg text-gray-600 mb-2">
            <strong className="text-gray-700">Name:</strong> {user.name }
          </p>
          <p className="text-lg text-gray-600">
            <strong className="text-gray-700">Email:</strong> {user.email }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const email = localStorage.getItem('authUser');
    if (email) {
      const storedUser = JSON.parse(localStorage.getItem(email));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  return (
    <>
    <div className=' h-full m-0 p-0'>
      <div className='bg-gradient-to-r from-[#023047] to-[#5072A7] h-[30%] w-full  '>
        <h1 className='pt-10 text-xl font-bold text-white text-center'>PROFILE</h1>
      </div>
        <img className='h-36 rounded-full  -mt-14 ml-9' src='https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=' alt='profile image'/>
      <div className='bg-gray-500'>
      <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
            User Information
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-2">
            <strong className="text-gray-700">Name:</strong> {user.name || 'N/A'}
          </p>
          <p className="text-base sm:text-lg text-gray-600">
            <strong className="text-gray-700">Email:</strong> {user.email || 'N/A'}
          </p>
        </div>
      </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default Profile;

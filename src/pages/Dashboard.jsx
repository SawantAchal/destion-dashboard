import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Setting from '../components/Setting';
import Profile from '../components/Profile';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponents] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Profile':
        return <Profile />;
      case 'Setting':
        return <Setting />;
      default:
        return <>
    <div className=' h-full m-0 p-0'>
      <div className='bg-[#ffb703] h-[30%] w-full  '>
        <h1 className='pt-10 text-xl font-bold text-white text-center'>DASHBORAD</h1>
        <p className='text-center text-white pt-6'>Select a page from the sidebar</p>
      </div>
      <div className='bg-white'>
      </div>
  </div>
        </>;
    }
  };

  return (
    <div className="min-h-screen flex fixed mt-10 w-full">
      <Header onSelectComponent={setSelectedComponents}  handleLogout={handleLogout}/>
      <aside className="w-64 bg-[#023047] hidden text-white md:flex flex-col">
        <nav className="flex-1 p-4 mt-9">
          <ul>
            <li className="mb-4 " onClick={() => setSelectedComponents('Profile')}>
              <p  className="p-2 hover:bg-gradient-to-t from-sky-800 to-blue-400 hover:text-white transition-all duration-200 cursor-pointer rounded-md text-center">PROFILE</p>
            </li>
            <li className="mb-4" onClick={() => setSelectedComponents('Setting')}>
              <p  className="p-2 hover:bg-gradient-to-t from-sky-800 to-blue-400 hover:text-white transition-all duration-200 cursor-pointer rounded-md text-center">SETTING</p>
            </li>
            <li  className="mb-4">
              <p onClick={handleLogout} className="p-2 hover:bg-gradient-to-t from-sky-800 to-blue-400 hover:text-white transition-all duration-200 cursor-pointer rounded-md text-center">LOGOUT</p>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 ">
        {/* <h1 className="text-3xl font-bold  p-6">{selectedComponent || 'Dashboard'}</h1> */}
        {renderComponent()}
      </main>
    </div>
  );
};

export default Dashboard;

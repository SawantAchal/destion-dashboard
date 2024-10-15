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
        return <div>Select a page from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen flex fixed mt-10 w-full">
      <Header onSelectComponent={setSelectedComponents}  handleLogout={handleLogout}/>
      <aside className="w-64 bg-gray-800 hidden text-white md:flex flex-col">
        <nav className="flex-1 p-4 mt-9">
          <ul>
            <li className="mb-4" onClick={() => setSelectedComponents('Profile')}>
              <p  className="hover:text-gray-300">Profile</p>
            </li>
            <li className="mb-4" onClick={() => setSelectedComponents('Setting')}>
              <p  className="hover:text-gray-300">Settings</p>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">{selectedComponent || 'Dashboard'}</h1>
        {renderComponent()}
      </main>
    </div>
  );
};

export default Dashboard;

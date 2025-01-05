import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import JournalEntity from './JournalEntity/JournalEntity';
import User from './User/User.jsx';
import PropTypes from 'prop-types';

const Dashboard = ({ activePage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        console.log('dash');
        return <DashboardHome />;
      case 'journal':
        console.log('journal');
        return <JournalEntity />;
      case 'user':
        confirm('user');
        return <User />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">
        {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
      </h2>
      {renderPage()}
    </div>
  );
};

Dashboard.propTypes = {
  activePage: PropTypes.string.isRequired,
};

export default Dashboard;

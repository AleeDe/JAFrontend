import { useState, useEffect } from 'react';
import { BarChart2, Home, LogOut, Users, Menu } from 'react-feather';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ activePage, setActivePage ,setIsAuthenticated}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2, link: '/dashboard' },
    { 
      id: 'home', label: 'Home Page', icon: Home, 
      link: '',
      dropdown: [
        { id: 'hero', label: 'Hero', link: '/hero' },
        { id: 'about', label: 'About Us', link: '/about' },
        { id: 'features', label: 'Features', link: '/features' },
        { id: 'testimonials', label: 'Testimonials', link: '/testimonials' }
      ]
    },
    { id: 'journal', label: 'Journal Entity', icon: Users, link: '/journal' },
    { id: 'user', label: 'User', icon: Users, link: '/user' },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role !== 'ADMIN') {
      navigate('/login');
    }
    
    const currentPath = location.pathname;
    let activeItem = null;
    let activeSubItem = null;

    menuItems.forEach(item => {
      if (item.link === currentPath) {
        activeItem = item;
      }
      if (item.dropdown) {
        item.dropdown.forEach(subItem => {
          if (subItem.link === currentPath) {
            activeItem = item;
            activeSubItem = subItem;
          }
        });
      }
    });

    if (activeItem) {
      setActivePage(activeItem.id);
      if (activeItem.dropdown) {
        setActiveDropdown(activeItem.id);
        if (activeSubItem) {
          setActivePage(activeSubItem.id);
        }
      }
    }
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleMenuClick = (item) => {
    if (item.dropdown) {
      setActiveDropdown(activeDropdown === item.id ? '' : item.id);
    } else {
      setActivePage(item.id);
      setIsSidebarOpen(false);
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <button
        className="p-4 text-white bg-gray-800 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      <nav
        className={`fixed inset-y-0 left-0 z-50 flex flex-col p-6 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <h1 className="mb-8 text-2xl font-bold text-center">MyWebsite</h1>
        <ul className="flex-grow">
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <Link
                to={item.link || '#'}
                className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ease-in-out ${
                  activePage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handleMenuClick(item)}
              >
                <item.icon className="mr-2" size={18} />
                <span>{item.label}</span>
              </Link>

              {item.dropdown && activeDropdown === item.id && (
                <ul className={`mt-2 ml-4 transition-all duration-300 ease-in-out transform ${activeDropdown === item.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  {item.dropdown.map(subItem => (
                    <li key={subItem.id} className="mb-2">
                      <Link
                        to={subItem.link}
                        className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-500 ${
                          activePage === subItem.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300'
                        }`}
                        onClick={() => {
                          setActivePage(subItem.id);
                          setIsSidebarOpen(false);
                        }}
                      >
                        <span>{subItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <button
          className="flex items-center justify-center w-full p-2 mt-4 text-white transition-all duration-200 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 hover:scale-105"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" size={18} />
          <span>Logout</span>
        </button>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

Sidebar.propTypes = {
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default Sidebar;

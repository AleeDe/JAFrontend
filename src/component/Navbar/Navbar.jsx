import { useState} from 'react';
import PropTypes from 'prop-types';
import { UserCircle, Settings, LogOut, Menu, X, LogIn, PlusCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/journalhome', label: 'Post' },
    { href: '/abouthome', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center text-xl font-bold text-blue-600">
              MindMemoirs
            </a>
          </div>

          {/* Navigation Links */}
          <div className="items-center hidden space-x-8 md:flex">
            {isAuthenticated && links.map((link) => (
              <a key={link.href} href={link.href} className="flex items-center text-gray-600 hover:text-gray-900">
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons or Profile Menu and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // Profile Menu for authenticated users
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <UserCircle className="w-8 h-8" />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{sessionStorage.getItem('username')}</p>
                      <p className="text-sm text-gray-500">{sessionStorage.getItem('username')}@example.com</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircle className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    {/* <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Auth buttons for non-authenticated users
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center p-2 text-gray-600 rounded-md hover:text-gray-900"
                  aria-label="Sign in"
                >
                  <LogIn className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="flex items-center p-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                  aria-label="Get started"
                >
                  <PlusCircle className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Mobile menu button (visible only on mobile) */}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md md:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated && links.map((link) => (
            <a key={link.href} href={link.href} className="flex items-center text-gray-600 hover:text-gray-900">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};


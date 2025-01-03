import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginSignUpForm({ url, setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  
    return () => clearTimeout(timer);
  }, []);
      
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isLogin) {
        const response = await axios.post(url + '/public/createUser', formData);
        console.log(response);
        setIsLogin(true);
        toast.success("Login Successfull!");
        setFormData({
          username: '',
          password: '',
        });
        toast.success("Singup Successfull!");
        navigate("/login");
      } else {
        const response = await axios.post(url + '/public/login', formData);
        console.log(response);
        
        if (response.data && response.status === 200) {
          
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('password');
          sessionStorage.removeItem('role');

          sessionStorage.setItem('username', formData.username);
          sessionStorage.setItem('password', formData.password);
          sessionStorage.setItem('role', response.data);
          setIsAuthenticated(true);
          toast.success("Login Successfull!");
          if (response.data === "ADMIN") {
            navigate('/dashboard');
          } else if (response.data === "STUDENT") {
            navigate('/');
          } else if (response.data === "PARENT") {
            navigate('/progress');
          } else {
            console.log("Wrong User Role!");
          }
        } else {
          toast.error("Invalid username and password!");
        }
      }
    } catch (er) {
      console.log(er);
    if(er.code ==="ERR_NETWORK"){
      toast.error("Server is Down!");
    }
      if(er.status === 409) {
        toast.error("Username Already exist!");
      }
      toast.error(er);
    } finally {
      setLoading(false);
    }
  };
  
  if (isLoading) {
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <h2 className="mb-6 text-2xl font-bold text-center">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded"></div>
      </div>
    </h2>
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </label>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </label>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-10 bg-gray-300 rounded"></div>
      </div>
    </form>
    <p className="mt-4 text-sm text-center">
      <div className="animate-pulse">
        <div className="w-3/4 h-4 mx-auto bg-gray-300 rounded"></div>
      </div>
    </p>
  </div>
</div>

      
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-sky-600 hover:text-sky-500 focus:outline-none"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
        {loading && (
          <div className="flex justify-center mt-4">
            <svg className="w-6 h-6 text-sky-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 12h2zm2 5.292l1.707 1.707C8.098 18.097 9.196 18 10 18v-2c-.552 0-1-.448-1-1h-2a8 8 0 01-1.707-1.708L6 17.292z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

LoginSignUpForm.propTypes = {
  url: PropTypes.string.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

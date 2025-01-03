import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, Users, UserPlus, Search, X } from 'lucide-react';
import { toast } from 'react-toastify';
// Function to generate a random avatar URL
const getRandomAvatar = (username) => {
  const styles = ['adventurer', 'avataaars', 'big-ears', 'big-smile', 'bottts', 'croodles', 'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art', 'shapes'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  return `https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${encodeURIComponent(username)}`;
};

  const baseURL = "http://localhost:8080/admin"; // Replace with your API base URL


const roleColors = {
  user: 'bg-blue-100 text-blue-800',
  moderator: 'bg-purple-100 text-purple-800',
};

const User = ({ url }) => {
  const baseURL = url; 
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');
  const auth = 'Basic ' + btoa(username + ':' + password);
  const [isLoading, setIsLoading] = useState(true)
  const authHeaders = {
    headers: {
      'Authorization': auth // Replace 'username:password' with your actual credentials
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios .get(baseURL+'/getUsers', authHeaders); // Replace with your API endpoint
      const usersWithAvatars = response.data.map(user => ({
        ...user,
        avatar: getRandomAvatar(user.username),
        
      }));
      setUsers(usersWithAvatars);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      setIsLoading(true);
      await axios.delete(baseURL+`/deleteUser/${userId}`, authHeaders); // Replace with your API endpoint
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      ...editingUser,
      username: formData.get('username'),
      password: formData.get('password'),
      roles: formData.get('roles'),
    };
    try {
      console.log(updatedUser);
      setIsLoading(true);
      await axios.put(baseURL+`/updateUser/${updatedUser.id}`, updatedUser, authHeaders); // Replace with your API endpoint
      setUsers(users.map(user => user.id === updatedUser.id ? { ...updatedUser, avatar: getRandomAvatar(updatedUser.username) } : user));
      setEditingUser(null);
      setIsModalOpen(false);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return(
      <div className="min-h-screen">
  <div className="container p-4 mx-auto text-gray-800 transition-colors duration-300 rounded-lg shadow-lg bg-gradient-to-br from-indigo-50 to-pink-50">
    <header className="flex items-center justify-between p-4 mb-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-36 animate-pulse"></div>
      </div>
    </header>

    <div className="flex items-center justify-between mb-6">
      <div className="relative w-full max-w-xs">
        <div className="absolute w-4 h-4 transform -translate-y-1/2 bg-gray-300 rounded-full left-3 top-1/2 animate-pulse"></div>
        <div className="w-full py-2 pl-10 pr-4 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="flex items-center h-10 px-4 py-2 space-x-2 text-white bg-gray-300 rounded-full animate-pulse w-36"></div>
    </div>

    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 p-4 transition-colors duration-150 border-b border-gray-100">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    
  </div>
</div>


    );
  }
  return (
    <div className="min-h-screen">
      <div className="container p-4 mx-auto text-gray-800 transition-colors duration-300 rounded-lg shadow-lg bg-gradient-to-br from-indigo-50 to-pink-50">
        <header className="flex items-center justify-between p-4 mb-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text">User Management Dashboard</h1>
          </div>
        </header>

        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="py-2 pl-10 pr-4 text-gray-800 bg-white border-2 border-indigo-200 rounded-full focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          </div>
          <button 
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-200 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700"
          >
            <UserPlus className="w-5 h-5" />
            <span>List of User</span>
          </button>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">
            <div>Avatar</div>
            <div>Username</div>
            <div>Role</div>
            <div>Created</div>
            <div>Actions</div>
          </div>
          <AnimatePresence>
            {users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid items-center grid-cols-5 gap-4 p-4 transition-colors duration-150 border-b border-gray-100 hover:bg-gray-50"
              >
                <div>
                  <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                </div>
                <div className="font-medium">{user.username}</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColors[user.roles] || 'bg-gray-100 text-gray-800'}`}>
                    {user.roles || 'Unknown'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{user.created}</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex items-center px-3 py-1 space-x-1 text-indigo-600 transition-colors duration-200 rounded-md bg-indigo-50 hover:bg-indigo-100"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex items-center px-3 py-1 space-x-1 text-red-600 transition-colors duration-200 rounded-md bg-red-50 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg w-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Edit User</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={editingUser?.username}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="passwrod"
                    name="password"
                    placeholder='new password'
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="roles"
                    name="roles"
                    defaultValue={editingUser?.role}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="PARENT">PARENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white transition-colors duration-200 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700"
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;


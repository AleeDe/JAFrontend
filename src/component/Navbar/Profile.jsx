import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, User, Camera, MapPin, Calendar, Briefcase } from 'lucide-react';

// Demo user data
const demoUser = {
  id: '1',
  username: sessionStorage.getItem('username'),
  name: sessionStorage.getItem('username'),
  email: sessionStorage.getItem('username') + '@example.com',
  bio: 'Passionate about technology and photography. Always learning, always growing.',
  location: 'San Francisco, CA',
  joinDate: 'June 2020',
  occupation: 'Software Engineer',
  coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80'
};

// API URL for posts
 // Replace with your actual API endpoint

// Basic Auth credentials
const username = sessionStorage.getItem('username');
const password = sessionStorage.getItem('password');
const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

export default function Profile({ url }) {
  const POSTS_API_URL = url+'/journal'; 
  const [user, setUser] = useState(demoUser);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get(POSTS_API_URL+'/getJournalEntriesOfUser', {
          headers: {
            Authorization: authHeader
          }
        });
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(`${POSTS_API_URL}/updateJournalEntry/${editingPost.id}`, editingPost, {
        headers: {
          Authorization: authHeader
        }
      });
      if (response.status === 200) {
        const updatedPosts = posts.map((p) =>
          p.id === editingPost.id ? response.data : p
        );
        setPosts(updatedPosts);
        setEditingPost(null);
      } else {
        console.error('Error updating post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${POSTS_API_URL}/deleteJournalEntry/${postId}`, {
        headers: {
          Authorization: authHeader
        }
      });
      if (response.status === 200) {
        const updatedPosts = posts.filter((p) => p.id !== postId);
        setPosts(updatedPosts);
      } else {
        console.error('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
        <div className="min-h-screen mt-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-4xl p-4 mx-auto sm:p-6 lg:p-8">
          {/* Cover Photo Skeleton */}
          <div className="relative h-64 mb-6 overflow-hidden bg-gray-300 rounded-xl animate-pulse">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute flex items-center bottom-4 left-4">
              <div className="p-1 bg-white rounded-full">
                <div className="p-4 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-4">
                <div className="w-24 h-8 bg-gray-400 rounded-md animate-pulse"></div>
                <div className="w-16 h-4 mt-2 bg-gray-400 rounded-md animate-pulse"></div>
              </div>
            </div>
            <button className="absolute p-2 transition duration-300 bg-white rounded-full bottom-4 right-4 hover:bg-purple-100">
              <div className="w-6 h-6 bg-gray-400 rounded-md animate-pulse"></div>
            </button>
          </div>
      
          {/* User Info Skeleton */}
          <div className="p-6 mb-8 bg-white shadow-lg rounded-xl animate-pulse">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="w-32 h-8 mb-2 bg-gray-400 rounded-md"></div>
                <div className="w-full h-4 bg-gray-300 rounded-md"></div>
              </div>
              <div className="space-y-2">
                <div className="w-40 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
      
          <div className="mb-6 text-2xl font-bold text-purple-800">My Posts</div>
      
          {/* Posts Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="mb-6 overflow-hidden bg-white shadow-lg rounded-xl animate-pulse"
              >
                <div className="p-6">
                  <div className="w-2/3 h-6 mb-2 bg-gray-400 rounded-md"></div>
                  <div className="w-full h-16 bg-gray-300 rounded-md"></div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                      <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end px-6 py-3 space-x-2 bg-gray-50">
                  <div className="w-16 h-6 bg-blue-400 rounded-md"></div>
                  <div className="w-16 h-6 bg-red-400 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="max-w-4xl p-4 mx-auto sm:p-6 lg:p-8">
        {/* Cover Photo */}
        <div className="relative h-64 mb-6 overflow-hidden rounded-xl">
          <img src={user.coverPhoto} alt="Cover" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute flex items-center bottom-4 left-4">
            <div className="p-1 bg-white rounded-full">
              <div className="p-4 text-white bg-purple-600 rounded-full">
                <User size={32} />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-white text-opacity-90">@{user.username}</p>
            </div>
          </div>
          <button className="absolute p-2 text-purple-600 transition duration-300 bg-white rounded-full bottom-4 right-4 hover:bg-purple-100">
            <Camera size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-purple-800">About Me</h2>
              <p className="text-gray-700">{user.bio}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                <span>Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase size={18} className="mr-2" />
                <span>{user.occupation}</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-purple-800">My Posts</h2>

        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mb-6 overflow-hidden bg-white shadow-lg rounded-xl"
            >
              <div className="p-6">
                {editingPost && editingPost.id === post.id ? (
                  <form onSubmit={handleUpdatePost} className="space-y-4">
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-white transition duration-300 bg-purple-600 rounded-md hover:bg-purple-700"
                    >
                      Update
                    </button>
                  </form>
                ) : (
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-purple-800">{post.title}</h3>
                    <p className="mb-4 text-gray-700">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Posted on {post.createdDate}</span>
                      <div className="flex items-center space-x-4">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end px-6 py-3 space-x-2 bg-gray-50">
                <button
                  onClick={() => handleEditPost(post)}
                  className="flex items-center px-3 py-1 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="flex items-center px-3 py-1 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 mt-8 text-center text-gray-500 bg-white shadow-md rounded-xl"
          >
            <h3 className="mb-2 text-xl font-semibold">No Posts Yet</h3>
            <p>You haven't created any posts. Start sharing your thoughts!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}


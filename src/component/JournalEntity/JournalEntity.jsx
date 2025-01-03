import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Edit2, Trash2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify';

const createApiInstance = (url) => {
   return axios.create({
     baseURL: url, // Replace with your API base URL
      }) }
// Demo data
const demoData = []

export default function JournalEntity({ url }) {
  const api = createApiInstance(url)
  const [posts, setPosts] = useState(demoData)
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [editingPost, setEditingPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // Simulating API fetch with demo data
      try {
        const username = sessionStorage.getItem('username');
        const password = sessionStorage.getItem('password');
        const auth = 'Basic ' + btoa(username + ':' + password);

        const response = await api.get('/public/getJournalEntries', {
          headers: {
            Authorization: auth
          }
        });
        console.log(response.data)
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCreatePost = async (e) => {
    e.preventDefault()

    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const auth = 'Basic ' + btoa(username + ':' + password);

    setIsLoading(true);
    try {
      console.log(newPost);
      const response = await api.post('/journal', newPost, {
        headers: {
          Authorization: auth
        }
      });
      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '' });
      setError(null);
      toast.success("Successfully created post!");
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
  }

  const handleUpdatePost = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (editingPost) {
      const username = sessionStorage.getItem('username');
      const password = sessionStorage.getItem('password');
      const auth = 'Basic ' + btoa(username + ':' + password);

      try {
        const response = await api.put(`/journal/updateJournalEntry/${editingPost.id}`, editingPost, {
          headers: {
            Authorization: auth
          }
        });
        const updatedPosts = posts.map(p => p.id === editingPost.id ? response.data : p);
        setPosts(updatedPosts);
        setEditingPost(null);
        setError(null);
        toast.success("Post updated successfully!");
      } catch (err) {
        setError('Failed to update post. Please try again.');
        console.error('Error updating post:', err);
      }
      finally {
        setIsLoading(false);
        }
    }
  }

  const handleDeletePost = async (id) => {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const auth = 'Basic ' + btoa(username + ':' + password);

    try {
      await api.delete(`/journal/deleteJournalEntry/${id}`, {
        headers: {
          Authorization: auth
        }
      });
      setPosts(posts.filter(p => p.id !== id))
      setError(null)
      toast.success("Post deleted successfully!");
    } catch (err) {
      setError('Failed to delete post. Please try again.')
      console.error('Error deleting post:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 mt-16 bg-gradient-to-br from-purple-100 to-pink-100 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-purple-800 sm:text-4xl sm:mb-8">Social Media Feed</h1>
        
        {error && (
          <div className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
    
        {/* Create Post Form Skeleton */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md sm:mb-8 animate-pulse">
          <h2 className="mb-4 text-xl font-semibold">Create a New Post</h2>
          <div className="space-y-4">
            <div className="w-full h-10 bg-gray-300 rounded-md"></div>
            <div className="w-full h-24 bg-gray-300 rounded-md"></div>
          </div>
          <div className="w-full h-10 mt-4 bg-purple-300 rounded-md"></div>
        </div>
    
        {/* Posts List Skeleton */}
        <motion.div layout className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden bg-white rounded-lg shadow-md animate-pulse"
            >
              <div className="p-6">
                <div className="w-2/3 h-6 mb-2 bg-gray-300 rounded-md"></div>
                <div className="w-full h-16 bg-gray-300 rounded-md"></div>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                </div>
              </div>
              <div className="flex justify-end px-6 py-3 space-x-2 bg-gray-50">
                <div className="w-16 h-6 bg-blue-300 rounded-md"></div>
                <div className="w-16 h-6 bg-red-300 rounded-md"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    
      
    );
  }

  const currentUser = sessionStorage.getItem('username');

  return (
    <div className="min-h-screen p-4 mt-16 bg-gradient-to-br from-purple-100 to-pink-100 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-purple-800 sm:text-4xl sm:mb-8">Social Media Feed</h1>
        
        {error && (
          <div className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Create Post Form */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md sm:mb-8">
          <h2 className="mb-4 text-xl font-semibold">Create a New Post</h2>
          <form onSubmit={handleCreatePost}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="What's on your mind?"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white transition duration-300 bg-purple-600 rounded-md hover:bg-purple-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        <motion.div layout className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden bg-white rounded-lg shadow-md"
            >
              <div className="p-6">
                {editingPost && editingPost.id === post.id ? (
                  <form onSubmit={handleUpdatePost} className="space-y-4">
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      required
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Update
                    </button>
                  </form>
                ) : (
                  <>
                    <h2 className="mb-2 text-2xl font-semibold text-purple-800">{post.title}</h2>
                    <p className="mb-4 text-gray-700">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.createdBy}</span>
                      <span>{post.createdDate}</span>
                    </div>
                  </>
                )}
              </div>
              {post.createdBy === currentUser && (
                <div className="flex justify-end px-6 py-3 space-x-2 bg-gray-50">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="flex items-center px-3 py-1 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="flex items-center px-3 py-1 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}


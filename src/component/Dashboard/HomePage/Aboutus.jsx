import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

const Aboutus = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    heading: '',
    paragraph: '',
    image: '',
  });
  const [errors, setErrors] = useState({});
  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');
  const auth = 'Basic ' + btoa(username + ':' + password);

  useEffect(() => {
    // Fetch data from the API
    fetch(url+'/public/home/get-about', {
      headers: {
        'Authorization': auth
      }
    })
      .then(response => response.json())
      .then(data => {
        setFormData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = 'ID is required';
    if (!formData.heading) newErrors.heading = 'Heading is required';
    if (!formData.paragraph) newErrors.paragraph = 'Paragraph is required';
    if (!formData.image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        await axios.put(url+'/home/update-about', formData, {
          headers: {
            'Authorization': auth
          }
        });
        console.log('Form data submitted:', formData);
        toast.success("Form data submitted!");
      } catch (error) {
        console.error('Error updating data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return(
      <div className="p-4 space-y-8 md:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="animate-pulse">
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-300 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg md:max-w-2xl" onSubmit={handleSubmit}>
      <div className="mb-8 text-lg font-bold text-center text-gray-800 animate-pulse">
        This is the part of the section. You can easily edit your section from here.
      </div>
      <div className="space-y-6">
        <div className="relative">
          <label className="block mb-2 text-sm font-bold text-gray-700">ID</label>
          <input
            type="text"
            readOnly
            name="id"
            value={formData.id}
            className="w-full px-3 py-2 bg-gray-100 border rounded-lg cursor-not-allowed"
          />
          {errors.id && <p className="mt-1 text-sm text-red-500">{errors.id}</p>}
        </div>
        <div className="relative">
          <label className="block mb-2 text-sm font-bold text-gray-700">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full px-4 py-2 transition-transform duration-300 ease-in-out transform border rounded-lg focus:ring-2 focus:ring-blue-400 hover:scale-105"
          />
          {errors.heading && <p className="mt-1 text-sm text-red-500">{errors.heading}</p>}
        </div>
        <div className="relative">
          <label className="block mb-2 text-sm font-bold text-gray-700">Paragraph</label>
          <textarea
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            className="w-full px-4 py-2 transition-transform duration-300 ease-in-out transform border rounded-lg focus:ring-2 focus:ring-blue-400 hover:scale-105"
          ></textarea>
          {errors.paragraph && <p className="mt-1 text-sm text-red-500">{errors.paragraph}</p>}
        </div>
        <div className="relative">
          <label className="block mb-2 text-sm font-bold text-gray-700">Image</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 transition-transform duration-300 ease-in-out transform border rounded-lg focus:ring-2 focus:ring-blue-400 hover:scale-105"
          />
          {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-6 text-white transition-transform duration-300 ease-in-out transform bg-green-500 rounded-lg hover:bg-green-600 hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

Aboutus.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Aboutus;

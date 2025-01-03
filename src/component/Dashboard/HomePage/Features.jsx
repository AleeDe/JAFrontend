import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Features = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: '',
    heading: '',
    subheading: '',
    features: [{ icon: '', title: '', description: '' }],
  });
  const [errors, setErrors] = useState({});
  
  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');
  const auth = 'Basic ' + btoa(username + ':' + password);
  
  useEffect(() => {
    // Fetch data from the API
    fetch(url+'/public/home/get-features')
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

  const handleFeatureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFeatures = formData.features.map((feature, i) =>
      i === index ? { ...feature, [name]: value } : feature
    );
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
    const updatedErrors = { ...errors };
    updatedErrors[`feature-${index}-${name}`] = '';
    setErrors(updatedErrors);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { icon: '', title: '', description: '' }],
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = 'ID is required';
    if (!formData.heading) newErrors.heading = 'Heading is required';
    if (!formData.subheading) newErrors.subheading = 'Subheading is required';
    formData.features.forEach((feature, index) => {
      if (!feature.icon) newErrors[`feature-${index}-icon`] = 'Icon is required';
      if (!feature.title) newErrors[`feature-${index}-title`] = 'Title is required';
      if (!feature.description) newErrors[`feature-${index}-description`] = 'Description is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        await axios.put(url+'/home/update-features', formData, {
          headers: {
            'Authorization': auth
          }
        });
        console.log('Form data submitted:', formData);
        setIsLoading(false);
        toast.success("Form data submitted!");
      } catch (error) {
        console.error('Error updating data:', error);
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
            name="id"
            readOnly
            
            value={formData.id}
            className="w-full px-3 py-2 bg-gray-100 border rounded-lg cursor-not-allowed"/>
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
          <label className="block mb-2 text-sm font-bold text-gray-700">Subheading</label>
          <input
            type="text"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
            className="w-full px-4 py-2 transition-transform duration-300 ease-in-out transform border rounded-lg focus:ring-2 focus:ring-blue-400 hover:scale-105"
          />
          {errors.subheading && <p className="mt-1 text-sm text-red-500">{errors.subheading}</p>}
        </div>
        <div className="relative">
          <label className="block mb-2 text-sm font-bold text-gray-700">Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex flex-col mb-4 md:flex-row">
              <input
                type="text"
                name="icon"
                value={feature.icon}
                onChange={(e) => handleFeatureChange(index, e)}
                placeholder="Icon"
                className="w-full px-4 py-2 mb-2 transition-transform duration-300 ease-in-out transform border rounded-lg md:mb-0 md:mr-2 focus:ring-2 focus:ring-blue-400 hover:scale-105"
              />
              {errors[`feature-${index}-icon`] && <p className="mt-1 text-sm text-red-500">{errors[`feature-${index}-icon`]}</p>}
              <input
                type="text"
                name="title"
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, e)}
                placeholder="Title"
                className="w-full px-4 py-2 mb-2 transition-transform duration-300 ease-in-out transform border rounded-lg md:mb-0 focus:ring-2 focus:ring-blue-400 hover:scale-105"
              />
              {errors[`feature-${index}-title`] && <p className="mt-1 text-sm text-red-500">{errors[`feature-${index}-title`]}</p>}
              <textarea
                name="description"
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, e)}
                placeholder="Description"
                className="w-full px-4 py-2 transition-transform duration-300 ease-in-out transform border rounded-lg focus:ring-2 focus:ring-blue-400 hover:scale-105"
              ></textarea>
              {errors[`feature-${index}-description`] && <p className="mt-1 text-sm text-red-500">{errors[`feature-${index}-description`]}</p>}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-4 py-2 mt-2 text-white transition-transform duration-300 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 md:mt-0 md:ml-2 hover:scale-105"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 mt-2 text-white transition-transform duration-300 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
          >
            Add Feature
          </button>
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

export default Features;

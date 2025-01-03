import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Hero = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    videoText: '',
    videoLink: '',
    trustedBy: '',
    companies: [{ name: '', src: '' }],
  });
  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');
  const auth = 'Basic ' + btoa(username + ':' + password);
  
  useEffect(() => {
    // Fetch data from the API
    fetch(url+'/public/home/get-hero')
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
  };

  const handleCompanyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCompanies = formData.companies.map((company, i) =>
      i === index ? { ...company, [name]: value } : company
    );
    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  const addCompany = () => {
    setFormData({
      ...formData,
      companies: [...formData.companies, { name: '', src: '' }],
    });
  };

  const removeCompany = (index) => {
    const updatedCompanies = formData.companies.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      companies: updatedCompanies,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(url+'/home/update-hero', formData,{
        headers: {
          'Authorization': auth
        }
      });
      console.log('Form data submitted:', formData);
      toast.success("Form data submitted!");
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return(
      <section className="flex flex-col justify-center w-full min-h-screen px-4 py-20 text-center">
  <div className="w-full max-w-4xl mx-auto">
    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
      <div className="w-1/2 h-10 mx-auto mb-2 bg-gray-300 animate-pulse"></div>
      <div className="w-1/4 h-10 mx-auto bg-gray-300 animate-pulse"></div>
    </h1>
    <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-600">
      <div className="w-3/4 h-6 mx-auto mb-2 bg-gray-300 animate-pulse"></div>
      <div className="w-2/3 h-6 mx-auto bg-gray-300 animate-pulse"></div>
    </p>
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="w-32 h-10 bg-blue-300 rounded-lg animate-pulse"></div>
      <div className="flex items-center text-gray-600">
        <div className="w-10 h-10 mr-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-24 h-6 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  </div>
  <div className="mt-20">
    <p className="mb-8 text-gray-600">
      <div className="w-32 h-6 mx-auto bg-gray-300 animate-pulse"></div>
    </p>
    <div className="grid items-center max-w-5xl grid-cols-2 gap-8 mx-auto md:grid-cols-3 lg:grid-cols-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex justify-center">
          <div className="w-24 h-8 bg-gray-300 animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
</section>
    );
  }

return (
    <form className="max-w-lg p-4 mx-auto bg-white rounded-lg shadow-md md:max-w-2xl" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">ID</label>
            <input
                type="text"
                name="id"
                value={formData.id}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border rounded-lg cursor-not-allowed"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Title</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Subtitle</label>
            <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Description</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
            ></textarea>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Button Text</label>
            <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Video Text</label>
            <input
                type="text"
                name="videoText"
                value={formData.videoText}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Video Link</label>
            <input
                type="text"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Trusted By</label>
            <input
                type="text"
                name="trustedBy"
                value={formData.trustedBy}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Companies</label>
            {formData.companies.map((company, index) => (
                <div key={index} className="mb-2">
                    <div className="flex flex-col md:flex-row">
                        <input
                            type="text"
                            name="name"
                            value={company.name}
                            onChange={(e) => handleCompanyChange(index, e)}
                            placeholder="Company Name"
                            className="w-full px-3 py-2 mb-2 border rounded-lg md:mb-0 md:mr-2"
                        />
                        <input
                            type="text"
                            name="src"
                            value={company.src}
                            onChange={(e) => handleCompanyChange(index, e)}
                            placeholder="Company Image Source"
                            className="w-full px-3 py-2 mb-2 border rounded-lg md:mb-0"
                        />
                        <button
                            type="button"
                            onClick={() => removeCompany(index)}
                            className="px-3 py-2 mt-2 text-white bg-red-500 rounded-lg hover:bg-red-600 md:mt-0 md:ml-2"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addCompany}
                className="px-3 py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
                Add Company
            </button>
        </div>
        <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
            Submit
        </button>
    </form>
);
};

export default Hero;

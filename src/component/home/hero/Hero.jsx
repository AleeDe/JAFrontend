import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function Hero() {
  const [state, setState] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    videoText: "",
    videoLink: "",
    trustedBy: "",
    companies: []
  });

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8080/public/home/get-hero')
      .then(response => response.json())
      .then(data => {
        setState(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="py-20 px-4 text-center w-full min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {state.title.split(' ')[0]} <span className="text-blue-600 relative">
            {state.title.split(' ').slice(1).join(' ')}
            <svg className="absolute w-full h-3 bottom-0 left-0 -z-10" viewBox="0 0 300 12" fill="none">
              <path d="M2 10C50 4 150 4 298 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </span>
          <br />
          {state.subtitle}
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {state.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="relative overflow-hidden bg-blue-600 text-white px-8 py-3 rounded-lg font-medium group">
            <span className="relative z-10">{state.buttonText}</span>
            <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          <a href={state.videoLink} className="group flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <span className="bg-gray-100 rounded-full p-2 mr-2 group-hover:bg-blue-100 transition-colors duration-300">
              <Play className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
            </span>
            {state.videoText}
          </a>
        </div>
      </div>
      <div className="mt-20">
        <p className="text-gray-600 mb-8">{state.trustedBy}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
          {state.companies.map((company) => (
            <div key={company.name} className="flex justify-center">
              <img
                src={company.src}
                alt={company.name}
                className="h-8 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

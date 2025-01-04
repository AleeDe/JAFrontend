import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function Hero({ url }) {
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
    fetch(url+'/public/home/get-hero')
      .then(response => response.json())
      .then(data => {
        setState(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="flex flex-col justify-center w-full min-h-screen px-4 py-20 text-center">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          {state.title.split(' ')[0]} <span className="relative text-blue-600">
            {state.title.split(' ').slice(1).join(' ')}
            <svg className="absolute bottom-0 left-0 w-full h-3 -z-10" viewBox="0 0 300 12" fill="none">
              <path d="M2 10C50 4 150 4 298 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </span>
          <br />
          {state.subtitle}
        </h1>
        <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-600">
          {state.description}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="relative px-8 py-3 overflow-hidden font-medium text-white bg-blue-600 rounded-lg group">
            <span className="relative z-10">{state.buttonText}</span>
            <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-blue-700 group-hover:scale-x-100"></div>
          </button>
          <a href={state.videoLink} className="flex items-center text-gray-600 transition-colors group hover:text-gray-900">
            <span className="p-2 mr-2 transition-colors duration-300 bg-gray-100 rounded-full group-hover:bg-blue-100">
              <Play className="w-5 h-5 transition-transform duration-300 transform group-hover:scale-110" />
            </span>
            {state.videoText}
          </a>
        </div>
      </div>
      <div className="mt-20">
        <p className="mb-8 text-gray-600">{state.trustedBy}</p>
        <div className="grid items-center max-w-5xl grid-cols-2 gap-8 mx-auto md:grid-cols-3 lg:grid-cols-6">
          {state.companies.map((company) => (
            <div key={company.name} className="flex justify-center">
              <img
                src={company.src}
                alt={company.name}
                className="object-contain h-8 transition-opacity duration-300 opacity-60 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

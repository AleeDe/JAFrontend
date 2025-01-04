import { useState, useEffect } from 'react';

export default function Testimonials({ url }) {
  const [state, setState] = useState({
    heading: '',
    testimonials: []
  });

  useEffect(() => {
    // Fetch data from the API
    fetch(url+'/public/home/get-test')
      .then(response => response.json())
      .then(data => {
        setState(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-16 text-3xl font-bold text-center">{state.heading}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {state.testimonials.map((testimonial) => (
            <div 
              key={testimonial.author} 
              className="p-6 transition-all duration-300 transform bg-white shadow-sm group rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 transition-all duration-300 transform scale-110 bg-blue-600 rounded-full opacity-0 group-hover:scale-125 group-hover:opacity-10"></div>
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 mr-4 transition-transform duration-300 transform rounded-full group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="font-semibold transition-colors duration-300 group-hover:text-blue-600">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-gray-600 transition-colors duration-300 group-hover:text-gray-900">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [state, setState] = useState({
    heading: '',
    testimonials: []
  });

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8080/public/home/get-test')
      .then(response => response.json())
      .then(data => {
        setState(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">{state.heading}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {state.testimonials.map((testimonial) => (
            <div 
              key={testimonial.author} 
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full transform scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-16 w-16 rounded-full mr-4 transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-blue-600 transition-colors duration-300">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic group-hover:text-gray-900 transition-colors duration-300">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

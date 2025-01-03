import { useState, useEffect } from 'react';

export default function Contact() {
  const [state, setState] = useState({
    heading: 'Get in touch',
    subheading: "Have questions? We&apos;d love to hear from you."
  });

  // Placeholder for future useEffect to fetch data from APIs
  useEffect(() => {
    // Here you could fetch data from an API and update the state
    // Example:
    // fetch('/api/contact')
    //   .then(response => response.json())
    //   .then(data => {
    //     setState(data);
    //   });
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{state.heading}</h2>
          <p className="text-xl text-gray-600" dangerouslySetInnerHTML={{ __html: state.subheading }} />
        </div>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-300
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         hover:border-blue-500 hover:shadow-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-300
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         hover:border-blue-500 hover:shadow-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-300
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       hover:border-blue-500 hover:shadow-sm"
              placeholder="Your message"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="relative overflow-hidden bg-blue-600 text-white px-8 py-3 rounded-lg font-medium group"
            >
              <span className="relative z-10">Send message</span>
              <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

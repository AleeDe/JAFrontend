import { useState, useEffect } from 'react';
import { Calculator, Clock, Shield, Zap ,Loader} from 'lucide-react';

export default function Features({ url }) {
  const [state, setState] = useState({
    heading: '',
    subheading: '',
    features: []
  });

  useEffect(() => {
    // Fetch data from the API
    fetch(url+'/public/home/get-features')
      .then(response => response.json())
      .then(data => {
        // Map icons to the feature data
        const featuresWithIcons = data.features.map(feature => {
          let icon;
          switch (feature.icon) {
            case 'Calculator':
              icon = Calculator;
              break;
            case 'Clock':
              icon = Clock;
              break;
            case 'Shield':
              icon = Shield;
              break;
            case 'Zap':
              icon = Zap;
              break;
            default:
              icon = Loader;
          }
          return { ...feature, icon };
        });
        
        setState({
          heading: data.heading,
          subheading: data.subheading,
          features: featuresWithIcons
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="px-4 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">{state.heading}</h2>
          <p className="text-xl text-gray-600">{state.subheading}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {state.features.map((feature) => (
            <div
              key={feature.title}
              className="relative p-6 overflow-hidden transition-all duration-300 transform bg-white shadow-sm group rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-blue-600/5 group-hover:to-blue-600/5"></div>
              <feature.icon className="w-12 h-12 mb-4 text-blue-600 transition-transform duration-300 transform group-hover:scale-110" />
              <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-blue-600">{feature.title}</h3>
              <p className="relative z-10 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

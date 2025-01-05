import axios from 'axios';
import { useState, useEffect } from 'react';

export default function About({ url }) {
  const [state, setState] = useState({
    heading: '',
    paragraph: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + '/public/home/get-about');
        setState(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Split paragraph into sentences
  const sentences = state.paragraph.split('.').filter(sentence => sentence.trim() !== '').map(sentence => sentence.trim() + '.');

  return (
    <section className="px-4 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center mt-36">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">{state.heading}</h2>
              {sentences.map((sentence, index) => (
                <p key={index} className="mb-4 text-gray-600">{sentence}</p>
              ))}
            </div>
            <div className="relative">
              <img
                src={state.image}
                alt="About Us"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

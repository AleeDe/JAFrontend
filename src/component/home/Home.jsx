import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./aboutus/About";
import Contact from "./contactus/Contact";
import Features from "./features/Features";
import Hero from "./hero/Hero";
import Testimonials from "./testimonials/Testimonials";


export default function Home({ url }) {
  const [isLoading, setIsLoading] = useState(true)
  toast.success("WelCome to HomePage!");

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  
    return () => clearTimeout(timer);
  }, []);
  
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
    <main>
      <Hero url={url}/>
      <Features url={url}/>
      <Testimonials url={url}/>
      <About url={url}/>
      <Contact url={url}/>
    </main>
  )
}
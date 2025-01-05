import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LoginSignUpForm from './component/LoginSignUpForm/LoginSignUpForm';
import Progress from './component/progress/Progress';
import Home from './component/home/Home';
import Navbar from './component/Navbar/Navbar';
import Dashboard from './component/Dashboard/Dashboard';
import Sidebar from './component/Dashboard/component/Sidebar/Sidebar.jsx';
import JournalEntity from './component/Dashboard/JournalEntity/JournalEntity.jsx';
import Hero from './component/Dashboard/HomePage/Hero.jsx';
import User from './component/Dashboard/User/User.jsx';

import Aboutus from './component/Dashboard/HomePage/Aboutus.jsx';
import Features from './component/Dashboard/HomePage/Features.jsx';
import Testimonials from './component/Dashboard/HomePage/Testimonial.jsx';
import JournalEnitty from './component/JournalEntity/JournalEntity.jsx';
import About from './component/home/aboutus/About.jsx';
import Profile from './component/Navbar/Profile.jsx';
import Footer from './component/Footer/Footer.jsx';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('username'));
  const url = 'http://ec2-3-91-150-183.compute-1.amazonaws.com:8080';
  // const url='http://localhost:8080'

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<LoginSignUpForm url={url} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/journalhome" element={<JournalEnitty url={url} />} />
        <Route path="/abouthome" element={<About url={url} />} />
        {/* <Route path="/profile" element={<Profile url={url} />} />   */}
        <Route path="/dashboard/*" element={
          <div className="flex h-screen pt-16 bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <main className="flex-grow p-8 overflow-y-auto">
              <Dashboard activePage={activePage} />
            </main>
          </div>
        } />
        <Route path="/progress" element={<Progress url={url} />} /> 
        <Route path="/" element={<Home url={url} />} />
        <Route path="/profile" element={<Profile url={url} />} />
        <Route path="/journal" element={
          <div className="flex h-screen pt-16 bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-grow overflow-y-auto">
              <JournalEntity url={url} />
            </main>
          </div>
        } />
        <Route path="/hero" element={
          <div className="flex h-screen pt-16 bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-grow p-8 overflow-y-auto">
              <Hero url={url}/>
            </main>
          </div>
        } />
        <Route path="/about" element={
          <div className="flex h-screen pt-16 bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-grow p-8 overflow-y-auto">
              <Aboutus url={url}/>
            </main>
          </div>
        } />
        <Route path="/features" element={ 
          <div className="flex h-screen pt-16 bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-grow p-8 overflow-y-auto">
              <Features url={url}/>
            </main>
          </div>
        } />
        <Route path="/testimonials" element={
          <div className="flex h-screen pt-16 bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-grow p-8 overflow-y-auto">
              <Testimonials url={url}/>
            </main>
          </div>
        } />
        <Route path="/user" element={
          <div className="flex h-screen pt-16 bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-grow overflow-y-auto">
              <User url={url}/>
            </main>
          </div>
        } />
      </Routes>
      <Footer/>
      <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    />
    </Router>
  );
}

export default App;

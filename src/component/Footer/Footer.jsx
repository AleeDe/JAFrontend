import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="text-gray-300 bg-black">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Your Company</h3>
            <p className="text-gray-400">Empowering innovation through technology and creativity.</p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors duration-300 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-white">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xl font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center transition-colors duration-300 hover:text-white">
                    <ArrowRight size={16} className="mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-xl font-semibold text-white">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>info@yourcompany.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mt-1 mr-2" />
                <span>123 Tech Street, Silicon Valley, CA 94000</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-xl font-semibold text-white">Stay Updated</h4>
            <p className="mb-4 text-gray-400">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 mb-2 bg-gray-800 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-gray-600 sm:mb-0"
              />
              <button
                type="submit"
                className="px-4 py-2 transition-colors duration-300 bg-gray-700 rounded-b-lg hover:bg-gray-600 sm:rounded-r-lg sm:rounded-bl-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 text-center border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


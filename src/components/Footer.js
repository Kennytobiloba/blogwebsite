import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Contact Info Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-200">Contact Us</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-300 transition-colors">Email: info@tuwco.org</li>
              <li className="hover:text-blue-300 transition-colors">Phone: +123 456 7890</li>
              <li className="hover:text-blue-300 transition-colors">Address: 
              14 Ojike Street By Azikiwe Road Umuahia</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-blue-300 transition-colors">About Us</a></li>
              <li><a href="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media Links Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-200">Follow Us</h3>
            <div className="flex space-x-6 text-xl">
              <a href="https://facebook.com" className="hover:text-blue-500 transition-colors">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-pink-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-200">Newsletter</h3>
            <p className="mb-6 text-gray-300">Stay updated with our latest news and articles. Subscribe to our newsletter.</p>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 w-full rounded-md text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Section (Copyright Info) */}
        <div className="mt-12 text-center text-sm text-gray-200">
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

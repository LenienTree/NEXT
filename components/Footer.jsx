import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from 'lucide-react'; // Importing icons

const Footer = () => {
  return (
    <footer className="w-full bg-[#022F2E] text-white font-inter py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Section 1: Lenient Tree Info */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-bold text-green-400 mb-4">Lenient Tree</h3>
          <p className="text-gray-300 mb-2">Access to events are now easy</p>
          <p className="text-gray-300 mb-4">© 2025 The Lenient Tree</p>
          <p className="text-gray-300 mb-6">All rights reserved</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
              <Linkedin size={24} />
            </a>
            <a href="#" aria-label="Youtube" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
              <Youtube size={24} /> {/* Assuming Youtube icon for the 'Y' looking icon */}
            </a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-bold text-green-400 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Calendar</a></li>
            <li><a href="./about" className="text-gray-300 hover:text-green-400 transition-colors duration-200">About</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Subscriptions</a></li>
          </ul>
        </div>

        {/* Section 3: Essentials */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-bold text-green-400 mb-4">Essentials</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Terms & Conditions</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Blogs</a></li>
          </ul>
        </div>

        {/* Section 4: Partners */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-bold text-green-400 mb-4">Partners</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Paid Promotion</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Collaboration</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Organize an event</a></li>
          </ul>
        </div>
      </div>

      {/* Large "LENIENT" text at the bottom - moved further down */}
      {/* Adjusted height to h-20 (80px) for mobile and md:h-28 (112px) for desktop */}
      <div className=" w-full text-center overflow-y-hidden h-30 md:h-30 flex justify-center items-end">
        <p className="relative top-[8vh] text-7xl md:text-[30vh] font-extrabold text-black opacity-20 tracking-widest uppercase leading-none">
          Lenient
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { NavLink } from 'react-router-dom';

const PublicHeader = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'Book Now', path: '/book-now' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-secondary">
          Pearl Hall
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `text-lg hover:text-secondary transition-colors duration-300 ${isActive ? 'text-secondary font-semibold' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
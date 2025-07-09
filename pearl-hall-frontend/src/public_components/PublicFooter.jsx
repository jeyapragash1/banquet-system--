import React from 'react';
import { LuFacebook, LuInstagram, LuTwitter } from 'react-icons/lu';

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Pearl Hall</h3>
            <p className="max-w-xs">Creating unforgettable memories for your special events. Your perfect venue for weddings, receptions, and corporate gatherings.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
            <p>123 Event Lane, Celebration City, 12345</p>
            <p className="mt-2">Email: contact@pearlhall.com</p>
            <p className="mt-2">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary"><LuFacebook size={24} /></a>
              <a href="#" className="hover:text-secondary"><LuInstagram size={24} /></a>
              <a href="#" className="hover:text-secondary"><LuTwitter size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Pearl Hall Management. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
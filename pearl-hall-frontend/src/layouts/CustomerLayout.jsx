import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../public_components/PublicHeader';
import PublicFooter from '../public_components/PublicFooter';

const CustomerLayout = () => {
  return (
    <div className="bg-white text-gray-800">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default CustomerLayout;
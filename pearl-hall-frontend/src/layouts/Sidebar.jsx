import React from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard, LuUsers, LuClipboardList, LuWarehouse, LuWrench, LuPackage, LuBedDouble, LuUserCog, LuSettings } from 'react-icons/lu';

const Sidebar = () => {
    // UPDATED with /admin prefix
  const navLinks = [
    { icon: LuLayoutDashboard, name: 'Dashboard', path: '/admin/dashboard' },
    { icon: LuUsers, name: 'Customer Management', path: '/admin/customers' },
    { icon: LuClipboardList, name: 'Event Inquiries', path: '/admin/inquiries' },
    { icon: LuWarehouse, name: 'Inventory', path: '/admin/inventory' },
    { icon: LuPackage, name: 'Package Builder', path: '/admin/packages' },
    { icon: LuBedDouble, name: 'Room Management', path: '/admin/rooms' },
    { icon: LuWrench, name: 'Utilities & Expenses', path: '/admin/expenses' },
    { icon: LuUserCog, name: 'Staff Management', path: '/admin/staff' },
    { icon: LuSettings, name: 'Finance & Tax', path: '/admin/finance' },
  ];

  return (
    <div className="w-64 bg-gray-800 h-screen flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Pearl Hall</h1>
      </div>
      <nav className="flex-grow px-4 py-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end // Add 'end' prop to prevent matching parent routes
            className={({ isActive }) =>
              `flex items-center py-3 px-4 my-1 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-secondary text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
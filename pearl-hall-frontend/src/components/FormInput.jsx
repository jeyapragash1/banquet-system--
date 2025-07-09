import React from 'react';

const FormInput = ({ label, name, value, onChange, placeholder, icon, type = 'text', required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="pl-10 block w-full py-2 px-3 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;
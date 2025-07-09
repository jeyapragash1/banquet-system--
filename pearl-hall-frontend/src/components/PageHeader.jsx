import React from 'react';
import { LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title, buttonText, buttonLink }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonLink) {
      navigate(buttonLink);
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {buttonText && buttonLink && (
        <button
          onClick={handleButtonClick}
          className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-opacity-90 transition-all"
        >
          <LuPlus />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
import React from 'react';

interface PHBLogoProps {
  className?: string;
}

const PHBLogo: React.FC<PHBLogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C85C41"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
      </svg>
      <span className="text-[#333333] text-2xl font-bold">PHB</span>
    </div>
  );
};

export default PHBLogo;

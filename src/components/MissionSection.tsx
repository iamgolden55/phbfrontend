import React from 'react';
import { Link } from 'react-router-dom';

const MissionSection: React.FC = () => {
  return (
    <section className="bg-[#f5f0e7] py-10 md:py-16 relative rounded-none md:mx-4 md:mt-6 md:mb-8 md:rounded-3xl">
      <div className="phb-container max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-3/5 lg:w-2/3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E2C35] leading-tight mb-6 md:mb-0">
              Our mission is to provide individuals with valuable insights into their health
            </h2>
          </div>

          <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
            {/* Circular element */}
            <Link to="/about" className="group">
              <div className="relative w-24 h-24 md:w-28 md:h-28 cursor-pointer">
                <div className="absolute inset-0 rounded-full flex items-center justify-center border-2 border-[#C85C41] group-hover:border-[#964731] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C85C41"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto mb-1 group-hover:stroke-[#964731] transition-colors"
                  >
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
                  </svg>
                </div>

                {/* Circular rotating text */}
                <div className="absolute inset-0 w-full h-full animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="curve"
                      d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0"
                      fill="transparent"
                    />
                    <text width="100%">
                      <textPath href="#curve" className="text-[#0E2C35] text-xs font-medium">
                        About PHB • About PHB • About PHB •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

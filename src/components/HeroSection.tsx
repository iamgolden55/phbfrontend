import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#0E2C35] text-white relative overflow-hidden rounded-3xl mx-4 my-4">
      <div className="phb-container py-10 md:py-16">
        <div className="flex flex-col">
          {/* Main content */}
          <div className="w-full relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Public Health Bureau
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8">
              Find information and services to help you manage your health
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              <button className="bg-[#F9B949] hover:bg-[#e8a938] text-[#0E2C35] font-medium px-8 py-3 rounded-md transition-colors">
                Start Test
              </button>

              <div className="flex items-center gap-8 mt-4 sm:mt-0">
                <div className="text-center">
                  <div className="text-3xl font-bold">236+</div>
                  <div className="text-sm text-gray-300">Tests taken today</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-gray-300">Results rated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom authentication section */}
      <div className="bg-[#3F614E] py-4 rounded-b-3xl">
        <div className="phb-container">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="inline-block">
              <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white/10 transition-colors font-medium">
                Login
              </button>
            </Link>
            <Link to="/register" className="inline-block">
              <button className="bg-white text-[#3F614E] px-6 py-2 rounded-full hover:bg-gray-100 transition-colors font-medium">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

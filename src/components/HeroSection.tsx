import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#0E2C35] text-white relative overflow-hidden rounded-3xl mx-4 my-4">
      <div className="phb-container py-10 md:py-16">
        <div className="flex flex-col md:flex-row">
          {/* Left content */}
          <div className="w-full md:w-1/2 relative z-10 mb-10 md:mb-0">
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

          {/* Right content - illustration */}
          <div className="w-full md:w-1/2 relative h-80 md:h-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Large orange curved line/shape */}
              <div className="absolute w-full h-full">
                <svg
                  viewBox="0 0 600 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Background elements */}
                  <circle cx="450" cy="100" r="8" fill="white" fillOpacity="0.7" />
                  <circle cx="520" cy="180" r="6" fill="white" fillOpacity="0.7" />
                  <circle cx="500" cy="400" r="10" fill="#F9B949" fillOpacity="0.9" />
                  <circle cx="380" cy="450" r="8" fill="#C85C41" fillOpacity="0.7" />
                  <circle cx="300" cy="100" r="12" fill="#4A7E64" fillOpacity="0.7" />

                  {/* Orange curved line */}
                  <path
                    d="M250 50 Q 400 100 450 200 Q 500 300 400 400 Q 350 450 250 450"
                    stroke="#F9B949"
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Character 1 - Yellow Shirt Person */}
                  <g transform="translate(300, 200)">
                    {/* Head */}
                    <circle cx="0" cy="-40" r="25" fill="#F2D6BD" />
                    {/* Hair */}
                    <path d="M-20 -60 Q -10 -75 0 -70 Q 10 -75 20 -60 Q 25 -50 20 -35 L -20 -35 Q -25 -50 -20 -60" fill="#D26B4C" />
                    {/* Yellow shirt */}
                    <rect x="-30" y="-25" width="60" height="70" rx="10" fill="#F9B949" />
                    {/* White collar */}
                    <path d="M-20 -25 L 0 -15 L 20 -25 L 15 -5 L -15 -5 L -20 -25" fill="white" />
                    {/* Arm */}
                    <path d="M-40 0 Q -50 15 -45 40" stroke="#F2D6BD" strokeWidth="15" strokeLinecap="round" />
                    {/* Pants */}
                    <rect x="-30" y="45" width="60" height="60" rx="5" fill="#0E2C35" />
                    {/* Shoes */}
                    <ellipse cx="-15" cy="105" rx="15" ry="10" fill="white" />
                  </g>

                  {/* Character 2 - Green Jacket Person */}
                  <g transform="translate(450, 150)">
                    {/* Head */}
                    <circle cx="0" cy="-50" r="22" fill="#F2D6BD" />
                    {/* Hat */}
                    <path d="M-25 -55 L 25 -55 L 18 -40 L -18 -40 L -25 -55" fill="#F9B949" />
                    {/* Green Jacket */}
                    <rect x="-35" y="-35" width="70" height="80" rx="15" fill="#4A7E64" />
                    {/* Straps */}
                    <rect x="-25" y="-35" width="10" height="80" rx="5" fill="#E8E0D0" />
                    <rect x="15" y="-35" width="10" height="80" rx="5" fill="#E8E0D0" />
                    {/* Pants */}
                    <rect x="-30" y="45" width="60" height="40" rx="5" fill="#C85C41" />
                    {/* Shoes */}
                    <ellipse cx="-15" cy="85" rx="15" ry="10" fill="white" />
                  </g>

                  {/* Character 3 - White Top Person */}
                  <g transform="translate(350, 300)">
                    {/* Head */}
                    <circle cx="0" cy="-40" r="23" fill="#F2D6BD" />
                    {/* Hair */}
                    <path d="M-20 -60 Q -15 -75 0 -70 Q 15 -75 20 -60 Q 25 -45 20 -25 L -20 -25 Q -25 -45 -20 -60" fill="#D26B4C" />
                    {/* White Top */}
                    <rect x="-30" y="-25" width="60" height="55" rx="10" fill="white" />
                    {/* Pants */}
                    <rect x="-30" y="30" width="60" height="50" rx="5" fill="#0E2C35" />
                    {/* Shoes */}
                    <ellipse cx="20" cy="80" rx="15" ry="10" fill="white" transform="rotate(15)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tags section */}
      <div className="bg-[#3F614E] py-4 rounded-b-3xl">
        <div className="phb-container">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              Health information
            </button>
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              Medical advice
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

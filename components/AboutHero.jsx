import React from 'react';
import GradientTextAnimation from "../components/GradientTextAnimation.jsx";

const AboutHero = () => {
  return (
    <>
      <div
        className="overflow-hidden min-h-screen w-full text-white font-inter bg-cover bg-center relative px-4 py-8 md:p-4"
        style={{
          backgroundImage: `url('./BG.png')`,
        }}
      >
        <p className='text-green-500 flex flex-col items-center text-lg sm:text-xl justify-center mt-8 sm:mt-12 md:mt-20 pt-4 sm:pt-6 md:pt-10'>
          About Us
        </p>
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16">  
          <div className='flex flex-col sm:flex-row items-center sm:items-start justify-center text-center sm:text-left mb-4 sm:mb-6 md:mb-8'>
            <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold font-Urbanist mb-2 sm:mb-0'>
              Professional
            </p>
            <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:pl-3 sm:pt-0 md:pt-3 font-Urbanist text-[#A1A1A1]'>
              event linking
            </p>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-center text-center sm:text-left mb-8 sm:mb-12 md:mb-16'>
            <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#d2cece] mb-2 sm:mb-0 sm:mr-2 md:mr-4'>
              via
            </p>
            <div className="text-7xl sm:text-xl md:text-5xl lg:text-6xl xl:text-7xl">
              <GradientTextAnimation text="Lenient Tree" />
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#ffffff] font-semibold font-Urbanist leading-relaxed">
              Discover events, track peers, solve awareness gap
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutHero;
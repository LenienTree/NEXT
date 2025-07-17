"use client"
import React from 'react';

const TeamSection = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter flex flex-col items-center justify-center mt-4  p-4  md:p-8 lg:p-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-start text-left">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 md:mb-8">
          Lenient Tree and our team
        </h1>

        {/* Description Paragraph */}
        <p className="text-base md:text-lg lg:text-lg text-gray-300 leading-relaxed mb-8 md:mb-12">
          Lenient Tree is your go-to platform for career growth—offering hands-on workshops, portfolio help, hackathon prep, startup support, and KTU guidance. We connect students and professionals to real-world skills and innovation, making the leap from classroom to career smoother, smarter, and more exciting. Learn, build, and grow with us!
        </p>

        {/* Team Image */}
        <div className="w-full h-[70vh] flex justify-center">
          <img
            src="https://placehold.co/1000x600/262626/d1d5db?text=Team+Image" // Placeholder image URL
            alt="Lenient Tree Team"
            className="w-full h-auto max-w-full rounded-lg shadow-xl object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1000x600/4b5563/d1d5db?text=Image+Error"; }}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
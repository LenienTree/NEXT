"use client"
import React from 'react';

const OurStory= () => {
  const sections = [
    {
      id: 'aim',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      ),
      title: 'Our Aim',
      description: 'At Lenient Tree, our aim is simple: to empower individuals students, fresh graduates, and working professionals alike to take control of their career journeys by offering meaningful, practical, and innovation-driven learning experiences. We understand that today\'s world demands more than just a degree. It calls for real-world skills, a creative mindset, and the confidence to take initiative. That\'s why we\'ve built a platform that bridges the often-wide gap between education and industry expectations.',
      image: 'https://placehold.co/400x250/262626/d1d5db?text=Our+Aim+Image', // Placeholder image
    },
    {
      id: 'story',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h6z"/><path d="M10 12H8"/><path d="M16 12h2"/><path d="M16 18h2"/><path d="M10 18H8"/></svg>
      ),
      title: 'Our Story',
      description: 'At Lenient Tree, our aim is simple: to empower individuals students, fresh graduates, and working professionals alike to take control of their career journeys by offering meaningful, practical, and innovation-driven learning experiences. We understand that today\'s world demands more than just a degree. It calls for real-world skills, a creative mindset, and the confidence to take initiative. That\'s why we\'ve built a platform that bridges the often-wide gap between education and industry expectations.',
      image: 'https://placehold.co/400x250/262626/d1d5db?text=Our+Story+Image', // Placeholder image
    },
    {
      id: 'achievements',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/></svg>
      ),
      title: 'Achievements',
      description: 'At Lenient Tree, our aim is simple: to empower individuals students, fresh graduates, and working professionals alike to take control of their career journeys by offering meaningful, practical, and innovation-driven learning experiences. We understand that today\'s world demands more than just a degree. It calls for real-world skills, a creative mindset, and the confidence to take initiative. That\'s why we\'ve built a platform that bridges the often-wide gap between education and industry expectations.',
      image: 'https://placehold.co/400x250/262626/d1d5db?text=Achievements+Image', // Placeholder image
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Overall Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12">
          OUR STORY
        </h1>

        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex flex-col md:flex-row items-center md:items-start mb-16 md:mb-24 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : '' // Reverse order for alternate sections on desktop
            }`}
          >
            {/* Text Content */}
            <div className="w-full md:w-1/2 p-4">
              <div className="flex items-center text-green-400 mb-4">
                {section.icon}
                <h2 className="text-2xl md:text-3xl font-bold ml-2">{section.title}</h2>
              </div>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 p-4 flex justify-center">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-auto max-w-md md:max-w-full rounded-lg shadow-xl object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/4b5563/d1d5db?text=Image+Error"; }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStory;

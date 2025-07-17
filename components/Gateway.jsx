import React, { useState, useEffect } from 'react';

const changingTexts = ['Techfests', 'Ideathons', 'Hackathons', 'Webinars', 'Conclaves'];

const Gateway = () => {
 const [currentBgImage, setCurrentBgImage] = useState(''); 
 const changingTexts = ['Techfests', 'Ideathons', 'Hackathons', 'Webinars', 'Conclaves'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const mobileBgImageUrl = './Containerv2.png';
  const desktopBgImageUrl = './Container.png';


  useEffect(() => {
    // Set up an interval to change the text every 3 seconds
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % changingTexts.length);
    }, 3000);

    // Function to determine and set the background image based on window width
    const updateBackgroundImage = () => {
      if (typeof window !== 'undefined') { // Ensure window is defined
        if (window.innerWidth < 768) { // Mobile breakpoint (Tailwind's 'md' is 768px)
          setCurrentBgImage(mobileBgImageUrl);
        } else {
          setCurrentBgImage(desktopBgImageUrl);
        }
      }
    };

    // Initial call to set the background image
    updateBackgroundImage();

    // Add event listener for window resize
    window.addEventListener('resize', updateBackgroundImage);

    // Clean up interval and event listener on component unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateBackgroundImage);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-inter relative overflow-hidden bg-fit bg-center"
      style={{
        backgroundImage: `url('${currentBgImage}')`,
        repeat:'no-repeat'
      
      }}
    >

      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-500 rounded-lg transform rotate-12 -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-purple-500 rounded-lg transform -rotate-12 translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-yellow-500 rounded-lg transform -rotate-6 -translate-x-1/2 translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500 rounded-lg transform rotate-6 translate-x-1/2 translate-y-1/2 opacity-70"></div>

      <div className="relative z-10 text-center p-8 rounded-lg"> 
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Gateway to</h1>
        <div className="relative h-20 md:h-24  flex items-center justify-center">
        
          <h2
            key={currentTextIndex} 
            className="absolute text-5xl md:text-7xl font-bold text-white
                       animate-slide-up-fade-in"
          >
            {changingTexts[currentTextIndex]}
          </h2>
        </div>
        <p className="text-xl md:text-2xl mb-8">& much more...</p>

        <button className="bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-20 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
          EXPLORE
        </button>

      </div>

      <style>
        {`
        @keyframes slide-up-fade-in {
          0% {
            transform: translateY(100%); /* Start from 100% below its normal position */
            opacity: 0; /* Start invisible */
          }
          100% {
            transform: translateY(0); /* End at its normal position */
            opacity: 1; /* End fully visible */
          }
        }
        .animate-slide-up-fade-in {
          animation: slide-up-fade-in 0.7s ease-out forwards; /* Apply the animation */
        }
        `}
      </style>
    </div>
  );
};

export default Gateway;

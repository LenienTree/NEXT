import React from 'react'

const Organize = () => {
  return (
   <div
        className="overflow-hidden min-h-screen w-full text-white font-inter bg-cover bg-center relative px-4 py-8 md:p-4"
        style={{
          backgroundImage: `url('./whitebg.png')`,
        }}
      >
       <div className="flex flex-col items-center justify-center max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16">
        <h1 className='font-Urbanist text-black text-center text-5xl md:text-6xl font-bold m-10 ' > Organise an Event</h1>
        <p className='w-[70vw] font-Urbanist text-black text-justify text-xl md:text-3xl font-bold m-10 '> 
Organize an event and publish it for maximum views. The more views the better the outcome will be. We will help you reach your destined audience and do nothing to get more views than any other websites.
        </p>
        <button className=" text-center bg-lime-500 hover:bg-lime-600 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-300 z-10">
          ORGANIZE AN EVENT
        </button>
        </div>
        
        </div>
  )
}

export default Organize
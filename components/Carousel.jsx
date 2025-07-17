import { useState, useEffect, useRef } from "react";

const images = [
  "./LenientTree/Hero0.png",
  "./LenientTree/Hero1.png",
  "./LenientTree/Hero2.png",
  "./LenientTree/Hero3.png",
  "./LenientTree/Hero4.png",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const length = images.length;
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(nextSlide, 3000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, paused, nextSlide]); // Added nextSlide to dependencies for useCallback safety

  return (
    <div className="relative w-[80vw] align-center h-[100vh] mx-5 md:mx-auto mt-10 group">
      <div
        className="overflow-hidden rounded-2xl shadow-lg relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          key={current} // key triggers re-render for animation
          className="w-full h-[80vh] bg-black flex items-center justify-center transition-opacity duration-700 ease-in-out animate-fade-in"
        >
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            // Changed object-full to object-cover and added w-full h-full
            className="w-full h-full object-contain transition-transform duration-700 ease-in-out scale-100 group-hover:scale-110 "
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600/4b5563/d1d5db?text=Image+Error"; }} // Added error fallback
          />
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white shadow hidden group-hover:block"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white shadow hidden group-hover:block"
        >
          ❯
        </button>
      </div>
      {/* Controls */}

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
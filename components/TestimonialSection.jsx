import React from 'react'; // Removed useState as it's no longer needed for summary features

// Data for the main quote
const mainQuote = {
  text: "Lenient Tree is bringing events from all over the world at your fingertips, all you have to do is join and show your skills. We value student's satisfaction and joy more than anything.",
  author: "AUGUSTINE VADAKUMCHERRY",
  image: "https://placehold.co/150x150/065f46/ffffff?text=AV", // Placeholder image for Augustine
};

// Data for the smaller testimonials
const testimonials = [ // Reverted to original name
  {
    id: 1,
    quote: "Hi, I am happy with Lenient Tree and hope to work with them more often.",
    author: "MARK ZHONG",
    company: "ACCUTARY",
    avatar: "https://placehold.co/50x50/047857/ffffff?text=MZ", // Placeholder avatar
  },
  {
    id: 2,
    quote: "Lenient Tree is growing everyday, and I want to be part of it. Investment such as this is always a great option in my opinion.",
    author: "HENRY DOCKSON",
    company: "Blixcy",
    avatar: "https://placehold.co/50x50/059669/ffffff?text=HD", // Placeholder avatar
  },
  {
    id: 3,
    quote: "Creativity is not limited for Lenient Tree, they help us get the best results. It's their ART.",
    author: "ARNAV GHANI",
    company: "Artistry H&C",
    avatar: "https://placehold.co/50x50/065f46/ffffff?text=AG", // Placeholder avatar
  },
];

const TestimonialSection = () => {
  // Removed useState for testimonials and loadingStates

  return (
    <div
      className="min-h-screen text-white p-8 font-inter flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/generative-ai-sandbox-web.appspot.com/o/image_b7e99d.jpg?alt=media&token=3a540d86-666d-4495-8c1d-d524487c5fd4')` }}
    >
      {/* Main Quote Section */}
      <div className="w-full max-w-6xl bg-gradient-to-br from-green-700 to-green-900 rounded-lg shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="md:w-2/3 text-left mb-6 md:mb-0 md:pr-8">
          <p className="text-5xl font-serif text-green-200 mb-4">“</p>
          <p className="text-xl md:text-3xl leading-relaxed mb-6">
            {mainQuote.text}
          </p>
          <p className="text-lg font-semibold text-green-200 uppercase tracking-wider">
            {mainQuote.author}
          </p>
        </div>
        <div className="md:w-60 md:h-60 rounded-xl hover:w-70 hover:h-80 hover:bg-green-400 duration-700  flex justify-center md:justify-end bg-green-900">
          <img
            src={mainQuote.image}
            alt={mainQuote.author}
            className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover shadow-lg"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/4b5563/d1d5db?text=Image+Error"; }}
          />
        </div>
      </div>

      {/* Smaller Testimonial Cards Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-start">
            <div className="flex items-center w-full mt-auto">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full object-cover mr-4 shadow-md"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/4b5563/d1d5db?text=Error"; }}
              />
             
            </div>
            <p className="text-4xl font-serif text-gray-400 mb-4">“</p>
            <p className="text-base leading-relaxed mb-6 flex-grow">
              {/* Display original quote directly */}
              {testimonial.quote}
            </p>
            
            {/* Removed summary buttons and logic */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;

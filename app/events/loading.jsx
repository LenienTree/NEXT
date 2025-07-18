// app/events/loading.jsx
export default function Loading() {
    return (
      <div className="min-h-screen bg-[#0a192f]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 bg-gray-800 rounded w-1/4 animate-pulse"></div>
            <div className="h-10 bg-gray-800 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg h-80 animate-pulse">
                <div className="h-48 bg-gray-800"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-800 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
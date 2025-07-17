"use client"

import { ExternalLink } from "lucide-react"

export default function EventCard({ event }) {
  // Image mapping function
  const getEventImage = (eventId, brand) => {
    const imageMap = {
      1: "/images/bnb-hack-kerala.jpg",     // BNB HACK KERALA
      2: "/images/ethereum-summit.jpg",     // ETHEREUM SUMMIT
      3: "/images/solana-builders.jpg",     // SOLANA BUILDERS
      4: "/images/polygon-devcon.jpg",      // POLYGON DEVCON
    }

    // Alternative: Map by brand name
    const brandImageMap = {
      "BNB CHAIN": "/images/bnb-event.jpg",
      "ETHEREUM": "/images/ethereum-event.jpg",
      "SOLANA": "/images/solana-event.jpg",
      "POLYGON": "/images/polygon-event.jpg",
    }

    // Return mapped image or fallback
    return imageMap[eventId] || brandImageMap[brand] || "/images/default-event.jpg"
  }

  // QR Code mapping function
  const getQRCode = (eventId, brand) => {
    const qrMap = {
      1: "/images/qr-codes/bnb-qr.png",
      2: "/images/qr-codes/ethereum-qr.png", 
      3: "/images/qr-codes/solana-qr.png",
      4: "/images/qr-codes/polygon-qr.png",
    }

    return qrMap[eventId] || "/images/qr-codes/default-qr.png"
  }

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>

      <div className="relative p-6 md:p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
         

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Main Event Image */}
              <div className="w-64 h-64 md:w-80 md:h-80 relative overflow-hidden rounded-2xl">
                <img
                  src={getEventImage(event.id, event.brand)}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=400&width=400"
                  }}
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating Brand Logo */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                  <span className="text-black font-bold text-sm">{event.brand}</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-purple-500/20 blur-xl scale-105 opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
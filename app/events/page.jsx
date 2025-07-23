// app/events/page.jsx
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Header from '../../components/Header'
import Link from 'next/link'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/events/my-events/`

export default function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch(API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }

        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
        toast.error(error.message || 'Failed to load events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [router])

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f]">
        <Header pagename="Events" />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse h-80" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-300 pt-16"> {/* Added pt-6 for 1.5cm top padding */}
    <Header pagename="Events" />
    <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Organising Events</h1>
          <Link 
            href="/events/create"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
          >
            Create Event
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event._id} 
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative h-48">
                <img 
                  src={event.eventimage || 'https://via.placeholder.com/400x200?text=No+Image'} 
                  alt={event.eventname}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-sm">
                  {event.paymentMode === 'paid' ? `₹${event.singlePrice}` : 'FREE'}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{event.eventname}</h3>
                  <p className="text-sm text-gray-300">{formatDate(event.eventDate)}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-400">{event.type}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.status === 'approved' 
                    ? 'bg-green-900 text-green-300' 
                    : event.status === 'pending'
                    ? 'bg-yellow-900 text-yellow-300'
                    : 'bg-red-900 text-red-300'
                        } capitalize`}>
                        {event.status}
            </span>    
            <span className="text-sm text-gray-400">{event.eventMode}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No events available</p>
            <Link 
              href="/events/create"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
            >
              Create Your First Event
            </Link>
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div 
              className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedEvent.eventimage || 'https://via.placeholder.com/1200x630?text=No+Image'} 
                  alt={selectedEvent.eventname}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedEvent.eventname}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <span>{formatDate(selectedEvent.eventDate)}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedEvent.paymentMode === 'paid' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-blue-900 text-blue-300'
                      }`}>
                        {selectedEvent.paymentMode === 'paid' 
                          ? `₹${selectedEvent.singlePrice}` 
                          : 'FREE'}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{selectedEvent.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {selectedEvent.eventMode === 'online' ? '🌐 Online' : '📍 In-Person'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                    <p className="text-gray-300 mb-4">{selectedEvent.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-400 w-24">Location:</span>
                        <span>{selectedEvent.location || 'Not specified'}</span>
                      </div>
                      {selectedEvent.community && (
                        <div className="flex items-start">
                          <span className="text-gray-400 w-24">Community:</span>
                          <span>{selectedEvent.community}</span>
                        </div>
                      )}
                      {selectedEvent.college && (
                        <div className="flex items-start">
                          <span className="text-gray-400 w-24">College:</span>
                          <span>{selectedEvent.college}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEvent.sponsors && selectedEvent.sponsors.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Sponsors</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.sponsors.map((sponsor, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                          >
                            {sponsor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-800 pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
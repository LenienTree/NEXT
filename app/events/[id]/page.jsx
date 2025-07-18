// app/events/[id]/page.jsx
"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Header from '../../../components/Header'
import Link from 'next/link'

export default function EventDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/get/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch event')
        }
        const data = await response.json()
        setEvent(data)
      } catch (error) {
        console.error('Error fetching event:', error)
        toast.error(error.message || 'Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

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

  const handleCheckIn = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token
        },
        credentials: 'include' // Important for sending cookies if using httpOnly cookies
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Check-in failed');
      }
  
      toast.success(data.message || 'Successfully checked in! Redirecting...');
      
      // Redirect to the event's website after a short delay
      setTimeout(() => {
        if (event?.website) {
          // Ensure the URL has http:// or https://
          let websiteUrl = event.website;
          if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
            websiteUrl = 'https://' + websiteUrl;
          }
          window.open(websiteUrl, '_blank');
        }
      }, 1000);
      
      return data;
    } catch (error) {
      console.error('Error during check-in:', error);
      toast.error(error.message || 'Failed to check in');
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-800 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-300 pt-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/landing" 
            className="inline-flex items-center text-blue-400 hover:underline mb-6"
          >
            ← Back to Events
          </Link>
          
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="relative h-64 md:h-96">
              <img
                src={event.eventimage || 'https://via.placeholder.com/1200x630?text=No+Image'}
                alt={event.eventname}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm bg-green-900 text-green-300 px-3 py-1 rounded-full">
                    {event.paymentMode}
                  </span>
                  <span className="text-sm bg-blue-900 text-blue-300 px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <span className="text-sm bg-purple-900 text-purple-300 px-3 py-1 rounded-full">
                    {event.eventMode}
                  </span>
                  {event.paymentMode === 'paid' && (
                    <span className="text-sm bg-green-900 text-green-300 px-3 py-1 rounded-full">
                      ₹{event.singlePrice}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{event.eventname}</h1>
                <p className="text-gray-300 mt-2">
                  {formatDate(event.eventDate)}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-4">About the Event</h2>
                  <p className="text-gray-300 whitespace-pre-line">{event.description}</p>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3">Event Details</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="text-gray-400 w-32">Date & Time:</span>
                        <span>{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-32">Location:</span>
                        <span>{event.location || 'Online'}</span>
                      </div>
                      {event.community && (
                        <div className="flex">
                          <span className="text-gray-400 w-32">Community:</span>
                          <span>{event.community}</span>
                        </div>
                      )}
                      {event.college && (
                        <div className="flex">
                          <span className="text-gray-400 w-32">College:</span>
                          <span>{event.college}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
                    <h3 className="text-xl font-bold mb-4">Register Now</h3>
                    <p className="text-gray-300 mb-6">
                      {event.paymentMode === 'paid' 
                        ? `Secure your spot for just ₹${event.singlePrice}`
                        : 'Join us for free!'}
                    </p>
                    
                    {event.website ? (
                      <button
                        onClick={handleCheckIn}
                        className="w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Register Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full px-6 py-3 bg-gray-600 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                      >
                        Registration Closed
                      </button>
                    )}

                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Share this event</h4>
                      <div className="flex space-x-3">
                        {/* Add social sharing buttons here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {event.sponsors && event.sponsors.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-800">
                  <h3 className="text-xl font-bold mb-4">Event Sponsors</h3>
                  <div className="flex flex-wrap gap-4">
                    {event.sponsors.map((sponsor, index) => (
                      <div 
                        key={index}
                        className="bg-gray-800 px-4 py-2 rounded-lg"
                      >
                        {sponsor}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
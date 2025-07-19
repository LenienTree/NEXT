"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Header from '../../../components/Header'

const API_URL = 'http://localhost:5000/api/events/create/'

export default function CreateEvent() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [formData, setFormData] = useState({
    eventname: '',
    paymentMode: 'free',
    singlePrice: 0,
    eventMode: 'online',
    description: '',
    eventDate: '',
    college: '',
    location: 'Virtual',
    type: 'hackathon',
    community: '',
    sponsors: []
  })
  const [sponsorInput, setSponsorInput] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'singlePrice' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSponsorAdd = () => {
    if (sponsorInput.trim() && !formData.sponsors.includes(sponsorInput.trim())) {
      setFormData(prev => ({
        ...prev,
        sponsors: [...prev.sponsors, sponsorInput.trim()]
      }))
      setSponsorInput('')
    }
  }

  const removeSponsor = (sponsorToRemove) => {
    setFormData(prev => ({
      ...prev,
      sponsors: prev.sponsors.filter(s => s !== sponsorToRemove)
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    if (!imageFile) {
      toast.error('Please select an event image')
      setIsSubmitting(false)
      return
    }
  
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Please log in to create an event')
      }
  
      // Create FormData and append all fields
      const formDataToSend = new FormData()
      
      // Append the image file with the correct field name
      formDataToSend.append('eventimage', imageFile) // Make sure this matches your backend
      
      // Append all other form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'eventimage') { // Skip if it's the image field
          if (key === 'sponsors') {
            // Stringify the array for FormData
            formDataToSend.append(key, JSON.stringify(formData[key]))
          } else {
            formDataToSend.append(key, formData[key])
          }
        }
      })
  
      // Add user ID from local storage
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user._id) {
        formDataToSend.append('userId', user._id)
      }
  
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type header - let the browser set it with the correct boundary
        },
        body: formDataToSend
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create event')
      }
  
      toast.success('Event created successfully!')
      router.push('/events')
    } catch (error) {
      console.error('Error creating event:', error)
      // Check if the error is due to JSON parsing
      if (error instanceof SyntaxError) {
        toast.error('Invalid response from server. Please try again.')
      } else {
        toast.error(error.message || 'Failed to create event')
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-300">
      <Header pagename="Create Event" />
      <main className="pt-20 px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Organize Your Event</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Event Name *</label>
                  <input
                    type="text"
                    name="eventname"
                    required
                    value={formData.eventname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Event Type *</label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Workshop</option>
                    <option value="competition">Competition</option>
                    <option value="techfest">Techfest</option>
                    <option value="ideathon">Ideathon</option>
                    <option value="webinar">Webinar</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {/* Event Image Upload */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium">Event Image *</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="file"
                        id="eventImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                      <label
                        htmlFor="eventImage"
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        Choose Image
                      </label>
                      {imageFile && (
                        <span className="ml-2 text-sm text-gray-400">
                          {imageFile.name}
                        </span>
                      )}
                    </div>
                    {previewUrl && (
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-700">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Recommended size: 1200x630px (2:1 aspect ratio)
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium">Description *</label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Event Mode */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Event Mode *</label>
                  <select
                    name="eventMode"
                    required
                    value={formData.eventMode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
  <label className="block text-sm font-medium">
    {formData.eventMode === 'online' ? 'Meeting Link' : 'Venue'}
  </label>
  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder={formData.eventMode === 'online' ? 'https://meet.google.com/... (optional)' : 'Venue address... (optional)'}
    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</div>

                {/* Event Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Payment Mode */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Payment Mode *</label>
                  <select
                    name="paymentMode"
                    required
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                {/* Single Price (conditional) */}
                {formData.paymentMode === 'paid' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Price (INR) *</label>
                    <input
                      type="number"
                      name="singlePrice"
                      min="0"
                      step="0.01"
                      required={formData.paymentMode === 'paid'}
                      value={formData.singlePrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* College */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">College/Organization</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                  {/* website */}
                  <div className="space-y-2">
                  <label className="block text-sm font-medium">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Community */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Community</label>
                  <input
                    type="text"
                    name="community"
                    value={formData.community}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Sponsors */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium">Sponsors</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={sponsorInput}
                      onChange={(e) => setSponsorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSponsorAdd())}
                      placeholder="Add sponsor and press Enter"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleSponsorAdd}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.sponsors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.sponsors.map((sponsor) => (
                        <span
                          key={sponsor}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full text-sm"
                        >
                          {sponsor}
                          <button
                            type="button"
                            onClick={() => removeSponsor(sponsor)}
                            className="text-gray-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-white ${
                    isSubmitting
                      ? 'bg-blue-600 opacity-70 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
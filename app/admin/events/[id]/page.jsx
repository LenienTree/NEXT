'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { PencilIcon, TrashIcon, CalendarIcon, MapPinIcon, ClockIcon, UserGroupIcon, TagIcon } from '@heroicons/react/24/outline';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendees, setAttendees] = useState([]);
  const [attendeesLoading, setAttendeesLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${API_URL}/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error(error.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    const fetchAttendees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/events/${id}/attendees`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attendees');
        }

        const data = await response.json();
        setAttendees(data);
      } catch (error) {
        console.error('Error fetching attendees:', error);
        toast.error('Failed to load attendees');
      } finally {
        setAttendeesLoading(false);
      }
    };

    fetchEvent();
    fetchAttendees();
  }, [id, router]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      toast.success('Event deleted successfully');
      router.push('/admin/events');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.message || 'Failed to delete event');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-lg font-medium text-gray-900">Event not found</h3>
        <p className="mt-1 text-sm text-gray-500">The event you're looking for doesn't exist or you don't have permission to view it.</p>
        <div className="mt-6">
          <button
            onClick={() => router.push('/admin/events')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed information about the event</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/admin/events/edit/${event._id}`)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Event Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">{event.title}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {event.description || 'No description provided.'}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <CalendarIcon className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" />
                <span>{formatDate(event.date)}</span>
              </div>
              {event.time && (
                <div className="mt-2 flex items-center">
                  <ClockIcon className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" />
                  <span>{event.time}</span>
                </div>
              )}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <MapPinIcon className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" />
                <span>{event.location || 'No location specified'}</span>
              </div>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Category</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <TagIcon className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" />
                <span>{event.category || 'No category specified'}</span>
              </div>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Attendees ({attendees.length})</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {attendeesLoading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ) : attendees.length > 0 ? (
                <div className="mt-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {attendees.map((attendee) => (
                      <li key={attendee._id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <UserGroupIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {attendee.name} ({attendee.email})
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 italic">No attendees yet.</p>
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-4 sm:px-6 flex justify-end space-x-3 bg-gray-50">
        <button
          type="button"
          onClick={() => router.push('/admin/events')}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error('Invalid response from server');
        }

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }

        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(error.message || 'Failed to load profile');
        // If unauthorized, redirect to login
        if (error.message.includes('401') || error.message.includes('token')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
          <p className="text-gray-400 mb-6">We couldn't load your profile information.</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-blue-100">{user.email}</p>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-200 border-b border-gray-700 pb-2">
              Profile Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Full Name</h3>
                <p className="mt-1 text-white">{user.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400">Email Address</h3>
                <p className="mt-1 text-white">{user.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400">Phone Number</h3>
                <p className="mt-1 text-white">{user.phoneNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400">College</h3>
                <p className="mt-1 text-white">{user.college}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400">Graduation Year</h3>
                <p className="mt-1 text-white">{user.graduationYear}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={() => router.push('/profile/edit')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    activeEvents: 0,
    recentUsers: [],
    recentEvents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const [statsRes, usersRes, eventsRes] = await Promise.all([
          fetch(`${API_URL}/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_URL}/users?limit=5`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_URL}/events?limit=5`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!statsRes.ok || !usersRes.ok || !eventsRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [statsData, recentUsers, recentEvents] = await Promise.all([
          statsRes.json(),
          usersRes.json(),
          eventsRes.json()
        ]);

        setStats({
          ...statsData,
          recentUsers,
          recentEvents
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error(error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="text-base text-gray-400">Total Users</div>
          <div className="flex items-center pt-1">
            <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="text-base text-gray-400">Total Events</div>
          <div className="flex items-center pt-1">
            <div className="text-2xl font-bold text-gray-900">{stats.totalEvents}</div>
          </div>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="text-base text-gray-400">Active Events</div>
          <div className="flex items-center pt-1">
            <div className="text-2xl font-bold text-gray-900">{stats.activeEvents}</div>
          </div>
        </div>
      </div>

      {/* Recent Users and Events */}
      <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2">
        <div className="p-5 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Users</h2>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {stats.recentUsers.map((user) => (
                <li key={user._id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name || 'No Name'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-5 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Events</h2>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {stats.recentEvents.map((event) => (
                <li key={event._id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

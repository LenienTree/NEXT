"use client"
import React from 'react';
import { Linkedin, Award, X } from 'lucide-react'; // Importing icons from lucide-react

// Data for team members
const teamMembers = [
  {
    id: 1,
    name: 'MARK ZHONG',
    title: 'Senior Designer',
    image: 'https://placehold.co/100x100/66BB6A/ffffff?text=MZ', // Placeholder for Mark Zhong
  },
  {
    id: 2,
    name: 'HENRY DOCKSON',
    title: 'Marketing Expert',
    image: 'https://placehold.co/100x100/4CAF50/ffffff?text=HD', // Placeholder for Henry Dockson
  },
  {
    id: 3,
    name: 'ARNAV GHANI',
    title: 'Graphic Designer',
    image: 'https://placehold.co/100x100/8BC34A/ffffff?text=AG', // Placeholder for Arnav Ghani
  },
  {
    id: 4,
    name: 'HENRY DOCKSON',
    title: 'Marketing Expert',
    image: 'https://placehold.co/100x100/4CAF50/ffffff?text=HD', // Placeholder for Henry Dockson
  },
  {
    id: 5,
    name: 'ARNAV GHANI',
    title: 'Graphic Designer',
    image: 'https://placehold.co/100x100/8BC34A/ffffff?text=AG', // Placeholder for Arnav Ghani
  },
  {
    id: 6,
    name: 'MARK ZHONG',
    title: 'Senior Designer',
    image: 'https://placehold.co/100x100/66BB6A/ffffff?text=MZ', // Placeholder for Mark Zhong
  },
  {
    id: 7,
    name: 'ARNAV GHANI',
    title: 'Graphic Designer',
    image: 'https://placehold.co/100x100/8BC34A/ffffff?text=AG', // Placeholder for Arnav Ghani
  },
  {
    id: 8,
    name: 'MARK ZHONG',
    title: 'Senior Designer',
    image: 'https://placehold.co/100x100/66BB6A/ffffff?text=MZ', // Placeholder for Mark Zhong
  },
  {
    id: 9,
    name: 'HENRY DOCKSON',
    title: 'Marketing Expert',
    image: 'https://placehold.co/100x100/4CAF50/ffffff?text=HD', // Placeholder for Henry Dockson
  },
];

// Individual Team Member Card Component
const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border-2 border-green-500/50 hover:border-green-500 transition-colors duration-300">
      <img
        src={member.image}
        alt={member.name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-green-500"
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/4b5563/d1d5db?text=Image+Error"; }}
      />
      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{member.title}</p>
      <div className="flex space-x-4">
        <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
          <Linkedin size={20} />
        </a>
        <a href="#" aria-label="Awards" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
          <Award size={20} /> {/* Using Award icon for the trophy */}
        </a>
        <a href="#" aria-label="X (Twitter)" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
          <X size={20} /> {/* Using X icon for Twitter */}
        </a>
      </div>
    </div>
  );
};

// Main Team Members Page Component
const TeamMembersPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter p-4 md:p-8 lg:p-12 flex flex-col items-center">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 uppercase tracking-wide">
        MEET THE TEAM
      </h1>

      {/* Team Members Grid */}
      {/* Changed md:grid-cols-2 to md:grid-cols-3 to show 3 cards on desktop */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersPage;

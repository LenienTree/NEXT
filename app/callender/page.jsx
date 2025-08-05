"use client";

import { useState, useEffect } from "react"; 
import Header from "../../components/Header";

//wohoo


import Footer from "../../components/Footer.jsx"
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";

const eventList = [
  { name: "Hackathon", color: "bg-blue-400" },
  { name: "Ideathon", color: "bg-yellow-400" },
  { name: "Conclave", color: "bg-red-400" },
  { name: "Webinar", color: "bg-purple-400" },
];

const getDotColor = (type) => {
  switch (type) {
    case 'Hackathon':
      return '#ff007f';
    case 'Ideathon':
      return '#8a2be2';
    case 'Conclave':
      return '#ff4500';
    case 'Webinar':
      return '#00e673';
    default:
      return '#ccc';
  }
};

const fetchEventsForMonth = async (date) => {
  return [
    { date: "2025-07-01", color: "bg-[#ff8c00]", type: "event" },
    { date: "2025-07-03", color: "bg-[#8a2be2]", type: "event" },
    { date: "2025-07-04", color: "bg-[#dc143c]", type: "event" },
    { date: "2025-07-04", color: "bg-[#ffd700]", type: "event" },
    { date: "2025-07-08", color: "bg-[#00bfff]", type: "event" },
    { date: "2025-07-17", color: "bg-[#ff1493]", type: "event" },
    { date: "2025-07-19", color: "bg-[#32cd32]", type: "event" },
    { date: "2025-07-25", color: "bg-[#ff4500]", type: "event" },
    { date: "2025-07-28", color: "bg-[#00ffff]", type: "event" },
  ];
};

const dashboardEventsData = [
  { id: 1, type: 'Hackathon', title: 'PRIMES LIVE ON', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=PRIMES+LIVE+ON' },
  { id: 2, type: 'Ideathon', title: 'STARLET', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=STARLET' },
  { id: 3, type: 'Conclave', title: 'Lenient Tree', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=Lenient+Tree' },
  { id: 4, type: 'Webinar', title: 'AMBASSADORS', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=AMBASSADORS' },
  { id: 5, type: 'Hackathon', title: 'EKATMATA', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=EKATMATA' },
  { id: 6, type: 'Ideathon', title: 'LINE FOLLOWER', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=LINE+FOLLOWER' },
  { id: 7, type: 'Conclave', title: 'GIRLATHON', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=GIRLATHON' },
  { id: 8, type: 'Webinar', title: 'Lenient Tree', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=Lenient+Tree' },
  { id: 9, type: 'Hackathon', title: 'SKILL HACK KERALA', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=SKILL+HACK+KERALA' },
  { id: 10, type: 'Ideathon', title: 'HACK INFINITY', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=HACK+INFINITY' },
  { id: 11, type: 'Conclave', title: 'Lenient Tree', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=Lenient+Tree' },
  { id: 12, type: 'Webinar', title: 'Abhinav Krishna', date: 'Oct 24 - 26', imageUrl: 'https://placehold.co/300x200/0a1a1a/00e673?text=Abhinav+Krishna' },
];

const EventCard = ({ event }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-[#1a2a2a] rounded-xl shadow-lg overflow-hidden border border-[#2a3a2a] transform transition-transform hover:scale-105">
      <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-300 text-sm">
        {!imageError ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-center p-4">Image Not Available</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-[#00e673]">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{event.date}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs px-3 py-1 rounded-full bg-[#2a3a2a] text-gray-300">{event.type}</span>
          <button className="text-[#00e673] hover:text-[#00cc66] text-sm font-medium">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const getCalendarEvents = async () => {
      const fetchedEvents = await fetchEventsForMonth(currentDate);
      setEvents(fetchedEvents);
    };
    getCalendarEvents();

    setDashboardEvents(dashboardEventsData);
  }, [currentDate]);

  const [dashboardEvents, setDashboardEvents] = useState([]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return days.map((day) => {
      const dayEvents = events.filter(
        (event) => new Date(event.date).toDateString() === day.toDateString()
      );

      const isCurrentMonth = isSameMonth(day, monthStart);
      const isDayToday = isToday(day);
      const isHovered =
        hoveredDate && hoveredDate.toDateString() === day.toDateString();

      return (
        <div
          key={day.toString()}
          className={`relative h-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 rounded-lg
            ${!isCurrentMonth ? "text-gray-500" : "text-white"}
            ${isHovered
              ? " transform scale-105 shadow-[0_0_8px_4px_rgba(255,255,255,0.5)] bg-[#2a3a2a]"
              : "hover:bg-[#2a3a2a]/50"
            }
            ${isDayToday ? "border-2 border-[#00e673]" : ""}
          `}
          onMouseEnter={() => setHoveredDate(day)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {dayEvents.length > 0 && (
            <div
              className={`flex gap-1 mb-1 transition-all duration-200 ${
                isHovered ? "transform translate-y-0.5" : ""
              }`}
            >
              {dayEvents.slice(0, 4).map((event, index) => (
                <div
                  key={index}
                  className={`w-1 h-3 rounded-full ${
                    event.color
                  } transition-all duration-200 ${
                    !isCurrentMonth ? "opacity-50" : ""
                  } ${isHovered ? "h-4 w-1.5" : ""}`}
                />
              ))}
            </div>
          )}

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
              ${isDayToday ? "bg-[#00e673] shadow-lg text-[#0a1a1a] font-bold" : ""}
            `}
          >
            <span
              className={`text-lg font-medium ${
                isDayToday ? "text-[#0a1a1a]" : "text-white"
              }`}
            >
              {format(day, "d")}
            </span>
          </div>
        </div>
      );
    });
  };

  const filteredMainEvents = activeFilter === 'All'
    ? dashboardEvents
    : dashboardEvents.filter(event => event.type === activeFilter);


  return (
    <div className="min-h-screen bg-[#0a1a1a] text-white font-inter flex flex-col">
      <Header pagename={"Calendar"} />

      <div className="flex-1 max-w-full mx-auto pt-28 px-4 flex flex-col lg:flex-row w-full">
        <aside className="lg:w-1/4 w-full p-6 bg-[#0a1a1a] border-r border-[#1a2a2a] flex flex-col">
          <div className="bg-[#1a2a2a] rounded-xl p-4 mb-6 shadow-lg border border-[#2a3a2a]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-[#00e673]">
                  {format(currentDate, "MMM")}
                </h1>
                <div className="text-white">
                  <div className="text-sm opacity-70">
                    {format(currentDate, "EEEE")}
                  </div>
                  <div className="text-lg">
                    {format(currentDate, "yyyy")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 text-[#00e673] hover:bg-[#3a4a4a] rounded-full transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 text-[#00e673] hover:bg-[#3a4a4a] rounded-full transition-all duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-bold text-[#00e673] mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-gray-400 pb-2"
                  >
                    {day}
                  </div>
                )
              )}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {renderCalendarDays()}
            </div>
          </div>

          <div className="bg-[#1a2a2a] rounded-xl p-4 mb-6 shadow-lg border border-[#2a3a2a]">
            <h3 className="text-lg font-semibold mb-2 text-[#00e673]">Do you want to publish your events?</h3>
            <p className="text-sm text-gray-300 mb-4">You can publish your events and reach out to a large community.</p>
            <button className="w-full bg-[#00e673] text-[#0a1a1a] py-2 rounded-lg font-bold hover:bg-[#00cc66] transition-colors shadow-md">
              Continue
            </button>
          </div>

          <div className="bg-[#1a2a2a] rounded-xl p-4 shadow-lg border border-[#2a3a2a]">
            <h3 className="text-lg font-semibold mb-4 text-[#00e673]">Organize an event</h3>
            <div className="space-y-3">
              {eventList.map((event, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between bg-[#2a3a2a] hover:bg-[#3a4a3a] transition-colors rounded-lg p-3 text-left shadow-sm"
                >
                  <span className="font-medium text-gray-200">{event.name}</span>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getDotColor(event.name) }}></span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-end mb-6">
            <div className="bg-[#1a2a2a] rounded-xl p-3 shadow-lg border border-[#2a3a2a]">
              <span className="text-white text-sm font-medium">Organize an event</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {['All', 'Hackathon', 'Ideathon', 'Conclave', 'Webinar'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors shadow-md
                  ${activeFilter === tab
                    ? 'bg-[#00e673] text-[#0a1a1a]'
                    : 'bg-[#1a2a2a] text-gray-300 hover:bg-[#2a3a2a]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMainEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

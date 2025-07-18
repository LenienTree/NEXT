"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
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

const fetchEventsForMonth = async (date) => {
  // Since the current date is July 17, 2025, let's add events for today
  return [
    { date: "2025-07-01", color: "bg-blue-400", type: "event" },
    { date: "2025-07-03", color: "bg-red-400", type: "event" },
    { date: "2025-07-04", color: "bg-red-400", type: "event" },
    { date: "2025-07-04", color: "bg-purple-400", type: "event" },
    { date: "2025-07-08", color: "bg-blue-400", type: "event" },
    { date: "2025-07-17", color: "bg-purple-400", type: "event" }, // Event for today
    { date: "2025-07-19", color: "bg-yellow-400", type: "event" },
  ];
};

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchEventsForMonth(currentDate);
      setEvents(fetchedEvents);
    };
    getEvents();
  }, [currentDate]);

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
          className={`relative h-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 rounded-lg ${
            !isCurrentMonth ? "text-gray-500" : "text-white"
          } ${
            isHovered
              ? " transform scale-105 shadow-[0_0_8px_4px_rgba(255,255,255,0.5)]"
              : "hover:bg-slate-700/20"
          }`}
          onMouseEnter={() => setHoveredDate(day)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {isDayToday && (
            <div className="absolute inset-0 rounded-lg sm:border-2 sm:border-green-400 sm:bg-green-500/20" />
          )}

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
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              isDayToday ? "bg-green-500 shadow-lg" : ""
            }`}
          >
            <span
              className={`text-lg font-medium ${
                isDayToday ? "text-white" : ""
              }`}
            >
              {format(day, "d")}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#102025]">
      <Header pagename={"Calendar"} />
      <div className="max-w-4xl mx-auto pt-28 px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Calendar Section */}
          <div className="sm:col-span-2">
            <div className="bg-transparent backdrop-blur-sm border-2 border-[#3B5445] rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-light text-white">
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
                    className="p-2 text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="border-b border-slate-600/50 mb-6"></div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
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
                {renderCalendarDays()}
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="w-full mx-auto space-y-10 lg:max-w-sm">
            <div className="bg-[#022F2E] backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex items-center justify-center">
              <h2 className="text-white text-center text-lg font-medium">
                Organize an event
              </h2>
            </div>
            <div className="border-b border-slate-600/50" />

            <div className="space-y-5">
              {eventList.map((event, index) => (
                <div
                  key={index}
                  className="bg-[#022F2E] backdrop-blur-sm border border-slate-700/50 rounded-xl flex p-4 items-center"
                >
                  <div className="flex justify-center items-center mx-auto gap-7">
                    <span className="text-white font-medium">
                      {event.name}
                    </span>
                    <div
                      className={`w-[7px] h-5 rounded-full ${event.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
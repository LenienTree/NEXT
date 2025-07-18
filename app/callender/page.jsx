"use client"

import Header from "../../components/Header"

export default function HomePage() {
  return (
      <div className="min-h-screen bg-[#102025]">
        <Header pagename={"Calendar"} />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 uppercase tracking-wide">Calendar</h1>
        <main className="pt-20">
        </main>
      </div>
  )
}

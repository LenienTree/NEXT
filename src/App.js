import { EventProvider } from "./context/EventContext"
import Header from "./components/Header"
import EventCarousel from "./components/EventCarousel"
import "./App.css"

function App() {
  return (
    <EventProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <EventCarousel />
        </main>
      </div>
    </EventProvider>
  )
}

export default App

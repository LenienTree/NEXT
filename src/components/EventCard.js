import "./EventCard.css"

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card-overlay"></div>

      <div className="event-card-content">
        <div className="event-grid">
          {/* Content Section */}
          <div className="event-info">
            {/* Brand */}
            <div className="brand-section">
              <div className="brand-icon">
                <span>⬢</span>
              </div>
              <span className="brand-name">{event.brand}</span>
            </div>

            {/* Title */}
            <div className="title-section">
              <h1 className="event-title">{event.title}</h1>
              <p className="event-subtitle">{event.subtitle}</p>
            </div>

            {/* Registration Section */}
            <div className="registration-section">
              <div className="qr-container">
                <img src={event.qrCode || "/placeholder.svg"} alt="QR Code" className="qr-code" />
              </div>
              <button className="register-btn">
                <span>REGISTER NOW</span>
                <span className="external-icon">↗</span>
              </button>
            </div>

            {/* Co-host */}
            <div className="cohost-section">
              <span className="cohost-label">CO-HOST</span>
              <div className="cohost-info">
                <div className="cohost-icon">
                  <span>⚡</span>
                </div>
                <span className="cohost-name">{event.coHost}</span>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className="event-visual">
            <div className="hexagon-container">
              <svg viewBox="0 0 200 200" className="hexagon-svg" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Main Hexagon */}
                <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" className="main-hexagon" />

                {/* Inner Elements */}
                <circle cx="100" cy="100" r="30" className="inner-circle-large" />
                <circle cx="100" cy="100" r="15" className="inner-circle-small" />

                {/* Connection Lines */}
                <line x1="70" y1="70" x2="130" y2="130" />
                <line x1="130" y1="70" x2="70" y2="130" />
                <line x1="100" y1="40" x2="100" y2="160" />
                <line x1="40" y1="100" x2="160" y2="100" />

                {/* Corner Elements */}
                <circle cx="50" cy="50" r="8" className="corner-element" />
                <circle cx="150" cy="50" r="8" className="corner-element" />
                <circle cx="150" cy="150" r="8" className="corner-element" />
                <circle cx="50" cy="150" r="8" className="corner-element" />

                {/* Tech Icons */}
                <rect x="80" y="45" width="12" height="12" className="tech-icon" />
                <rect x="108" y="45" width="12" height="12" className="tech-icon" />
                <rect x="140" y="80" width="12" height="12" className="tech-icon" />
                <rect x="140" y="108" width="12" height="12" className="tech-icon" />
              </svg>

              {/* Floating Elements */}
              <div className="floating-element floating-1"></div>
              <div className="floating-element floating-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard

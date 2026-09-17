import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Home from './pages/Home.jsx'
import Shows from './pages/Shows.jsx'
import Help from './pages/Help.jsx'
import Events from './pages/Events.jsx'
import Profile from './pages/Profile.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import BookingDate from './pages/BookingDate.jsx'
import BookingShowtimes from './pages/BookingShowtimes.jsx'
import BookingSeats from './pages/BookingSeats.jsx'
import BookingConfirmation from './pages/BookingConfirmation.jsx'
import BookingSummary from './pages/BookingSummary.jsx'
import EventBooking from './pages/EventBooking.jsx'
function Placeholder({ name }) {
  return <div style={{ padding: '2rem' }}><h1>{name}</h1><p>Coming soon.</p></div>
}
export default function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/events" element={<Events />} />
            <Route path="/settings" element={<Placeholder name="Settings" />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/book/:movieId" element={<BookingDate />} />
            <Route path="/book/:movieId/showtimes" element={<BookingShowtimes />} />
            <Route path="/book/:movieId/seats" element={<BookingSeats />}/>
            <Route path="/book/:movieId/confirmation" element={<BookingConfirmation />} />
            <Route path="/book/:movieId/summary" element={<BookingSummary />} />
            <Route path="/event/:eventId/book" element={<EventBooking />} />
            
          </Routes>
        </main>
      </div>
    </div>
  )
}
//<Route path="/book/:movieId/seats" element={<BookingSeats />} />
 //<Route path="/book/:movieId/showtimes" element={<BookingShowtimes />} />



 
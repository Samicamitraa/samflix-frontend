import { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState({
    movie: null,
    date: null,
    screen: null,
    time: null,
    seats: [],
  })

  const selectMovie = (movie) => setBooking((b) => ({ ...b, movie, date: null, screen: null, time: null, seats: [] }))
  const selectDate = (date) => setBooking((b) => ({ ...b, date, screen: null, time: null, seats: [] }))
  const selectShow = (screen, time) => setBooking((b) => ({ ...b, screen, time, seats: [] }))
  const toggleSeat = (seatId) =>
    setBooking((b) => ({
      ...b,
      seats: b.seats.includes(seatId) ? b.seats.filter((s) => s !== seatId) : [...b.seats, seatId],
    }))
  const resetBooking = () => setBooking({ movie: null, date: null, screen: null, time: null, seats: [] })

  return (
    <BookingContext.Provider value={{ booking, selectMovie, selectDate, selectShow, toggleSeat, resetBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
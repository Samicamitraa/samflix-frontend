import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Typography, Button, Card } from 'antd'
import { movies } from '../data/movies.js'
import { saveBooking } from '../utils/storage.js'

const { Title } = Typography

const pricePerSeat =280

function generateBookingId() {
  const num = Math.floor(10000 + Math.random() * 90000)
  return `THR${num}`
}

export default function BookingConfirmation() {
  const { movieId } = useParams()
  const [searchParams] = useSearchParams()

  const date = searchParams.get('date')
  const screen = searchParams.get('screen')
  const time = searchParams.get('time')
  const seatsParam = searchParams.get('seats')
  const seats = seatsParam ? seatsParam.split(',') : []

  const movie = movies.find((m) => m.id === movieId)

  const [bookingId] = useState(generateBookingId)

  const total=seats.length*pricePerSeat

  useEffect(() => {
    if (movie && seats.length > 0) {
      saveBooking({
        bookingId,
        movieTitle: movie.title,
        date,
        screen,
        time,
        seats,
        total,
      })
    }
  }, [])

  if (!movie || seats.length === 0) {
    return (
      <div>
        <Title level={2}>No booking found</Title>
        <Link to="/shows"><Button>Back to Shows</Button></Link>
      </div>
    )
  }

  return (
    <div>
      <Title level={2}>🎉 Booking Confirmed!</Title>

      <Card style={{ maxWidth: 400 }}>
        <p><strong>Movie:</strong> {movie.title}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Screen:</strong> {screen}</p>
        <p><strong>Seats:</strong> {seats.join(', ')}</p>
        <p><strong>Total:</strong> ₹{total}</p>
        <p><strong>Booking ID:</strong> {bookingId}</p>
      </Card>

      <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
        <Link to="/"><Button>Back to Home</Button></Link>
        <Link to="/shows"><Button type="primary">Browse More Shows</Button></Link>
      </div>
    </div>
  )
}

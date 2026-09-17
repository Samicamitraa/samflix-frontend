import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Typography, Button, Card } from 'antd'
import { movies } from '../data/movies.js'
import BackButton from '../components/BackButton.jsx'
const { Title } = Typography
const pricePerSeat=280

export default function BookingSummary() 
{
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const date=searchParams.get('date')
  const screen=searchParams.get('screen')
  const time=searchParams.get('time')
  const seatsParam=searchParams.get('seats')
  const seats=seatsParam ? seatsParam.split(',') : []  //arr

  const movie = movies.find((m)=>m.id === movieId)

  if (!movie) 
    {
    return (
      <div>
        <Title level={2}>Movie not found</Title>
        <Link to="/shows"><Button>Back to Shows</Button></Link>
      </div>
    )
   }

  if (seats.length === 0) 
    {
    return (
      <div>
        <Title level={2}>No seats selected</Title>
        <Link to={`/book/${movie.id}`}><Button type="primary">Start Booking</Button></Link>
      </div>
    )
  }

  const total = seats.length * pricePerSeat

  function confirmBooking() 
  {
    navigate(`/book/${movie.id}/confirmation?date=${date}&screen=${screen}&time=${time}&seats=${seatsParam}`)
  }
  return (
    <div>
      <Title level={2}>Booking Summary</Title>
      <Card style={{ maxWidth: 400 }}>
        <p><strong>Movie:</strong> {movie.title}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Screen:</strong> {screen}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Selected Seats:</strong> {seats.join(', ')}</p>
        <p><strong>Number of Seats:</strong> {seats.length}</p>
        <p><strong>Total Price:</strong> ₹{total}</p>
      </Card>
      <Button type="primary" size="large" style={{ marginTop: 16 }} onClick={confirmBooking}>
        Confirm Booking
      </Button>
      <BackButton />
    </div>
  )
}
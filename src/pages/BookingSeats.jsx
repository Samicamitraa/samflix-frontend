import { useState } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Typography, Button } from 'antd'
import { movies } from '../data/movies.js'
import BackButton from '../components/BackButton.jsx'

const { Title } = Typography

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const seatsPerRow = 8
const pricePerSeat = 280
const alreadyBooked = ['B1','C4','I6','H1','H2','E4'] 

export default function BookingSeats() 
{
  const {movieId}=useParams()
  const navigate=useNavigate()
  const [searchParams]=useSearchParams()
  const date=searchParams.get('date')
  const screen=searchParams.get('screen')
  const time=searchParams.get('time')
  const movie=movies.find((m) => m.id === movieId)

  const [selectedSeats, setSelectedSeats] = useState([])
  if (!movie) 
  {
    return (
      <div>
        <Title level={2}>Movie not found</Title>
        <Link to="/shows"><Button>Back to Shows</Button></Link>
      </div>
    )
  }

  if (!time) 
  {
    return (
      <div>
        <Title level={2}>No showtime selected</Title>
        <Link to={`/book/${movie.id}`}><Button type="primary">Start Booking</Button></Link>
      </div>
    )
  }
  function toggleSeat(seatId) 
  {
    if(alreadyBooked.includes(seatId)) return
    if(selectedSeats.includes(seatId)) 
    {
      setSelectedSeats(selectedSeats.filter((s)=>s!==seatId))
    } 
    else 
    {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }
  const total = selectedSeats.length * pricePerSeat

  function goToSummary()
 {
    const seatsParam = selectedSeats.join(',')
    navigate(`/book/${movie.id}/summary?date=${date}&screen=${screen}&time=${time}&seats=${seatsParam}`)
 }
  return (
    <div>
      <p style={{ color: '#888' }}>{movie.title} · {date} · {screen} · {time}</p>
      <Title level={2}>Select Seats</Title>
      <Title level={2}>---------screen----------</Title>

      <div style={{ marginBottom: 20 }}>
        {rows.map((row) => (
          <div key={row} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatId = row + (i + 1)
              const isBooked = alreadyBooked.includes(seatId)
              const isSelected = selectedSeats.includes(seatId)
              let background = '#fff'
              if (isBooked) background = '#ddd'
              if (isSelected) background = '#e94560'
              return (
                <button
                  key={seatId}
                  onClick={() => toggleSeat(seatId)}
                  disabled={isBooked}
                  style={{
                    width: 44,
                    height: 44,
                    background,
                    color: isSelected ? '#fff' : '#333',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    cursor: isBooked ? 'not-allowed' : 'pointer',
                  }}
                >
                  {seatId}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <p>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : '—'}</p>
      <p>Number of Seats: {selectedSeats.length}</p>
      <p>Total Price: ₹{total}</p>
    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
  <Button onClick={() => navigate('/shows')}>Cancel</Button>
  <Button onClick={() => navigate(-1)}>← Back</Button>
  <Button
    type="primary"
    size="large"
    disabled={selectedSeats.length === 0}
    onClick={goToSummary}
  >
    Proceed to Summary
  </Button>
</div>
      
     
    </div>
  )
}
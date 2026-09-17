import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Typography, Button } from 'antd'
import { events } from '../data/events.js'
import BackButton from '../components/BackButton.jsx'

const{Title}=Typography
const rows=['A','B','C','D']
const seatsPerRow=6
const alreadyBooked=['B2','C3']

export default function EventBooking()
{
  const { eventId } = useParams()
  const navigate = useNavigate()
  const event=events.find((e)=>e.id===eventId)
  const [selectedSeats,setSelectedSeats]=useState([])
  const [confirmed,setConfirmed]=useState(false)

  if(!event) 
  {
    return (
      <div>
        <Title level={2}>Event not found</Title>
        <Link to="/events"><Button>Back to Events</Button></Link>
      </div>
    )
  }
  function toggleSeat(seatId) {
    if (alreadyBooked.includes(seatId)) return
    if (selectedSeats.includes(seatId)) 
    {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId))
    } 
    else 
    {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const total = selectedSeats.length * event.price

  function handleBook() 
  {
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div>
        <Title level={2}>🎉 Ticket Booked!</Title>
        <p><strong>Event:</strong> {event.title}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
        <p><strong>Total Paid:</strong> ₹{total}</p>

        <Link to="/events"><Button type="primary" style={{ marginTop: 16 }}>Browse More Events</Button></Link>
      </div>
    )
  }

  return (
    <div>
      <BackButton />
      <Title level={2}>{event.title}</Title>
      <p style={{ color: '#888' }}>{event.date} · {event.time} · {event.location}</p>

      <Title level={4}>Select Seats</Title>

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
                  width: 40, height: 40, background,
                  color: isSelected ? '#fff' : '#333',
                  border: '1px solid #ccc', borderRadius: 6,
                  cursor: isBooked ? 'not-allowed' : 'pointer',
                }}
              >
                {seatId}
              </button>
            )
          })}
        </div>
      ))}

      <p style={{ marginTop: 16 }}>Selected: {selectedSeats.join(', ') || '—'}</p>
      <p>Total: ₹{total}</p>

      <Button type="primary" size="large" disabled={selectedSeats.length === 0} onClick={handleBook}>
        Confirm Booking
      </Button>
    </div>
  )
}
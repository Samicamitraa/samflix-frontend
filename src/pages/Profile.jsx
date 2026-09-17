import { useState, useEffect } from 'react'
import { Typography, Card, Avatar, Tag } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getBookings } from '../utils/storage.js'

const { Title } = Typography

const profile = {
  name: 'Samicamitraa Kesavan',
  dob: '1-8-2005',
  email: 'sam@gmail.com',
  phone: '9236457642',
}

function isUpcoming(dateStr) {
  if (!dateStr) return true
  const withYear = `${dateStr} ${new Date().getFullYear()}`
  const bookingDate = new Date(withYear)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return bookingDate >= today
}

export default function Profile() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const all = getBookings()
    setBookings(all.filter((b) => isUpcoming(b.date)))
  }, [])

  return (
    <div>
      <Title level={2}>My Profile</Title>

      <Card style={{ maxWidth: 900, marginBottom: 30 }}>
        <Avatar size={70} icon={<UserOutlined />} style={{ background: '#e94560', marginBottom: 12 }} />
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Date of Birth:</strong> {profile.dob}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
      </Card>

      <Title level={3}>My Bookings</Title>

      {bookings.length === 0 ? (
        <p>You haven't made any bookings yet.</p>
      ) : (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {bookings.map((b) => (
            <Card key={b.bookingId} style={{ width: 260 }}>
              <Tag color="magenta">Movie</Tag>
              <Tag color="green">Confirmed</Tag>
              <p style={{ fontWeight: 700, fontSize: 16 }}>{b.movieTitle}</p>
              <p style={{ color: '#888', fontSize: 13 }}>Booking ID: {b.bookingId}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
              <p><strong>Location:</strong> {b.screen}</p>
              <p><strong>Seats:</strong> {b.seats.join(', ')}</p>
              <p><strong>Total:</strong> ₹{b.total}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
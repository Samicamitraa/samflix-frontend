import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Typography, Button } from 'antd'
import { movies } from '../data/movies.js'
import BackButton from '../components/BackButton.jsx'

const { Title } = Typography

const screens = [
  {
    name: 'Screen 1',
    times: [
      { time: '10:00 AM', full: false },
      { time: '2:00 PM', full: false },
      { time: '7:30 PM', full: true },
    ],
  },
  {
    name: 'Screen 2',
    times: [
      { time: '11:00 AM', full: false },
      { time: '4:00 PM', full: true },
      { time: '9:00 PM', full: false },
    ],
  },
]
export default function BookingShowtimes() 
{
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date')
  const movie = movies.find((m)=> m.id === movieId)
  if(!movie) 
{
    return (
      <div>
        <Title level={2}>Movie not found</Title>
        <Link to="/shows"><Button>Back to Shows</Button></Link>
      </div>
    )
}
  if (!date)
  {
    return (
      <div>
        <Title level={2}>No date selected</Title>
        <Link to={`/book/${movie.id}`}><Button type="primary">Choose a Date</Button></Link>
      </div>
    )
  }
  function pickShow(screenName, time) 
  {
    navigate(`/book/${movie.id}/seats?date=${date}&screen=${screenName}&time=${time}`)
  }

  return (
    <div>
      <BackButton />
      <p style={{ color: '#888' }}>{movie.title} · {date}</p>
      <Title level={2}>Available Shows</Title>
      {screens.map((screen) => (
        <div key={screen.name} style={{ marginBottom: 24 }}>
          <p style={{ fontWeight: 600 }}>{screen.name}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {screen.times.map((slot) => (
              <Button
                key={slot.time}
                disabled={slot.full}
                onClick={() => pickShow(screen.name, slot.time)}
              >
                {slot.time} — {slot.full ? 'FULL' : 'Available'}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
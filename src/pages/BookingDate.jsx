import { useParams, useNavigate, Link } from 'react-router-dom'
import { Typography, Button } from 'antd'
import { movies } from '../data/movies.js'
import BackButton from '../components/BackButton.jsx'
const { Title } = Typography
function getDates() 
{
  const dates=[]
  const today=new Date()
  for(let i=0;i<4;i++) 
  {
    const d=new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }))
  }
  return dates
}
export default function BookingDate()
{
  const { movieId } = useParams()
  const navigate = useNavigate()
  const movie = movies.find((m) => m.id === movieId)
  const dates = getDates()

  if (!movie) 
  {
    return (
      <div>
        <Title level={2}>Movie not found</Title>
        <Link to="/shows"><Button>Back to Shows</Button></Link>
      </div>
    )
  }

  function pickDate(date)
 {
    navigate(`/book/${movie.id}/showtimes?date=${date}`)
  }

  return (
      <div>
        <BackButton />
        <p style={{ color: '#888' }}>{movie.title}</p>
        <Title level={2}>Choose a Date</Title>
        <div style={{ display: 'flex', gap: 10 }}>
          {dates.map((date) => (
            <Button key={date} onClick={() => pickDate(date)}>
              {date}
            </Button>
          ))}
        </div>
      </div>
  )
}
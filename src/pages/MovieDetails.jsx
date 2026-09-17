import { useParams, Link } from 'react-router-dom'
import { Typography, Tag, Button, Card } from 'antd'
import { movies } from '../data/movies.js'
import BackButton from '../components/BackButton.jsx'
const { Title, Paragraph } = Typography
export default function MovieDetails() 
{
  const { id } = useParams()
  const movie = movies.find((m) => m.id === id)
  if (!movie) {
    return (
      <div>
        <Title level={2}>Movie not found</Title>
        <Link to="/shows"><Button>Back to Shows</Button></Link>
      </div>
    )
  }
  const dateStr = new Date(movie.releaseDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  return (
    <div>
      <BackButton />
      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ width: 260, borderRadius: 8, objectFit: 'cover' }}
        />
        <div style={{ maxWidth: 480 }}>
          <Title level={2}>{movie.title}</Title>
          <p style={{ color:'#888' }}>
            {dateStr} · {movie.genre}
          </p>
          <Tag color="volcano" style={{ marginBottom: 12 }}>★ {movie.rating}</Tag>
          <Paragraph>{movie.description}</Paragraph>

          {movie.bookable ? (
            <Link to={`/book/${movie.id}`}>
              <Button type="primary" size="large">Book Tickets</Button>
            </Link>
          ) : (
            <Button size="large" disabled>Coming Soon</Button>
          )}
        </div>

        <Card title="Movie Info" style={{ width: 260, height: 'fit-content' }}>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Date:</strong> {dateStr}</p>
          <p><strong>Rating:</strong> ★ {movie.rating}</p>
          <p><strong>Status:</strong> {movie.bookable ? 'Now Showing' : 'Coming Soon'}</p>
        </Card>
      </div>

      <div style={{ marginTop: 40 }}>
        <Title level={3}>Cast &amp; Crew</Title>
        <Card style={{ maxWidth: 600 }}>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Duration:</strong> {movie.duration}</p>
          <p style={{ marginBottom: 0 }}>
            <strong>Cast:</strong> {movie.cast ? movie.cast.join(', ') : 'Not available'}
          </p>
        </Card>
      </div>
    </div>
  )
}
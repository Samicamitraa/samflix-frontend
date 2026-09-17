import { Card, Tag } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Meta } = Card

export default function MovieCard({ movie }) {
  const dateStr = new Date(movie.releaseDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  let bookBtn
  if (movie.bookable) {
    bookBtn = (
      <Link to={`/movie/${movie.id}`} key="book" style={{ color: '#e94560', fontWeight: 600 }}>
        Book
      </Link>
    )
  } else {
    bookBtn = <span key="soon" style={{ color: '#999' }}>Coming Soon</span>
  }

  return (
    <Card
      hoverable
      cover={<img alt={movie.title} src={movie.poster} style={{ height: 280, objectFit: 'cover' }} />}
      style={{ width: 200 }}
      actions={[
        <Link to={`/movie/${movie.id}`} key="details">View Details</Link>,
        bookBtn,
      ]}
    >
      <Meta
        title={movie.title}
        description={
          <div>
            <div>{dateStr} · {movie.genre}</div>
            <Tag color="volcano" style={{ marginTop: 6 }}>
              <StarFilled /> {movie.rating}
            </Tag>
          </div>
        }
      />
    </Card>
  )
}
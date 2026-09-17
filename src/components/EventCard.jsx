import { Card, Button } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card
export default function EventCard({ event }) {
  const dateStr = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  return (
    <Card
      hoverable
      cover={<img alt={event.title} src={event.image} style={{ height: 180, objectFit: 'cover' }} />}
      style={{ width: 240 }}
    >
      <Meta
        title={event.title}
        description={
          <div>
            <div>{dateStr} · {event.time}</div>
            <div>{event.location}</div>
            <div style={{ marginTop: 6, fontWeight: 600 }}>₹{event.price}</div>
          </div>
        }
      />
      <div style={{ marginTop: 12 }}>
        {event.bookable ? (
          <Link to={`/event/${event.id}/book`}>
            <Button type="primary" size="small" block>Book</Button>
          </Link>
        ) : (
          <Button size="small" block disabled>Coming Soon</Button>
        )}
      </div>
    </Card>
  )
}
import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import { Typography, Row, Col, Tag, Input, Button } from 'antd'
import { movies } from '../data/movies.js'
import MovieCard from '../components/MovieCard.jsx'

const { Title } = Typography //Title from inside Typography
const { TextArea } = Input 
//comp
export default function Home() { 
  //const navigate = useNavigate()

  const newMovies = movies.filter((m) => m.isNew)
  const recommended = movies.filter((m) => m.isRecommended)
  const upcoming = movies.filter((m) => m.isUpcoming)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !email || !msg) {
      alert('please fill all fields')
      return
    }
    console.log(name, email, msg)
    setSent(true)
    setName('')
    setEmail('')
    setMsg('')
  }

  return (
    <div>
      <Title level={2}>New Movies</Title>   {/* h2 */}
      <Row gutter={16}>  {/* gutter-dis bw 2img */}
        {newMovies.map((m) => (  
          <Col key={m.id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>

      <Title level={2}>Top Recommendations</Title>
      <Row gutter={16}>
        {recommended.map((m) => (
          <Col key={m.id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>

    
      <Title level={2}>Upcoming Movies</Title>
      <Row gutter={16}>
        {upcoming.map((m) => (
          <Col key={m.id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>

      <Title level={2}>Contact Theater</Title>
      <form onSubmit={handleSubmit} style={{ maxWidth: 350 }}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <TextArea
          placeholder="Problem / Message"
          rows={3}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" htmlType="submit">Send Message</Button>
        {sent && <p style={{ color: 'green' }}>thanks, we'll get back to you soon</p>}
      </form>

      <p>📞 Theater Contact: +91 98765 43210</p>
    </div>
  )
}
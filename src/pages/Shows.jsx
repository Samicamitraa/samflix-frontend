import { useState } from 'react'
import { Typography, Input, Select, Row, Col } from 'antd'
import { movies } from '../data/movies.js'
import MovieCard from '../components/MovieCard.jsx'

const { Title } = Typography

export default function Shows() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  function getFilteredMovies() {
    let list = movies

    if (search) {
      list = list.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
    }

    list = [...list]

    if (sortBy == 'az') {
      list.sort(function (a, b) {
        return a.title.localeCompare(b.title)
      })
    }
    if (sortBy == 'za') {
      list.sort(function (a, b) {
        return b.title.localeCompare(a.title)
      })
    }
    if (sortBy == 'popular') {
      list.sort(function (a, b) {
        return b.rating - a.rating
      })
    }
    if (sortBy == 'release') {
      list.sort(function (a, b) {
        return new Date(b.releaseDate) - new Date(a.releaseDate)
      })
    }

    return list
  }

  const results = getFilteredMovies()

  return (
    <div>
      <Title level={2}>Shows</Title>

      <Input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 250, marginRight: 10, marginBottom: 20 }}
      />
      <Select
        value={sortBy}
        onChange={(v) => setSortBy(v)}
        style={{ width: 180, marginBottom: 20 }}
      >
        <Select.Option value="az">A-Z</Select.Option>
        <Select.Option value="za">Z-A</Select.Option>
        <Select.Option value="popular">Most Popular</Select.Option>
        <Select.Option value="recent">Recently Added</Select.Option>
        <Select.Option value="release">Release Date</Select.Option>
      </Select>
      <br />
      {results.length == 0 && <p>Movies not found</p>}

      <Row gutter={[16, 16]}>
        {results.map((m) => (
          <Col key={m.id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
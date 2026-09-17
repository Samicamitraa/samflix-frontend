import { useState } from 'react'
import { Typography, Input, Select, Row, Col } from 'antd'
import { events } from '../data/events.js'
import EventCard from '../components/EventCard.jsx'
const { Title } = Typography
export default function Events() {
  const[search, setSearch]=useState('')
  const[sortBy, setSortBy]=useState('date')
  function getEvents() 
  {
    let list=events
    if(search) 
    {
      list=list.filter((e)=>e.title.toLowerCase().includes(search.toLowerCase()))
    }
    list=[...list]
    if (sortBy=='az')
    {
      list.sort(function(a,b)
      {
        return a.title.localeCompare(b.title)
      })
    }
    if(sortBy=='za') 
    {
      list.sort(function(a,b) 
      {
        return b.title.localeCompare(a.title)
      })
    }
    if(sortBy == 'date') 
    {
      list.sort(function (a,b) 
      {
        return new Date(a.date)-new Date(b.date)
      })
    }
    if(sortBy=='price') 
    {
      list.sort(function(a, b) 
      {
        return a.price-b.price
      })
    }
    return list
  }
  const results=getEvents()
  return (
    <div>
      <Title level={2}>Events</Title>
      <Input
        placeholder="Search for events..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{ width:250,marginRight: 10, marginBottom: 20 }}
      />
      <Select
        value={sortBy}
        onChange={(v) => setSortBy(v)}
        style={{ width: 180, marginBottom: 20 }}
      >
        <Select.Option value="az">A-Z</Select.Option>
        <Select.Option value="za">Z-A</Select.Option>
        <Select.Option value="date">Event Date</Select.Option>
        <Select.Option value="price">Price: Low to High</Select.Option>
      </Select>
    <br />
    {results.length == 0 && <p>No events match your search...</p>}
      <Row gutter={[16, 16]}>
        {results.map((e) => (
          <Col key={e.id}>
            <EventCard event={e} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
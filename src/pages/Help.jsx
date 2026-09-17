import { Card, Typography, Row, Col, Button } from 'antd'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const steps = [
  { title: 'Choose a movie or event', desc: 'Browse the Shows or Events page.' },
  { title: 'Choose the date', desc: 'Pick from the available dates.' },
  { title: 'Choose the available show time', desc: 'Full shows are disabled.' },
  { title: 'Choose your seats', desc: 'Booked seats cannot be selected.' },
  { title: 'Enter your details', desc: 'Name, email and phone number.' },
  { title: 'Check your booking', desc: 'Review the booking summary.' },
  { title: 'Confirm the booking', desc: 'Get your booking ID instantly.' },
]

export default function Help() {
  return (
    <div>
      <Title level={2}>Help</Title>

      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Card title="How to Book" size="small">
            {steps.map((step, index) => (
              <div key={step.title} style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: '#e94560',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: '#eee', minHeight: 18 }} />
                  )}
                </div>
                <div style={{ paddingBottom: 14 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{step.title}</div>
                  <div style={{ fontSize: 12, color: '#999' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </Card>
        </Col>

        <Col span={10}>
          <Card title="Need Help?" size="small">
            <Paragraph style={{ fontSize: 13 }}>
              Contact the theater and our box office team will assist you.
            </Paragraph>
            <p style={{ fontSize: 13 }}><PhoneOutlined /> +91 98765 43210</p>
            <p style={{ fontSize: 13 }}><MailOutlined /> theater@example.com</p>
            <Link to="/shows">
              <Button type="primary" style={{ marginTop: 10 }}>Browse Shows</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
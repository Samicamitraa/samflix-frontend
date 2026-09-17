import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Switch } from 'antd'

export default function Header() 
{
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode)
    {
      document.body.classList.add('dark-mode')
    } 
    else 
    {
      document.body.classList.remove('dark-mode')
    }
  },[darkMode])

  return (
    <header className="header">
      <Link to="/" className="header__logo">🎥 samflix</Link>
      <div className="header__actions">
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
       
      />
        <button className="icon-btn" aria-label="Notifications">🔔</button>
        <Link to="/profile" className="icon-btn" aria-label="Profile">👤</Link>
      </div>
    </header>
  )
}
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" end>🏠 Home</NavLink>
        <NavLink to="/shows">🎬 Shows</NavLink>
        <NavLink to="/events">🎪 Events</NavLink>
        <NavLink to="/help">❓ Help</NavLink>
      </nav>
    </aside>
  )
}


//<NavLink to="/settings">⚙️ Settings</NavLink>
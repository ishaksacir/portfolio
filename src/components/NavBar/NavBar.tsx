import type { ReactNode } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { profile } from '../../data/profile'
import useTheme from '../../hooks/useTheme'

type SectionId = 'about' | 'projects' | 'skills' | 'experience'

function NavButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button className="navLink" type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const goHomeSection = (id: SectionId) => {
    // Navigate to Home and pass the section id in route state.
    navigate('/', { state: { scrollToId: id } })
  }

  const isHome = location.pathname === '/'

  const goHomeTop = () => {
    if (isHome) {
      // Avoid relying on route state when we're already on "/".
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
    navigate('/')
  }

  return (
    <header className="navBar">
      <div className="container navInner">
        <div className="brand" aria-label="Portfolio header">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandName">{profile.name}</div>
            <div className="brandRole">{profile.role}</div>
          </div>
        </div>

        <nav className="navLinks" aria-label="Primary navigation">
          <NavButton
            onClick={() => {
              goHomeTop()
            }}
          >
            Home
          </NavButton>
          <NavButton onClick={() => goHomeSection('projects')}>Projects</NavButton>
          <NavButton onClick={() => goHomeSection('skills')}>Skills</NavButton>
          <NavButton onClick={() => goHomeSection('experience')}>Experience</NavButton>
          <Link className="navLink" to="/contact">
            Contact
          </Link>
          <Link className="navLink" to="/blog">
            Blog
          </Link>

          <button
            className="iconButton"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}


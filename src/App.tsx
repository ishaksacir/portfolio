import { HashRouter, Route, Routes } from 'react-router-dom'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import HomePage from './pages/HomePage'
import ScrollToTop from './routing/ScrollToTop'
import NavBar from './components/NavBar/NavBar'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog/*" element={<BlogPage />} />
      </Routes>
    </HashRouter>
  )
}

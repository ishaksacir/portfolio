import { Navigate, Route, Routes } from 'react-router-dom'
import BlogListPage from './BlogListPage'
import BlogPostPage from './BlogPostPage'

export default function BlogPage() {
  return (
    <Routes>
      <Route index element={<BlogListPage />} />
      <Route path=":slug" element={<BlogPostPage />} />
      <Route path="*" element={<Navigate to="/blog" replace />} />
    </Routes>
  )
}


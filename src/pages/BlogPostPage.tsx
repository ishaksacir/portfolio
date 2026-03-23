import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blog'
import Section from '../components/Section/Section'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="page">
        <Section
          title="Post not found"
          subtitle="That page might have moved or the slug is incorrect."
        >
          <div className="card" style={{ padding: 16 }}>
            <Link className="btn btnSmall btnPrimary" to="/blog">
              Back to blog
            </Link>
          </div>
        </Section>
      </main>
    )
  }

  return (
    <main className="page">
      <Section
        title={post.title}
        subtitle={`${post.date} | ${post.tags.join(' | ')}`}
        right={
          <Link className="btn btnSmall" to="/blog">
            Back
          </Link>
        }
      >
        <div className="card" style={{ padding: 18 }}>
          {post.content.map((paragraph, idx) => (
            <p
              key={idx}
              style={{
                margin: idx === 0 ? 0 : '12px 0 0',
                color: 'var(--muted)',
                lineHeight: 1.65,
                fontSize: 15,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Section>
    </main>
  )
}


import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blog'
import Reveal from '../components/Reveal/Reveal'
import Section from '../components/Section/Section'

export default function BlogListPage() {
  return (
    <div>
      <Section
        title="Blog"
        subtitle="Short notes on minimal UI, React, and frontend workflow."
      >
        <div className="projectList" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          {blogPosts.map((p, idx) => (
            <Reveal key={p.slug} delayMs={idx * 70}>
              <div className="card projectCard">
                <div className="projectTop">
                  <h3 className="projectName">{p.title}</h3>
                </div>
                <div className="tagRow">
                  {p.tags.map((t) => (
                    <div key={t} className="tag">
                      {t}
                    </div>
                  ))}
                </div>
                <p className="projectDesc">{p.excerpt}</p>
                <Link className="projectLink" to={`/blog/${p.slug}`}>
                  Read post <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  )
}


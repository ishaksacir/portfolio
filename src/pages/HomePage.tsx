import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../data/profile'
import Reveal from '../components/Reveal/Reveal'
import Section from '../components/Section/Section'
import SkillMeters from '../components/Skills/SkillMeters'

type NavState = {
  scrollToId?: 'about' | 'projects' | 'skills' | 'experience'
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

export default function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const state = location.state as NavState | null
    if (!state?.scrollToId) return

    const target = state.scrollToId
    // Allow layout to paint before scrolling.
    const t = window.setTimeout(() => scrollToSection(target), 60)
    return () => window.clearTimeout(t)
  }, [location.state])

  return (
    <main className="page">
      <div className="hero">
        <div className="container heroGrid">
          <div>
            <h1 className="heroTitle">
              Minimal web craft with <span className="gradientText">animated clarity</span>.
            </h1>
            <p className="heroLead">
              {profile.summary} <span style={{ color: 'var(--text-strong)' }}>{profile.location}</span>
            </p>

            <div className="heroActions">
              <button
                className="btn btnPrimary"
                type="button"
                onClick={() => scrollToSection('projects')}
              >
                View projects <span aria-hidden="true">-&gt;</span>
              </button>
              <Link className="btn" to="/contact">
                Contact <span aria-hidden="true">Mail</span>
              </Link>
              <a className="btn btnSmall" href={profile.cvDownloadHref} download>
                Download CV <span aria-hidden="true">Down</span>
              </a>
            </div>

            <div className="pillRow" aria-label="Key skills">
              {profile.skills.chips.map((c) => (
                <div key={c} className="pill">
                  <strong>*</strong> {c}
                </div>
              ))}
            </div>
          </div>

          <Reveal delayMs={120}>
            <aside className="heroCard" aria-label="Quick stats">
              <div className="heroCardTitle">What I bring</div>
              <div className="statGrid">
                <div className="stat">
                  <div className="statNum">{profile.projects.length}</div>
                  <div className="statLabel">Projects & sites</div>
                </div>
                <div className="stat">
                  <div className="statNum">{profile.experience.length}</div>
                  <div className="statLabel">Experience entries</div>
                </div>
                <div className="stat">
                  <div className="statNum">React</div>
                  <div className="statLabel">UI components + motion</div>
                </div>
                <div className="stat">
                  <div className="statNum">UX</div>
                  <div className="statLabel">Figma-first thinking</div>
                </div>
              </div>

              <div style={{ marginTop: 14, color: 'var(--muted)', fontSize: 13, lineHeight: 1.45 }}>
                Tip: use the navbar to jump to <span style={{ color: 'var(--text-strong)' }}>Skills</span> and{' '}
                <span style={{ color: 'var(--text-strong)' }}>Experience</span>.
              </div>
            </aside>
          </Reveal>
        </div>
      </div>

      <Section id="about" title="About" subtitle="A short story behind the code.">
        <div className="grid2">
          <Reveal>
            <div className="card" style={{ padding: 16 }}>
              {profile.about.map((p) => (
                <p key={p} style={{ margin: '0 0 12px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {p}
                </p>
              ))}

              <div className="tagRow" style={{ marginBottom: 0 }}>
                <div className="tag">Frontend</div>
                <div className="tag">UI/UX</div>
                <div className="tag">Teamwork</div>
                <div className="tag">Clean interactions</div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: 15 }}>Education</h3>
              <div style={{ height: 10 }} />
              {profile.education.map((e) => (
                <p key={e} style={{ margin: '0 0 10px', color: 'var(--muted)', fontSize: 14, lineHeight: 1.55 }}>
                  {e}
                </p>
              ))}

              <div style={{ height: 6 }} />
              <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: 15 }}>Languages</h3>
              <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 14, lineHeight: 1.55 }}>
                {profile.languages.join(' | ')}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="projects"
        title="Projects"
        subtitle="A small selection of web apps and sites I’ve worked on."
        right={
          <button className="btn btnSmall" type="button" onClick={() => navigate('/contact')}>
            Let’s talk
          </button>
        }
      >
        <div className="projectList">
          {profile.projects.map((p, idx) => (
            <Reveal key={p.title} delayMs={idx * 70}>
              <div className="card projectCard" role="article" aria-label={p.title}>
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
                <p className="projectDesc">{p.description}</p>
                <a className="projectLink" href={p.href} target="_blank" rel="noreferrer">
                  {p.hrefLabel} <span aria-hidden="true">-&gt;</span>
                  <span className="muted" style={{ marginLeft: 6 }}>
                    (opens new tab)
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills" subtitle="Animated meters and interaction-ready UI.">
        <div className="grid2">
          <Reveal>
            <div className="card" style={{ padding: 16 }}>
              <SkillMeters meters={profile.skills.meters} />
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: 15 }}>Skill focus</h3>
              <p style={{ margin: '10px 0 14px', color: 'var(--muted)', lineHeight: 1.55, fontSize: 14 }}>
                I express my skills through motion that supports clarity: progress fills, hover feedback, and
                section reveals that help the page feel responsive (while respecting reduced-motion preferences).
              </p>

              <div className="tagRow">
                {profile.skills.chips.map((c) => (
                  <div key={c} className="tag">
                    {c}
                  </div>
                ))}
              </div>

              <div style={{ height: 14 }} />
              <a className="btn btnSmall" href={profile.cvDownloadHref} download>
                Download CV <span aria-hidden="true">Down</span>
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="experience"
        title="Experience"
        subtitle="What I learned by building and shipping."
      >
        <div className="timeline">
          {profile.experience.map((e, idx) => (
            <Reveal key={`${e.company}-${e.timeframe}`} delayMs={idx * 70}>
              <div className="card timelineItem" role="article" aria-label={`${e.company} ${e.role}`}>
                <div className="timelineDot" aria-hidden="true" />
                <div className="timelineContent">
                  <h3 className="timelineCompany">{e.company}</h3>
                  <div className="timelineRole">{e.role}</div>
                  <div className="timelineMeta">{e.timeframe}</div>
                  <div className="timelineDesc">{e.description}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <footer className="footer">
        Built with React + SCSS. Dark-first design, subtle animations, and a minimal layout.
      </footer>
    </main>
  )
}


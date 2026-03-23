import { useMemo, useState } from 'react'
import { profile } from '../data/profile'
import Section from '../components/Section/Section'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const mailtoHref = useMemo(() => {
    const subject = `Portfolio inquiry from ${name || 'someone'}`
    const body = [
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      '',
      message || '-',
      '',
      'Sent from the portfolio website.',
    ].join('\n')

    return `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }, [email, message, name])

  return (
    <main className="page">
      <Section
        title="Contact"
        subtitle="No backend needed: the form opens your email client with a prefilled message."
      >
        <div className="grid2">
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: 15 }}>
              Send a message
            </h3>
            <div style={{ height: 10 }} />

            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = mailtoHref
              }}
            >
              <div className="field">
                <div className="label">Your name</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex"
                  autoComplete="name"
                />
              </div>

              <div className="field">
                <div className="label">Your email</div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@email.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div className="field">
                <div className="label">Message</div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you’re building and what you need help with."
                />
              </div>

              <div className="helperRow">
                <div>Opens your mail app.</div>
                <div style={{ fontFamily: 'var(--mono)' }}>{profile.email}</div>
              </div>

              <button className="btn btnPrimary" type="submit">
                Open email <span aria-hidden="true">-&gt;</span>
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: 15 }}>
              Links
            </h3>
            <div style={{ height: 12 }} />
            <div className="pillRow" style={{ marginTop: 0 }}>
              {profile.links.map((l) => (
                <a
                  key={l.href}
                  className="btn btnSmall"
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.label} <span aria-hidden="true">-&gt;</span>
                </a>
              ))}
            </div>

            <div style={{ height: 18 }} />
            <a className="btn btnSmall" href={profile.cvDownloadHref} download>
              Download CV <span aria-hidden="true">Down</span>
            </a>
          </div>
        </div>
      </Section>
    </main>
  )
}


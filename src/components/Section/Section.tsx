import type { ReactNode } from 'react'

export default function Section({
  id,
  title,
  subtitle,
  right,
  children,
}: {
  id?: string
  title: string
  subtitle?: string
  right?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="sectionHeader">
          <div>
            <h2 className="sectionTitle">{title}</h2>
            {subtitle ? <p className="sectionSubtitle">{subtitle}</p> : null}
          </div>
          {right ? <div>{right}</div> : null}
        </div>
        {children}
      </div>
    </section>
  )
}


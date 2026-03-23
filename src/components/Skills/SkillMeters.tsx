import { useEffect, useRef, useState } from 'react'
import type { SkillMeter } from '../../data/profile'

export default function SkillMeters({ meters }: { meters: SkillMeter[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="meterList" aria-label="Skills meters">
      {meters.map((m) => (
        <div key={m.label} className={`meter ${visible ? 'isVisible' : ''}`}>
          <div className="meterLabelRow">
            <div className="meterLabel">{m.label}</div>
            <div className="meterValue">{m.value}%</div>
          </div>
          <div className="meterBar" aria-hidden="true">
            <div className="meterFill" />
          </div>
        </div>
      ))}
    </div>
  )
}


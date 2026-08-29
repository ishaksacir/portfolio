import { memo, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './LogoLoop.module.css';

export interface LogoItem { node: ReactNode; title: string; href?: string }
interface LogoLoopProps { logos: LogoItem[]; speed?: number; gap?: number; hoverSpeed?: number; scaleOnHover?: boolean; ariaLabel?: string }

const LogoLoop = memo(({ logos, speed = 65, gap = 64, hoverSpeed = 0, scaleOnHover = true, ariaLabel = 'Technologies I work with' }: LogoLoopProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let frame = 0;
    const animate = (time: number) => {
      const track = trackRef.current;
      const width = sequenceRef.current?.getBoundingClientRect().width ?? 0;
      if (lastTimeRef.current !== null && width > 0) {
        const velocity = hovered ? hoverSpeed : speed;
        offsetRef.current = (offsetRef.current + velocity * Math.min((time - lastTimeRef.current) / 1000, .05)) % width;
        if (track) track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      lastTimeRef.current = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); lastTimeRef.current = null; };
  }, [speed, hoverSpeed, hovered]);

  const list = (copy: number) => <ul className={styles.list} ref={copy === 0 ? sequenceRef : undefined} aria-hidden={copy > 0} style={{ '--logo-gap': `${gap}px` } as CSSProperties}>
    {logos.map((logo, index) => <li key={`${copy}-${index}`} className={scaleOnHover ? styles.scale : ''}>
      <a href={logo.href} target="_blank" rel="noreferrer" aria-label={logo.title}><span className={styles.icon}>{logo.node}</span><span>{logo.title}</span></a>
    </li>)}
  </ul>;

  return <div className={styles.root} role="region" aria-label={ariaLabel}><div className={styles.track} ref={trackRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{[0,1,2,3].map(list)}</div></div>;
});
LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;

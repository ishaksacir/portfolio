import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollFloat.module.css';

gsap.registerPlugin(ScrollTrigger);

type ScrollFloatProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom-=8%',
  scrollEnd = 'center center',
  stagger = 0.03,
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('\n').map((line, lineIndex) => (
      <span className={styles.line} key={lineIndex}>
        {line.split('').map((char, charIndex) => (
          <span className={styles.char} key={`${lineIndex}-${charIndex}`}>
            {char === ' ' ? '\u00a0' : char}
          </span>
        ))}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(element.querySelectorAll(`.${styles.char}`), { opacity: 1, clearProps: 'transform' });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element.querySelectorAll(`.${styles.char}`),
        { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%', willChange: 'opacity, transform' },
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          duration: animationDuration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: element,
            scroller: scrollContainerRef?.current || undefined,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`${styles.root} ${containerClassName}`}>
      <span className={`${styles.text} ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;

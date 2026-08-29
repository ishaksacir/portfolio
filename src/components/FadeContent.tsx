import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FadeContentProps = {
  children: ReactNode;
  as?: ElementType;
  container?: Element | string | null;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: CSSProperties;
};

const seconds = (value: number) => value > 10 ? value / 1000 : value;

export default function FadeContent({ children, as: Component = 'div', container, blur = true, duration = 900, ease = 'power2.out', delay = 0, threshold = 0.1, initialOpacity = 0, disappearAfter = 0, disappearDuration = 0.5, disappearEase = 'power2.in', onComplete, onDisappearanceComplete, className = '', style }: FadeContentProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(element, { autoAlpha: 1, filter: 'blur(0px)' });
      return;
    }

    const scroller = typeof container === 'string' ? document.querySelector(container) : container || document.getElementById('snap-main-container');
    gsap.set(element, { autoAlpha: initialOpacity, filter: blur ? 'blur(10px)' : 'blur(0px)', willChange: 'opacity, filter, transform' });

    const timeline = gsap.timeline({
      paused: true,
      delay: seconds(delay),
      onComplete: () => {
        onComplete?.();
        if (disappearAfter > 0) {
          gsap.to(element, { autoAlpha: initialOpacity, filter: blur ? 'blur(10px)' : 'blur(0px)', delay: seconds(disappearAfter), duration: seconds(disappearDuration), ease: disappearEase, onComplete: onDisappearanceComplete });
        }
      },
    });

    timeline.to(element, { autoAlpha: 1, filter: 'blur(0px)', duration: seconds(duration), ease });
    const trigger = ScrollTrigger.create({ trigger: element, scroller: scroller || window, start: `top ${(1 - threshold) * 100}%`, once: true, onEnter: () => timeline.play() });

    return () => {
      trigger.kill();
      timeline.kill();
      gsap.killTweensOf(element);
    };
  }, [blur, container, delay, disappearAfter, disappearDuration, disappearEase, duration, ease, initialOpacity, onComplete, onDisappearanceComplete, threshold]);

  return <Component ref={ref} className={className} style={style}>{children}</Component>;
}

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import styles from './MagicBento.module.css';

interface Props { children:ReactNode; className?:string; glowColor?:string; spotlightRadius?:number; onCardClick?:(index:number)=>void }
export default function MagicBento({ children, className='', glowColor='255, 90, 36', spotlightRadius=260, onCardClick }:Props){
  const grid=useRef<HTMLDivElement>(null),spot=useRef<HTMLDivElement>(null);
  useEffect(()=>{const root=grid.current;if(!root)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||innerWidth<=768;const cards=Array.from(root.children).filter(el=>el!==spot.current) as HTMLElement[];
    cards.forEach(card=>{card.classList.add(styles.magic);card.style.setProperty('--magic-color',glowColor);card.style.setProperty('--magic-radius',`${spotlightRadius}px`)});
    const move=(e:PointerEvent)=>{const bounds=root.getBoundingClientRect();if(spot.current)gsap.to(spot.current,{x:e.clientX-bounds.left,y:e.clientY-bounds.top,opacity:1,duration:.18});cards.forEach(card=>{const r=card.getBoundingClientRect(),d=Math.max(0,Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2)-Math.max(r.width,r.height)/2);card.style.setProperty('--glow-x',`${(e.clientX-r.left)/r.width*100}%`);card.style.setProperty('--glow-y',`${(e.clientY-r.top)/r.height*100}%`);card.style.setProperty('--glow-intensity',String(Math.max(0,1-d/(spotlightRadius*.75))))})};
    const leave=()=>{if(spot.current)gsap.to(spot.current,{opacity:0,duration:.3});cards.forEach(card=>card.style.setProperty('--glow-intensity','0'))};
    const cardMove=(e:PointerEvent)=>{if(reduced)return;const card=e.currentTarget as HTMLElement,r=card.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;gsap.to(card,{x:x*.018,y:y*.018,rotateX:-y/r.height*3.5,rotateY:x/r.width*3.5,transformPerspective:1200,duration:.25})};
    const cardLeave=(e:PointerEvent)=>gsap.to(e.currentTarget,{x:0,y:0,rotateX:0,rotateY:0,duration:.35});
    const click=(e:MouseEvent)=>{e.preventDefault();const card=e.currentTarget as HTMLElement,index=cards.indexOf(card);onCardClick?.(index);if(reduced)return;const r=card.getBoundingClientRect(),size=Math.max(r.width,r.height)*1.5,ripple=document.createElement('i');ripple.className=styles.ripple;ripple.style.cssText=`left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;width:${size}px;height:${size}px;--magic-color:${glowColor}`;card.appendChild(ripple);gsap.fromTo(ripple,{scale:0,opacity:.65},{scale:1,opacity:0,duration:.75,onComplete:()=>ripple.remove()})};
    root.addEventListener('pointermove',move);root.addEventListener('pointerleave',leave);cards.forEach(card=>{card.addEventListener('pointermove',cardMove);card.addEventListener('pointerleave',cardLeave);card.addEventListener('click',click)});
    return()=>{root.removeEventListener('pointermove',move);root.removeEventListener('pointerleave',leave);cards.forEach(card=>{card.removeEventListener('pointermove',cardMove);card.removeEventListener('pointerleave',cardLeave);card.removeEventListener('click',click);gsap.killTweensOf(card)})};
  },[glowColor,spotlightRadius,onCardClick]);
  return <div ref={grid} className={`${styles.grid} ${className}`}>{children}</div>;
}

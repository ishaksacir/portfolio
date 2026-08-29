import styles from './Home.module.css';

const Arrow = () => <span aria-hidden="true">→</span>;
const Burst = ({ className = '' }: { className?: string }) => <span className={`${styles.burst} ${className}`} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</span>;

export const Home = () => (
  <main className={styles.canvas} id="top">
    <div className={styles.site}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top"><Burst /><strong>ISHAK</strong></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#journal">Journal</a><a href="#contact">Contact</a></nav>
        <a className={styles.cta} href="mailto:i.sacirbey@gmail.com">LET’S TALK <b><Arrow /></b></a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <h1>BUILDING<br />DIGITAL<br />EXPERIENCES</h1>
          <div className={styles.heroAside}><p>Clean code.<br />Bold design.<br />Real impact.</p><a href="#work" aria-label="Go to selected work"><Arrow /></a></div>
        </div>
        <div className={styles.geometry} aria-hidden="true"><span className={styles.redArch} /><span className={styles.greenHalf} /><span className={styles.blueCircle} /></div>
        <div className={styles.heroMeta}><span>01&nbsp; / &nbsp;SELECTED WORK</span><span>AVAILABLE FOR FREELANCE PROJECTS ●</span></div>
      </section>

      <section className={styles.spotlight} id="work">
        <p className={styles.redLabel}>PROJECT SPOTLIGHT</p>
        <div className={styles.project}>
          <div className={styles.device}>
            <div className={styles.dashboard}>
              <div className={styles.dashNav}><b>Overview</b><span>FuelFIT</span></div>
              <small>THIS WEEK</small><strong>12.4k</strong>
              <svg viewBox="0 0 300 86" role="img" aria-label="Rising activity chart"><path d="M2 72 L36 58 L68 64 L98 36 L132 52 L164 24 L196 44 L230 18 L266 52 L298 39" /><path className={styles.gridline} d="M0 20H300M0 48H300M0 76H300" /></svg>
              <div className={styles.metrics}><i /><span><b>Top Workouts</b><small>Upper Strength<br />HIIT Cardio</small></span><em>84%</em></div>
            </div>
            <span className={styles.orangeDot} />
          </div>
          <div className={styles.projectCopy}><h2>FuelFit</h2><p>Workout tracking app<br />with analytics and<br />progress charts.</p><a href="mailto:i.sacirbey@gmail.com?subject=FuelFit%20project" aria-label="Ask about FuelFit"><Arrow /></a></div>
          <dl className={styles.projectFacts}>
            <div><dt>TECH STACK</dt><dd>REACT &nbsp;/&nbsp; SUPABASE<br />CHARTS &nbsp;/&nbsp; TS</dd></div>
            <div><dt>YEAR</dt><dd className={styles.year}>2026</dd></div>
            <div><dt>ROLE</dt><dd>DEVELOPER</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.values} id="about">
        <article><span className={styles.valueCircle} /><div><h3>Clean code</h3><p>Maintainable and<br />scalable architecture.</p></div></article>
        <article><span className={styles.valueArch} /><div><h3>Bold design</h3><p>Intentional layouts<br />that communicate.</p></div></article>
        <article><span className={styles.valueHalf} /><div><h3>Real impact</h3><p>Products that solve<br />real problems.</p></div></article>
        <article><span className={styles.valueBurst}>✦</span><div><h3>Fast delivery</h3><p>Iterate quickly.<br />Ship confidently.</p></div></article>
      </section>

      <section className={styles.more} id="experience">
        <div><span>02 / EXPERIENCE</span><h2>LEARNING BY<br />BUILDING.</h2></div>
        <p>I’m Ishak, a developer and designer based in Sarajevo. My work combines strong visual direction with reliable frontend engineering.</p>
        <ul><li><b>2025 — NOW</b>Data Science & AI</li><li><b>2023 — 2025</b>Software Engineering</li><li><b>4+ YEARS</b>Practical experience</li></ul>
      </section>

      <section className={styles.contact} id="journal"><span>03 / WHAT’S NEXT?</span><h2>LET’S BUILD SOMETHING<br />WORTH REMEMBERING.</h2><a href="mailto:i.sacirbey@gmail.com">START A PROJECT <Arrow /></a></section>

      <footer className={styles.footer} id="contact"><span>© 2026 ISHAK &nbsp;·&nbsp; AVAILABLE FOR FREELANCE PROJECTS</span><nav><a href="https://github.com/ishaksacirbey" target="_blank" rel="noreferrer">GITHUB</a><a href="https://www.linkedin.com/in/ishaksacirbey" target="_blank" rel="noreferrer">LINKEDIN</a><a href="mailto:i.sacirbey@gmail.com">EMAIL</a></nav></footer>
    </div>
  </main>
);

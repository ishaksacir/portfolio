import { Kicker } from "../../components/common/Kicker";
import { ActionButton } from "../../components/common/ActionButton";
import { BrainPost } from "../../components/blog/BrainPost";
import { BLOG_POSTS } from "../../data/blog";
import {
  JOURNAL_ARCHIVE,
  JOURNAL_BOOSTED_ALL_TIME,
  JOURNAL_CATEGORY_COUNTS,
  JOURNAL_GUESTBOOK,
  JOURNAL_TAGS,
} from "../../data/journal";

export function Journal() {
  return (
    <main className="brain-page">
      <section className="brain-hero">
        <div>
          <Kicker>CHAPTER 06 — BRAIN DUMP · 14 ENTRIES · APPROXIMATELY</Kicker>
          <h1>
            BRAIN
            <br />
            DUMP
          </h1>
          <p>
            Half blog, half public notebook. Things I worked out the hard way,
            half-finished thoughts, and the occasional rant about CSS. No
            algorithms, no comments section—just lessons learned and an email
            line.
          </p>
          <div className="brain-filters">
            {JOURNAL_CATEGORY_COUNTS.map((entry) =>
              entry.active ? (
                <b key={entry.label}>{entry.label}</b>
              ) : (
                <span key={entry.label}>{entry.label}</span>
              ),
            )}
          </div>
        </div>
        <aside>
          <Kicker>THE ARC SO FAR</Kicker>
          <strong>01▮4827</strong>
          <dl>
            <div>
              <dt>LAST POST</dt>
              <dd>2 DAYS AGO</dd>
            </div>
            <div>
              <dt>MOST READ</dt>
              <dd>MOTION THAT SURVIVES</dd>
            </div>
            <div>
              <dt>MOOD</dt>
              <dd>EXPERIMENTAL</dd>
            </div>
          </dl>
          <b>ISSUE THE QUESTIONS →</b>
        </aside>
      </section>

      <section className="featured">
        <div>
          <div className="featured-meta">
            <b>FEATURED</b>
            <span>ENGINEERING · 12 MIN READ</span>
          </div>
          <h2>MOTION THAT SURVIVES A SLOW PHONE</h2>
          <div className="featured-foot">
            <span>ISSUE 01 · AUG 2026</span>
            <button>READ IT →</button>
          </div>
        </div>
        <div>
          <p>
            Every animation on this site runs on transform and opacity only.
            Here’s the budget I hold myself to, how I measure it, and the three
            patterns I keep reusing—with real numbers from a mid-range Android.
          </p>
          <pre>
            <code>
              {
                ".budget--motion {\n  paint: 2.4ms OK;\n  dropped-frames: 0;\n  ship: 60;\n}"
              }
            </code>
          </pre>
          <div className="tags">
            <em>GSAP</em>
            <em>PERFORMANCE</em>
            <em>CSS</em>
          </div>
        </div>
      </section>

      <div className="brain-content">
        <section className="posts">
          <div className="brain-sectionbar">
            <Kicker>THE FEED</Kicker>
            <span>NEWEST FIRST</span>
          </div>
          {BLOG_POSTS.map((post, index) => (
            <BrainPost post={post} index={index} key={post.title} />
          ))}
          <button className="load-more">LOAD 11 MORE ENTRIES ▼</button>
        </section>

        <aside className="brain-notes">
          <Kicker>GUESTBOOK · 3 NEW</Kicker>
          {JOURNAL_GUESTBOOK.map((entry) => (
            <blockquote key={entry.author}>
              {entry.message}
              <small>— {entry.author}</small>
            </blockquote>
          ))}

          <Kicker>TAG SOUP</Kicker>
          <div className="tag-soup">
            {JOURNAL_TAGS.map((tag, i) =>
              i % 2 === 0 ? (
                <b key={tag}>{tag}</b>
              ) : (
                <span key={tag}>{tag}</span>
              ),
            )}
          </div>

          <Kicker>WEBRING</Kicker>
          <div className="webring">
            <button>‹ PREV</button>
            <b>SMALL WEB</b>
            <button>NEXT ›</button>
          </div>
          <div className="web-badges">
            <span>BEST VIEWED IN ANY BROWSER</span>
            <b>RSS ✓</b>
            <em>NO COOKIES</em>
          </div>

          <Kicker>MOST BOOSTED, ALL TIME</Kicker>
          <ol className="boosted">
            {JOURNAL_BOOSTED_ALL_TIME.map((entry) => (
              <li key={entry.title}>
                <b>▲ {entry.boosts}</b>
                <span>{entry.title}</span>
              </li>
            ))}
          </ol>

          <Kicker>LEAVE A SHOUT</Kicker>
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea placeholder="SAY SOMETHING NICE, OR AT LEAST INTERESTING..." />
            <div>
              <small>140 CHARS MAX</small>
              <button>POST IT →</button>
            </div>
          </form>
        </aside>
      </div>

      <section className="post-archive">
        <div className="brain-sectionbar">
          <Kicker>THE ARCHIVE</Kicker>
          <span>LEAD TO MORE ENTRIES ↓</span>
        </div>
        {JOURNAL_ARCHIVE.map((entry) => (
          <article key={entry.title}>
            <span>{entry.date}</span>
            <h3>{entry.title}</h3>
            <b>{entry.category}</b>
            <em>{entry.minutesToRead}</em>
            <button>▸</button>
          </article>
        ))}
      </section>

      <section className="newsletter">
        <div>
          <h2>ONE EMAIL A MONTH</h2>
          <p>
            New entries and the occasional build log, delivered by a single
            human. No sponsors, no tracking, no threads.
          </p>
          <input placeholder="YOUR@EMAIL.COM" />
          <ActionButton>SUBSCRIBE</ActionButton>
        </div>
        <aside>
          ✦ <small>STAY CURIOUS.</small>
        </aside>
      </section>
    </main>
  );
}

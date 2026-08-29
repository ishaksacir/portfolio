import type { BlogPost } from "../../data/blog";

interface BrainPostProps {
  post: BlogPost;
  index: number;
  /** Home's preview links back to the full Journal; the Journal feed itself has nowhere further to go. */
  onOpen?: () => void;
}

export function BrainPost({ post, index, onOpen }: BrainPostProps) {
  return (
    <article className={`brain-post brain-post-${index}`}>
      <div className="brain-post-meta">
        <b>✦</b>
        <span>
          @ISHAK　·　{post.postedAgo}　·　{post.category}
        </span>
        <em>{post.minutesToRead} MIN</em>
      </div>
      <div className="brain-post-body">
        <h3>{post.title}</h3>
        {post.quote ? (
          <blockquote>“{post.quote}”</blockquote>
        ) : (
          <p>{post.excerpt}</p>
        )}
        {post.accentSwatches && (
          <div className="brain-swatches">
            {post.accentSwatches.map((color) => (
              <i style={{ background: color }} key={color} />
            ))}
          </div>
        )}
        {post.codeSnippet && (
          <pre>
            <code>{post.codeSnippet}</code>
          </pre>
        )}
      </div>
      <div className="post-foot">
        <span>
          <b>▲ {post.boosts}</b>
          <b>⌕ {post.comments}</b>
          <b>★</b>
        </span>
        <button onClick={onOpen}>
          {post.quote ? "NO POST — JUST A THOUGHT" : "OPEN ENTRY →"}
        </button>
      </div>
    </article>
  );
}

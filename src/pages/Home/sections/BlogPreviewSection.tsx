import { Kicker } from "../../../components/common/Kicker";
import { ActionButton } from "../../../components/common/ActionButton";
import { BrainPost } from "../../../components/blog/BrainPost";
import { navigateTo } from "../../../hooks/useHashRoute";
import { BLOG_POSTS } from "../../../data/blog";

export function BlogPreviewSection() {
  return (
    <section className="homeblog">
      <div className="homeblog-head">
        <div>
          <Kicker>03 — FROM THE BLOG</Kicker>
          <h2>NOTES ON BUILDING</h2>
        </div>
        <ActionButton onClick={() => navigateTo("journal")}>
          VIEW ALL POSTS
        </ActionButton>
      </div>
      <div className="brain-page homeblog-preview">
        <section className="posts">
          {BLOG_POSTS.map((post, index) => (
            <BrainPost
              post={post}
              index={index}
              onOpen={() => navigateTo("journal")}
              key={post.title}
            />
          ))}
        </section>
      </div>
    </section>
  );
}

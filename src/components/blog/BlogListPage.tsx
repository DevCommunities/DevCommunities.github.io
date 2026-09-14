import { motion } from "framer-motion";
import { blogPosts, formatBlogDate } from "../../lib/blog";
import { Heading } from "../services/shared";

export default function BlogListPage() {
  return (
    <section className="dc-section">
      <Heading eyebrow="BLOG" title="บล็อก DevCommu">
        บทความ ข่าวสาร และอัปเดตจากทีม DevCommu
      </Heading>

      <div className="dc-blog-grid">
        {blogPosts.map((post, i) => (
          <motion.a
            key={post.slug}
            href={`/blog/${post.slug}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="dc-blog-card"
          >
            {post.image && (
              <div className="dc-blog-card-img">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <div className="dc-blog-card-body">
              <div className="dc-blog-card-meta">
                <span className="dc-blog-tag">{post.category}</span>
                <span className="dc-blog-date">
                  {formatBlogDate(post.date)}
                </span>
              </div>
              <h2 className="dc-blog-card-title">{post.title}</h2>
              <p className="dc-blog-card-desc">{post.description}</p>
              <div className="dc-blog-card-footer">
                <span className="dc-blog-author">{post.author}</span>
                <span className="dc-blog-reading-time">
                  {post.readingTime}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

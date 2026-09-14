import { motion } from "framer-motion";
import { formatBlogDate, type BlogPost } from "../../lib/blog";

function renderMarkdown(md: string): string {
  let html = md;

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr/>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Unordered lists (- item)
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Ordered lists (1. item)
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Paragraphs (double newline)
  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<li')
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  return html;
}

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const contentHtml = renderMarkdown(post.content);

  return (
    <motion.article
      className="dc-blog-post"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <a href="/blog" className="dc-blog-back">
        &larr; กลับไปหน้าบล็อก
      </a>

      <header className="dc-blog-post-header">
        <div className="dc-blog-post-meta">
          <span className="dc-blog-tag">{post.category}</span>
          <span className="dc-blog-date">{formatBlogDate(post.date)}</span>
          <span className="dc-blog-reading-time">{post.readingTime}</span>
        </div>
        <h1 className="dc-blog-post-title">{post.title}</h1>
        <p className="dc-blog-post-desc">{post.description}</p>
        <div className="dc-blog-post-author-row">
          <div>
            <span className="dc-blog-author">{post.author}</span>
            <span className="dc-blog-author-role">{post.authorRole}</span>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="dc-blog-post-hero">
          <img
            src={post.image}
            alt={post.title}
            loading="eager"
            decoding="async"
          />
        </div>
      )}

      <div
        className="dc-blog-post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <footer className="dc-blog-post-footer">
        <div className="dc-blog-post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="dc-blog-tag dc-blog-tag--sm">
              {tag}
            </span>
          ))}
        </div>
        <a href="/blog" className="dc-blog-back">
          &larr; กลับไปหน้าบล็อก
        </a>
      </footer>
    </motion.article>
  );
}

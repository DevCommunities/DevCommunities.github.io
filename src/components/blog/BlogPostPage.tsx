import { motion } from "framer-motion";
import { formatBlogDate, type BlogPost } from "../../lib/blog";

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInline(text: string): string {
  let s = text;
  // Inline code
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic (but not inside links)
  s = s.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, '<em>$1</em>');
  // Links
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label: string, href: string) => {
      const isInternal = href.startsWith('/');
      const attrs = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `<a href="${href}"${attrs}>${label}</a>`;
    }
  );
  return s;
}

function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === '') { i++; continue; }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      out.push('<hr/>');
      i++;
      continue;
    }

    // Headings
    const h3 = line.match(/^### (.+)$/);
    if (h3) { out.push(`<h3>${renderInline(h3[1])}</h3>`); i++; continue; }
    const h2 = line.match(/^## (.+)$/);
    if (h2) { out.push(`<h2>${renderInline(h2[1])}</h2>`); i++; continue; }
    const h1 = line.match(/^# (.+)$/);
    if (h1) { out.push(`<h1>${renderInline(h1[1])}</h1>`); i++; continue; }

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++; // skip closing ```
      const cls = lang ? ` class="language-${lang}"` : '';
      out.push(`<pre><code${cls}>${codeLines.join('\n')}</code></pre>`);
      continue;
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableRows.push(lines[i]);
        i++;
      }
      if (tableRows.length >= 2) {
        const parseRow = (row: string) =>
          row.split('|').slice(1, -1).map((c) => c.trim());
        const headerCells = parseRow(tableRows[0]);
        // skip separator row (row index 1)
        const bodyRows = tableRows.slice(2);
        let tableHtml = '<div class="dc-blog-table-wrap"><table><thead><tr>';
        for (const cell of headerCells) {
          tableHtml += `<th>${renderInline(cell)}</th>`;
        }
        tableHtml += '</tr></thead><tbody>';
        for (const row of bodyRows) {
          const cells = parseRow(row);
          tableHtml += '<tr>';
          for (const cell of cells) {
            tableHtml += `<td>${renderInline(cell)}</td>`;
          }
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table></div>';
        out.push(tableHtml);
      }
      continue;
    }

    // Unordered list
    if (/^- .+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- .+/.test(lines[i])) {
        items.push(`<li>${renderInline(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\. .+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. .+/.test(lines[i])) {
        items.push(`<li>${renderInline(lines[i].replace(/^\d+\. /, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^#{1,3} /.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim()) &&
      !/^- /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !lines[i].trim().startsWith('```') &&
      !(lines[i].includes('|') && lines[i].trim().startsWith('|'))
    ) {
      pLines.push(renderInline(lines[i]));
      i++;
    }
    if (pLines.length) {
      out.push(`<p>${pLines.join('<br/>')}</p>`);
    }
  }

  return out.join('\n');
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

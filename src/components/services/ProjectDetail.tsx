import { type Story, safeUrl } from "../../lib/content";

export function ProjectDetail({ story }: { story: Story }) {
  // Parse details text to extract structured sections if available
  const paragraphs = (story.details || "").split("\n\n").filter(Boolean);

  return (
    <article className="dc-project-detail-view pb-16 font-lineSansTH">
      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <a
          href="/success#stories"
          className="dc-muted inline-flex items-center gap-2 hover:text-[#e57192] transition-colors font-medium text-sm"
        >
          <span>←</span>
          <span>ย้อนกลับไปหน้าผลงานและความสำเร็จ (Hall of Fame)</span>
        </a>
      </nav>

      {/* Header / Hero Information */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>✦</span>
          <span>STUDENT INNOVATION SHOWCASE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4 font-lineSansTH_XB">
          {story.name}
        </h1>
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <span className="text-base">👤</span>
            {story.institution}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5 text-[#e57192] font-semibold">
            <span className="text-base">🏆</span>
            {story.faculty}
          </span>
        </div>
      </header>

      {/* Project Cover Banner */}
      {story.image && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-900">
          <img
            src={safeUrl(story.image)}
            alt={story.name}
            className="w-full max-h-[520px] object-contain mx-auto block"
          />
        </div>
      )}

      {/* Result / Achievement Highlight Box */}
      {story.quote && (
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50/60 border border-pink-200/70 shadow-sm flex items-start gap-4">
          <div className="text-2xl sm:text-3xl shrink-0 p-2.5 rounded-xl bg-white shadow-sm text-[#e57192]">
            ⭐
          </div>
          <div>
            <strong className="block text-sm sm:text-base font-bold text-slate-900 mb-1">
              ผลที่ได้รับ & ความสำเร็จของโครงงาน
            </strong>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {story.quote.replace(/^ผลที่ได้รับ:\s*/i, "")}
            </p>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="dc-grid">
        {/* Main Detailed Content */}
        <section className="dc-card dc-detail-main space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-lineSansTH_XB pb-3 border-b border-slate-100 flex items-center gap-2">
            <span>📖</span>
            <span>รายละเอียดและการพัฒนาโครงงาน</span>
          </h2>

          <div className="dc-project-body text-slate-700 text-sm sm:text-base leading-relaxed space-y-5">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, idx) => {
                // Check if this paragraph is a list of features (contains •)
                if (p.includes("•")) {
                  const lines = p.split("\n");
                  const intro = lines[0];
                  const items = lines.slice(1);
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/70 space-y-3"
                    >
                      {intro && (
                        <h3 className="font-bold text-slate-900 text-base">
                          {intro}
                        </h3>
                      )}
                      <ul className="space-y-2 pl-2">
                        {items.map((item, itemIdx) => {
                          const cleanItem = item.replace(/^[•\-\*]\s*/, "");
                          const parts = cleanItem.split(":");
                          if (parts.length > 1) {
                            return (
                              <li key={itemIdx} className="flex items-start gap-2">
                                <span className="text-[#e57192] font-bold text-sm shrink-0 mt-0.5">
                                  ▸
                                </span>
                                <div>
                                  <strong className="text-slate-900">
                                    {parts[0]}:
                                  </strong>
                                  <span className="text-slate-600">
                                    {parts.slice(1).join(":")}
                                  </span>
                                </div>
                              </li>
                            );
                          }
                          return (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <span className="text-[#e57192] font-bold text-sm shrink-0 mt-0.5">
                                ▸
                              </span>
                              <span className="text-slate-700">{cleanItem}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                }

                // Check if paragraph is Tech Stack description
                if (p.startsWith("เทคโนโลยีหลักที่นำมาใช้ในระบบ:")) {
                  const content = p.replace("เทคโนโลยีหลักที่นำมาใช้ในระบบ:", "").trim();
                  return (
                    <div
                      key={idx}
                      className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-2"
                    >
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <span>🛠️</span>
                        <span>เทคโนโลยีหลักที่นำมาใช้ในระบบ</span>
                      </h3>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                        {content}
                      </p>
                    </div>
                  );
                }

                // Check if paragraph is Keywords
                if (p.includes("คำสำคัญ (Keywords):") || p.includes("คำสำคัญ:")) {
                  const keywordsText = p
                    .replace(/คำสำคัญ\s*(\(Keywords\))?:\s*/i, "")
                    .trim();
                  const tags = keywordsText.split(",").map((k) => k.trim()).filter(Boolean);
                  return (
                    <div
                      key={idx}
                      className="mt-6 pt-5 border-t border-slate-100 space-y-3"
                    >
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        คำสำคัญ (Keywords)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Standard narrative paragraph
                return (
                  <p key={idx} className="whitespace-pre-line">
                    {p}
                  </p>
                );
              })
            ) : (
              <p>{story.quote}</p>
            )}
          </div>
        </section>

        {/* Sidebar Info & Actions */}
        <aside className="space-y-6">
          {/* Project Summary Card */}
          <div className="dc-card space-y-4">
            <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 font-lineSansTH_XB">
              ข้อมูลโครงงาน
            </h3>

            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">
                ชื่อโครงงาน
              </span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">
                {story.name}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">
                ผู้พัฒนา
              </span>
              <p className="font-medium text-slate-800 text-sm mt-0.5">
                {story.institution}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase">
                เวที / หมวดหมู่
              </span>
              <p className="font-medium text-[#e57192] text-sm mt-0.5">
                {story.faculty}
              </p>
            </div>

            {safeUrl(story.url) && (
              <div className="pt-3 border-t border-slate-100">
                <a
                  href={safeUrl(story.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#e57192] hover:bg-[#d65f82] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>เยี่ยมชมเว็บไซต์จริง</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>

          {/* DevCommu Mentorship CTA */}
          <div className="dc-card bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3 p-6 rounded-2xl">
            <span className="inline-block text-xs font-bold px-2.5 py-1 rounded bg-[#e57192] text-white">
              PROJECT MENTORSHIP
            </span>
            <h4 className="text-lg font-bold font-lineSansTH_XB">
              อยากสร้างโครงงานระดับประเทศแบบนี้?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              DevCommu มีพี่ ๆ ติวเตอร์จาก CEDT จุฬาฯ และสถาบันชั้นนำ คอยไกด์ตั้งแต่การคิดหัวข้อ ออกแบบระบบ ไปจนถึงการโค้ดจริงและการทำ Portfolio เพื่อยื่น TCAS / แข่งขัน
            </p>
            <div className="pt-2 space-y-2">
              <a
                href="/tutoring"
                className="block w-full py-2.5 text-center rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                ดูรายละเอียดคอร์สเรียนส่วนตัว →
              </a>
              <a
                href="https://line.me/R/ti/p/@468httmq"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 text-center rounded-xl bg-[#06C755] text-white font-bold text-xs hover:bg-[#05b34c] transition-colors"
              >
                ปรึกษาพี่ ๆ ทาง LINE: @468httmq (ฟรี)
              </a>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

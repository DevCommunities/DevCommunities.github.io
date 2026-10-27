import { imageSize } from "../../lib/image-size";
import { FiArrowUpRight, FiArrowRight, FiLayers, FiCheck } from "react-icons/fi";
import { type Story, safeUrl, projectStatusLabel } from "../../lib/content";

export function ProjectDetail({ story }: { story: Story }) {

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
          <img {...imageSize(story.image)}
            src={safeUrl(story.image)}
            alt={story.name}
            className="w-full max-h-[520px] object-contain mx-auto block"
          />
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
            {story.projectSections?.map((section) => (
              <section key={section.title} className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul className="list-disc pl-5 space-y-3 marker:text-[#e57192]">
                    {section.items.map((item) => {
                      const separator = item.indexOf(":");
                      return (
                        <li key={item}>
                          {separator >= 0 ? <><strong>{item.slice(0, separator)}:</strong>{item.slice(separator + 1)}</> : item}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            ))}
            {!!story.keywords?.length && (
              <section className="pt-5 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-500">คำสำคัญ</h3>
                <div className="flex flex-wrap gap-2">
                  {story.keywords.map((keyword) => (
                    <span key={keyword} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">{keyword}</span>
                  ))}
                </div>
              </section>
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
              <span className="text-xs font-semibold text-slate-400 block uppercase">สถานะ</span>
              <p className="font-medium text-slate-800 text-sm mt-0.5">{projectStatusLabel(story)}</p>
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
                  <span><FiArrowUpRight aria-hidden="true" className="inline-block align-middle shrink-0" /></span>
                </a>
              </div>
            )}
          </div>

          <section id="project-mentorship" className="dc-project-mentor" aria-labelledby="project-mentor-title">
            <div className="dc-project-mentor-top">
              <span className="dc-project-mentor-icon"><FiLayers aria-hidden="true" /></span>
              <span className="dc-project-mentor-label">PROJECT MENTORSHIP</span>
            </div>
            <h3 id="project-mentor-title">มีไอเดียแล้ว<br />มาสร้างไปด้วยกัน</h3>
            <p className="dc-project-mentor-intro">
              พี่ ๆ DevCommu ช่วยวางทางให้โปรเจกต์ของน้อง ตั้งแต่จุดเริ่มต้นจนพร้อมเล่าในพอร์ต
            </p>
            <ul className="dc-project-mentor-list">
              <li><FiCheck aria-hidden="true" /><span>หาโจทย์และวางแผนโปรเจกต์</span></li>
              <li><FiCheck aria-hidden="true" /><span>ลงมือพัฒนา พร้อมคำแนะนำ</span></li>
              <li><FiCheck aria-hidden="true" /><span>เตรียมผลงานสำหรับพอร์ตและแข่งขัน</span></li>
            </ul>
            <a
              href="https://line.me/R/ti/p/@468httmq"
              target="_blank"
              rel="noopener noreferrer"
              className="dc-project-mentor-primary"
            >
              <span>คุยไอเดียกับพี่ ๆ ฟรี</span><FiArrowUpRight aria-hidden="true" />
            </a>
            <a href="/tutoring" className="dc-project-mentor-secondary">
              ดูการเรียนแบบตัวต่อตัว<FiArrowRight aria-hidden="true" />
            </a>
          </section>
        </aside>
      </div>
    </article>
  );
}

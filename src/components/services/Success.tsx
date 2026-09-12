import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stats, stories, safeUrl, tutors, type Story } from "../../lib/content";
import { Card } from "./shared";
const labels: Record<string, string> = {
  university: "เส้นทางมหาวิทยาลัย",
  award: "สนามแข่งขัน",
  project: "โปรเจกต์ของผู้เรียน",
};

export function StudentModal({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="dc-student-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`หน้าต่างโชว์หน้าน้อง ${story.name}`}
    >
      <div
        className="dc-student-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="dc-student-modal-close"
          onClick={onClose}
          aria-label="ปิดหน้าต่างภาพ"
        >
          ✕
        </button>
        <div className="dc-student-modal-img-container">
          <img
            src={safeUrl(story.image)}
            alt={story.name}
            className="dc-student-modal-img"
            style={
              story.objectPosition
                ? ({
                    "--student-obj-pos": story.objectPosition,
                    objectPosition: story.objectPosition,
                  } as React.CSSProperties)
                : undefined
            }
          />
        </div>
        <div className="dc-student-modal-body">
          <span className="dc-story-category">{labels[story.category]}</span>
          <h3>{story.name}</h3>
          <p className="dc-story-result">{story.institution}</p>
          <p className="dc-small">{story.faculty}</p>
          {story.quote && (
            <p className="dc-muted mt-3 italic text-sm">“{story.quote}”</p>
          )}
          {story.details && (
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-2">
              {story.details}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StoryArt({
  story,
  onOpenModal,
}: {
  story: Story;
  onOpenModal?: (story: Story) => void;
}) {
  const isProject = story.category === "project";
  if (safeUrl(story.image))
    return (
      <div
        className={`dc-student-window ${isProject ? "dc-project-window" : ""}`}
        onClick={() => onOpenModal?.(story)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenModal?.(story);
          }
        }}
        title={`คลิกเพื่อดูหน้าต่างโชว์${isProject ? "ภาพโครงงาน" : "หน้าน้อง"} ${story.name} ขนาดใหญ่`}
      >
        {isProject && (
          <div className="dc-project-window-bar">
            <div className="dc-mockup-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <span className="dc-project-mockup-url">
              {story.slug ? `${story.slug}.app` : "project.app"}
            </span>
            <span className="dc-project-mockup-tag">WEB APP</span>
          </div>
        )}
        <img
          className={`dc-cover ${isProject ? "dc-project-cover" : "dc-student-cover"}`}
          src={safeUrl(story.image)}
          alt={story.name}
          loading="lazy"
          decoding="async"
          style={
            story.objectPosition
              ? ({
                  "--student-obj-pos": story.objectPosition,
                  objectPosition: story.objectPosition,
                } as React.CSSProperties)
              : undefined
          }
        />
        <div className="dc-student-window-badge">
          <span>🔍 ขยายดูรูป</span>
        </div>
      </div>
    );
  return (
    <div
      className={"dc-story-art dc-story-" + story.category}
      aria-hidden="true"
    >
      {story.category === "project" ? (
        <div className="dc-mini-app">
          <div className="dc-window-dots">
            ● ● ● <span>{story.name}</span>
          </div>
          <strong>
            {story.name === "Study Buddy" ? "Make time." : "Build something."}
            <br />
            {story.name === "Study Buddy"
              ? "Make progress."
              : "Make a difference."}
          </strong>
          <div className="dc-mini-bars">
            <i />
            <i />
            <i />
          </div>
          <small>DESIGNED & BUILT BY STUDENTS</small>
        </div>
      ) : (
        <>
          <span className="dc-art-symbol">
            {story.category === "university" ? "✳" : "✦"}
          </span>
          <div className="dc-art-caption">
            <small>
              {story.category === "university"
                ? "THE NEXT CHAPTER"
                : "BEYOND THE CLASSROOM"}
            </small>
            <strong>
              {story.category === "university"
                ? "ก้าวต่อไป\nในแบบของเรา"
                : "ลองให้สุด\nไปให้ไกล"}
            </strong>
          </div>
        </>
      )}
    </div>
  );
}
function StoryCard({
  story: s,
  onOpenModal,
}: {
  story: Story;
  onOpenModal?: (story: Story) => void;
}) {
  const isProject = s.category === "project";
  const [projectTitle, projectTagline] =
    isProject && s.name.includes(" - ")
      ? s.name.split(" - ")
      : [s.name, ""];

  return (
    <Card className={`dc-story-card flex flex-col justify-between ${isProject ? "dc-story-card-project" : ""}`}>
      <div>
        <StoryArt story={s} onOpenModal={onOpenModal} />
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="dc-story-category">
            {labels[s.category]}
          </span>
          {isProject && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              Live App
            </span>
          )}
        </div>

        <h3 className="dc-story-title">
          {isProject ? projectTitle : s.name}
        </h3>

        {isProject ? (
          <>
            <p className="dc-story-result font-semibold text-slate-800">
              {projectTagline || s.faculty}
            </p>
            <p className="dc-small text-slate-500">
              👤 {s.institution}
            </p>
          </>
        ) : (
          <>
            <p className="dc-story-result">{s.institution}</p>
            <p className="dc-small">{s.faculty}</p>
          </>
        )}

        <p className="dc-muted mt-3 text-sm leading-relaxed">
          {isProject ? s.quote : `“${s.quote}”`}
        </p>
      </div>

      {isProject ? (
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <a
            href={`/projects/${s.slug || s.id.replace("story-proj-", "")}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e57192] hover:text-[#d65f82] transition-all group/link"
          >
            <span>ดูรายละเอียดโครงงาน</span>
            <span className="transition-transform group-hover/link:translate-x-1">→</span>
          </a>
          {safeUrl(s.url) && (
            <a
              href={safeUrl(s.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-700 hover:bg-pink-50 hover:text-[#e57192] transition-colors border border-slate-200/60"
            >
              <span>เปิดเว็บจริง</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
        </div>
      ) : (
        safeUrl(s.url) && (
          <div className="mt-4 pt-3 border-t border-slate-100/60">
            <a
              className="dc-text-link inline-block font-semibold"
              href={safeUrl(s.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              ดูผลงาน ↗
            </a>
          </div>
        )
      )}
    </Card>
  );
}
export function Statistics() {
  return (
    <section className="dc-proof">
      <div className="dc-stats">
        {stats.map((s) => (
          <div className="dc-stat" key={s.id}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export function StoryCards({ preview = false }: { preview?: boolean }) {
  const [modalStory, setModalStory] = useState<Story | null>(null);
  const previewItems = [
    stories[0], // น้องพร้อม
    stories.find((s) => s.id === "story-award-jewelry"), // น้องจิวเวอรี่ (Change Innovation)
    stories.find((s) => s.id === "story-proj-sabaijai"), // Sabaijai
  ].filter(Boolean) as Story[];

  return (
    <>
      <div className="dc-grid">
        {(preview ? previewItems : stories)
          .filter(Boolean)
          .map((s) => (
            <StoryCard
              story={s}
              key={s.id}
              onOpenModal={(story) => setModalStory(story)}
            />
          ))}
      </div>
      {modalStory && (
        <StudentModal story={modalStory} onClose={() => setModalStory(null)} />
      )}
    </>
  );
}
export function Success() {
  const [filter, setFilter] = useState("university");
  const [modalStory, setModalStory] = useState<Story | null>(null);
  const featured = stories[0];
  const shown = stories.filter((s) => s.category === filter);
  return (
    <>
      <header className="dc-success-intro">
        <div>
          <p className="dc-eyebrow">THE NEXT CHAPTER / HALL OF FAME</p>
          <h1>
            เริ่มจากความชอบ
            <br />
            ต่อยอดเป็น<span>ความภูมิใจ</span>
          </h1>
        </div>
        <p className="dc-muted">
          มหาวิทยาลัยที่อยากเข้า โจทย์ที่อยากชนะ
          <br />
          และโปรเจกต์ที่อยากสร้าง
          <br />
          ทุกเส้นทางเริ่มจากการลงมือทำ
        </p>
      </header>
      <motion.section whileHover={{ y: -3 }} className="dc-feature-story">
        <div className="dc-feature-visual" aria-hidden="true">
          <span className="dc-feature-sticker">
            FROM FIRST LINE
            <br />
            TO NEXT CHAPTER ↗
          </span>
          <div className="dc-feature-code">
            &lt;dream&gt;
            <br />
            <span>ลงมือทำ</span>
            <br />
            &lt;/dream&gt;
          </div>
          <small>DEVCOMMU STUDENT STORIES</small>
        </div>
        <div className="dc-feature-copy">
          <p className="dc-eyebrow">STUDENT STORY / 01</p>
          <h2>
            จาก “เริ่มตรงไหนดี”
            <br />
            สู่พอร์ตที่เล่าเรื่องตัวเองได้
          </h2>
          <blockquote>“{featured.quote}”</blockquote>
          <div className="dc-student-sign">
            <span>{featured.name.slice(0, 1)}</span>
            <div>
              <strong>{featured.name}</strong>
              <p>{featured.faculty} · {featured.institution}</p>
            </div>
          </div>
          <a className="dc-text-link" href="#stories">
            ดูเส้นทางของผู้เรียน ↓
          </a>
        </div>
      </motion.section>
      <section id="stories" className="dc-section">
        <div className="dc-section-top">
          <div>
            <p className="dc-eyebrow">MANY PATHS. YOUR FUTURE.</p>
            <h2>ความสำเร็จมีได้หลายแบบ</h2>
          </div>
        </div>
        <div className="dc-story-filters" aria-label="เลือกประเภทความสำเร็จ">
          {Object.entries(labels).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
            >
              {label}
              <span>
                {stories
                  .filter((s) => s.category === id)
                  .length.toString()
                  .padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          แสดง {labels[filter]} {shown.length} เรื่อง
        </p>
        <div className="dc-grid" key={filter}>
          {shown.map((s) => (
            <StoryCard
              story={s}
              key={s.id}
              onOpenModal={(story) => setModalStory(story)}
            />
          ))}
        </div>
      </section>
      {modalStory && (
        <StudentModal story={modalStory} onClose={() => setModalStory(null)} />
      )}
      <NextStep />
    </>
  );
}
export function NextStep() {
  return (
    <section className="dc-next-step">
      <div>
        <p className="dc-eyebrow">YOUR TURN TO BUILD</p>
        <h2>
          เรื่องต่อไป
          <br />
          อาจเป็น<span>เรื่องของคุณ</span>
        </h2>
        <p>เริ่มจากสิ่งที่สนใจ แล้วมาลงมือทำด้วยกัน</p>
      </div>
      <div className="dc-next-actions">
        <a href="/bootcamps" className="dc-btn">
          เลือกค่ายที่สนใจ ↗
        </a>
        <a href="/tutoring" className="dc-text-link">
          ปรึกษาเรื่องเรียนตัวต่อตัว →
        </a>
      </div>
    </section>
  );
}
export function HomeAdditions() {
  return (
    <div className="dc dc-home">
      <Statistics />
      <section className="dc-section dc-path-section">
        <div className="dc-section-top">
          <div>
            <p className="dc-eyebrow">01 / FIND YOUR WAY</p>
            <h2>
              เป้าหมายต่างกัน
              <br />
              เลือกวิธีเรียนที่ใช่สำหรับคุณ
            </h2>
          </div>
          <p className="dc-muted">
            ไม่ต้องเก่งมาก่อน
            <br />
            แค่รู้ว่าอยากเริ่ม เราช่วยต่อยอดให้
          </p>
        </div>
        <div className="dc-path-grid">
          <motion.a
            whileHover={{ y: -6 }}
            className="dc-path dc-path-camp"
            href="/bootcamps"
          >
            <div className="dc-path-top">
              <span>ค่ายรายเดือน</span>
              <b>↗</b>
            </div>
            <h3>
              Bootcamp<span>ลงมือทำไปกับเพื่อน</span>
            </h3>
            <p>
              เรียนเข้มข้นผ่านโปรเจกต์ มีพี่ ๆ คอยช่วย
              <br />
              พร้อมเพื่อนใหม่ที่สนใจเหมือนกัน
            </p>
            <div className="dc-path-bottom">
              <span>Web · AI · IoT</span>
              <strong>สำรวจค่าย →</strong>
            </div>
            <img src="/images/decor/arduino.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </motion.a>
          <motion.a
            whileHover={{ y: -6 }}
            className="dc-path dc-path-private"
            href="/tutoring"
          >
            <div className="dc-path-top">
              <span>เรียนส่วนตัวกับพี่ๆ</span>
              <b>↗</b>
            </div>
            <h3>
              Private tutoring<span>โฟกัสเป้าหมายของคุณ</span>
            </h3>
            <p>
              วางแผนการเรียนกับผู้สอน ตั้งแต่พื้นฐาน
              <br />
              Datasci-AI, Web, POSN ไปจนถึง Consult Project
            </p>
            <div className="dc-path-bottom">
              <span>พื้นฐาน · AI · Web · สอวน. · Project</span>
              <strong>ค้นหาผู้สอน →</strong>
            </div>
            <img src="/images/decor/keyboard.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </motion.a>
          <motion.a
            whileHover={{ y: -6 }}
            className="dc-path dc-path-portfolio"
            href="/tutoring"
          >
            <div className="dc-path-top">
              <span className="inline-flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#e57192] animate-pulse" />
                <span>ปรึกษารอบพอร์ต · TCAS รอบ 1</span>
              </span>
              <b>↗</b>
            </div>
            <h3>
              Portfolio Consult<span>ปรึกษารอบพอร์ต วางแผนคณะในฝัน</span>
            </h3>
            <p className="max-w-2xl text-slate-300">
              วางแผน Roadmap สะสมผลงาน ออกแบบโครงงาน AI / Web ที่ตอบโจทย์เกณฑ์คณะ และเกลา Storytelling ในเล่มพอร์ต
              <br className="hidden md:inline" />
              {" "}ให้คำปรึกษาเจาะลึกแบบตัวต่อตัวกับรุ่นพี่ CEDT และวิศวะคอมฯ จุฬาฯ เตรียมพร้อมยื่น TCAS รอบ 1 อย่างมั่นใจ
            </p>
            <div className="dc-portfolio-badges">
              <span className="dc-portfolio-badge">🎯 วางแผน Roadmap ผลงานรายบุคคล</span>
              <span className="dc-portfolio-badge">💡 ให้คำปรึกษาไอเดีย & พัฒนาโครงงานเด่น</span>
              <span className="dc-portfolio-badge">📖 ตรวจเช็ก Storytelling & ซ้อมสัมภาษณ์</span>
            </div>
            <div className="dc-path-bottom">
              <span>TCAS 1 · CEDT จุฬาฯ · วิศวะคอมฯ · IT & นวัตกรรม</span>
              <strong>ปรึกษาทำพอร์ตกับพี่ ๆ →</strong>
            </div>
            <img src="/images/decor/portfolio-doc.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </motion.a>
        </div>
      </section>
      <section className="dc-mentor-strip">
        <div className="dc-mentor-faces">
          {tutors.slice(0, 5).map((t) => (
            <img src={t.image} alt={t.name} key={t.id} loading="lazy" decoding="async" />
          ))}
        </div>
        <div>
          <p className="dc-eyebrow">YOU DON'T HAVE TO BUILD ALONE</p>
          <h2>ติดตรงไหน มีพี่ ๆ ช่วยคิด</h2>
          <p className="dc-muted">
            รู้จักผู้สอนและความถนัด ก่อนเริ่มเรียนด้วยกัน
          </p>
        </div>
        <a className="dc-text-link" href="/team">
          รู้จักทีมผู้สอน ↗
        </a>
      </section>
      <section className="dc-section">
        <div className="dc-section-top">
          <div>
            <p className="dc-eyebrow">02 / MADE BY OUR STUDENTS</p>
            <h2>เรียนแล้ว ไปต่อได้แค่ไหน?</h2>
          </div>
          <a className="dc-text-link" href="/success">
            ดูเรื่องราวทั้งหมด ↗
          </a>
        </div>
        <StoryCards preview />
      </section>
    </div>
  );
}

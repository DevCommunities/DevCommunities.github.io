import { useState } from "react";
import { motion } from "framer-motion";
import { camps, type Camp, safeUrl } from "../../lib/content";
import { Card, Heading, Notice } from "./shared";

function CampCard({ camp }: { camp: Camp }) {
  const isOpen = camp.status === "open";
  const formUrl = camp.formUrl || "https://forms.gle/ayjdkPbNDJPGfzKGA";
  const shortLocation =
    camp.location.includes("Zoom") || camp.location.includes("Online")
      ? "เรียน Online ผ่าน Zoom"
      : camp.location.split(" · ")[0];

  const cleanPrice = camp.price
    ? camp.price.replace(/\s*\([^)]*\)/g, "")
    : "ฟรี";

  return (
    <Card className="dc-camp-card">
      <div>
        {/* Poster Media with Floating Badges */}
        <div className="dc-camp-media">
          {camp.image ? (
            <img
              className="dc-camp-img"
              src={safeUrl(camp.image)}
              alt={camp.title}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className={
                "dc-mock-camp-art dc-mock-" + camp.category?.split(" ")[0]
              }
              style={{ minHeight: "100%", margin: 0 }}
              aria-hidden="true"
            >
              <small>DEVCOMMU / BOOTCAMP</small>
              <strong>
                {camp.category === "Web Dev"
                  ? "</>"
                  : camp.category === "AI/ML"
                    ? "AI_"
                    : "PLAY"}
              </strong>
              <span>{camp.category}</span>
            </div>
          )}

          {/* Floating Status Badge */}
          <div
            className={
              "dc-camp-badge-status " +
              (isOpen ? "dc-camp-badge-open" : "dc-camp-badge-closed")
            }
          >
            {isOpen && <span className="dc-camp-badge-dot" />}
            <span>{isOpen ? "เปิดรับสมัคร" : "ปิดรับสมัครแล้ว"}</span>
          </div>

          {/* Floating Category Badge */}
          {camp.category && (
            <span className="dc-camp-badge-cat">{camp.category}</span>
          )}
        </div>

        {/* Content Section */}
        <div className="dc-camp-content">
          <div className="dc-camp-meta-sub">
            <span className="highlight">{camp.year || 2026}</span>
            <span>•</span>
            <span className="truncate">{shortLocation}</span>
          </div>

          <h3 className="dc-camp-title">
            <a href={"/bootcamps/" + camp.id}>{camp.title}</a>
          </h3>

          <p className="dc-camp-desc">{camp.description}</p>
        </div>
      </div>

      <div>
        {/* Info Badges */}
        <div className="dc-camp-info-pills">
          <div className="dc-camp-meta-badge">
            <span>📅</span>
            <span className="truncate">{camp.schedule}</span>
          </div>

          {camp.notes && (
            <div className="dc-camp-urgent-badge">
              <span>⚡</span>
              <span className="truncate">{camp.notes}</span>
            </div>
          )}
        </div>

        {/* Footer: Price & CTA Button */}
        <div className="dc-camp-footer">
          <div className="dc-camp-price-box">
            <span className="dc-camp-price-label">
              {isOpen ? "ค่าสมัคร" : "ราคาในรอบนั้น"}
            </span>
            <span className="dc-camp-price-val">{cleanPrice}</span>
          </div>

          <div className="flex items-center gap-2">
            {isOpen && (
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-camp-btn dc-camp-btn-primary whitespace-nowrap"
                title="สมัครเข้าร่วมผ่าน Google Form ทันที"
              >
                <span>สมัครเลย ↗</span>
              </a>
            )}
            <a
              href={"/bootcamps/" + camp.id}
              className={
                "dc-camp-btn " +
                (isOpen ? "dc-camp-btn-secondary" : "dc-camp-btn-secondary")
              }
            >
              <span>ดูรายละเอียด</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l9.2-9.2M17 17V8H8" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function Bootcamps() {
  const [showAllClosed, setShowAllClosed] = useState(false);
  const INITIAL_CLOSED_COUNT = 5;
  const openCamps = camps.filter((camp) => camp.status === "open");
  const closedCamps = camps.filter((camp) => camp.status === "closed");
  const visibleClosedCamps = showAllClosed
    ? closedCamps
    : closedCamps.slice(0, INITIAL_CLOSED_COUNT);

  const handleToggleClosed = () => {
    if (showAllClosed) {
      setShowAllClosed(false);
      const el = document.getElementById("closed-camps");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setShowAllClosed(true);
    }
  };

  // Planned courses stay unpublished in this two-section enrollment listing.
  return (
    <>
      <Heading
        eyebrow="LEARN · BUILD · TOGETHER"
        title="ค่ายเล็ก ๆ ที่ต่อยอดไอเดียใหญ่"
      >
        เรียนรู้กับเพื่อนที่สนใจเหมือนกัน มีพี่ ๆ คอยช่วยตั้งแต่เริ่มต้น
        จนได้ลงมือสร้างผลงานของตัวเอง
      </Heading>
      <section className="dc-section" aria-labelledby="open-camps">
        <div className="dc-section-top">
          <div>
            <p className="dc-eyebrow">JOIN THE NEXT CAMP</p>
            <h2 id="open-camps">กำลังเปิดรับสมัคร</h2>
          </div>
          <p className="dc-small">เลือกค่ายที่สนใจ แล้วเริ่มลงมือทำด้วยกัน</p>
        </div>
        {openCamps.length ? (
          <div className="dc-grid">
            {openCamps.map((camp) => (
              <CampCard key={camp.id} camp={camp} />
            ))}
          </div>
        ) : (
          <Notice>
            ยังไม่มีค่ายเปิดรับสมัครในขณะนี้ ติดตามรอบเรียนใหม่ได้เร็ว ๆ นี้
          </Notice>
        )}
      </section>
      <section className="dc-camp-history" aria-labelledby="closed-camps">
        <header className="dc-history-heading">
          <p className="dc-eyebrow">OUR JOURNEY / {closedCamps.length} CAMPS</p>
          <h2 id="closed-camps">พวกเราผ่านอะไรมาแล้วบ้าง</h2>
          <p>ลองเลื่อนอ่านเล่น ๆ ได้นะ</p>
          <small>ค่ายที่ปิดรับสมัครแล้ว · เรียงจากใหม่ไปเก่า</small>
        </header>
        <div className="dc-history-list">
          {visibleClosedCamps.map((camp) => (
            <motion.article
              key={camp.id}
              className="dc-history-row"
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="dc-history-date">
                <span>{camp.year}</span>
                <p>{camp.schedule}</p>
              </div>
              <motion.div
                className="dc-history-content"
                whileInView={{ x: 0 }}
                initial={{ x: 18 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5 }}
              >
                <a
                  href={"/bootcamps/" + camp.id}
                  aria-label={"ดูรายละเอียด " + camp.title}
                >
                  <img
                    src={safeUrl(camp.image)}
                    alt={camp.title}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div>
                  <p className="dc-history-category">{camp.category}</p>
                  <h3>{camp.title}</h3>
                  <p className="dc-history-description">{camp.description}</p>
                  <a className="dc-history-link" href={"/bootcamps/" + camp.id}>
                    อ่านเพิ่มเติม ↗
                  </a>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
        {closedCamps.length > INITIAL_CLOSED_COUNT && (
          <div className="dc-history-actions">
            <button
              type="button"
              className="dc-history-more-btn"
              onClick={handleToggleClosed}
            >
              <span>
                {showAllClosed
                  ? "ย่อกลับ"
                  : `ดูค่ายที่ผ่านมาเพิ่มเติม (${closedCamps.length - INITIAL_CLOSED_COUNT} ค่าย)`}
              </span>
              <span className="dc-btn-icon">{showAllClosed ? "↑" : "↓"}</span>
            </button>
          </div>
        )}
        {!closedCamps.length && <Notice>ยังไม่มีค่ายที่ผ่านมา</Notice>}
      </section>
    </>
  );
}
export function CampDetail({ camp }: { camp: Camp }) {
  const isOpen = camp.status === "open";
  const formUrl = camp.formUrl || "https://forms.gle/ayjdkPbNDJPGfzKGA";

  return (
    <>
      <a className="dc-muted" href="/bootcamps">
        ← ค่ายทั้งหมด
      </a>
      <Heading eyebrow="BOOTCAMP" title={camp.title}>
        {camp.description}
      </Heading>
      {camp.image && (
        <img
          className="dc-detail-poster"
          src={safeUrl(camp.image)}
          alt={camp.title}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="dc-grid">
        <section className="dc-card dc-detail-main">
          <h2>สิ่งที่จะได้เรียนรู้</h2>
          <ul>
            {camp.syllabus
              .split("\n")
              .filter(Boolean)
              .map((x) => (
                <li key={x}>{x}</li>
              ))}
          </ul>
          {camp.stack && <h3>เครื่องมือที่ใช้</h3>}
          {camp.stack
            .split(",")
            .filter(Boolean)
            .map((x) => (
              <span className="dc-tag" key={x}>
                {x}
              </span>
            ))}
          {camp.instructors && (
            <>
              <h3>ผู้สอน</h3>
              <p className="dc-muted">{camp.instructors}</p>
            </>
          )}
          {camp.contacts && (
            <>
              <h3>{isOpen ? "จัดโดย / ช่องทางติดต่อ" : "ผู้ติดต่อที่ระบุในประกาศ"}</h3>
              <p className="dc-muted">{camp.contacts}</p>
            </>
          )}
          <h3>เหมาะกับใคร?</h3>
          <p className="dc-muted">{camp.audience}</p>
        </section>
        <aside className="dc-card flex flex-col justify-between">
          <div>
            <h3>รายละเอียดการเรียน</h3>
            <p className="dc-muted">{camp.schedule}</p>
            <p className="dc-muted">{camp.location}</p>
            <p className="dc-small mt-4">
              {isOpen ? "ค่าสมัครเข้าร่วม" : "ค่าเข้าร่วมในรอบนั้น"}
            </p>
            <h3>{camp.price}</h3>
            {camp.capacity && (
              <p className="dc-small mb-4">
                จำนวนผู้เข้าร่วม:{" "}
                {camp.capacity === "—"
                  ? "ไม่ระบุ"
                  : camp.capacity === "ไม่จำกัด"
                    ? "ไม่จำกัด"
                    : camp.capacity + " คน"}
              </p>
            )}
            <span className="dc-tag">
              {isOpen
                ? "เปิดรับสมัคร"
                : camp.status === "closed"
                  ? "ปิดรับสมัคร"
                  : "รอประกาศรอบเรียน"}
            </span>
          </div>

          {isOpen && (
            <div className="mt-6 pt-5 border-t border-slate-100">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#e57192] hover:bg-[#d65f82] text-white font-bold text-sm text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>สมัครเข้าร่วมค่าย (Google Form)</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </aside>
      </div>
      {camp.notes && <Notice>{camp.notes}</Notice>}
      {safeUrl(camp.sourceUrl || "") && (
        <a
          className="dc-text-link"
          href={camp.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          อ่านประกาศเดิมบน CAMPHUB ↗
        </a>
      )}
      {camp.status === "closed" ? (
        <Notice>ค่ายนี้ปิดรับสมัครแล้ว ติดตามรอบถัดไปได้ที่หน้ารวมค่าย</Notice>
      ) : (
        <section className="my-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-pink-50/90 via-white to-rose-50/50 border border-[#e57192]/25 shadow-xl text-center font-lineSansTH">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e57192]/10 text-[#e57192] text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e57192] animate-pulse" />
            <span>REGISTRATION OPEN · รับสมัครจำนวนจำกัด</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-lineSansTH_XB mb-3">
            สมัครเข้าร่วมค่าย {camp.title}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
            กรอกข้อมูลการสมัครและสำรองที่นั่งผ่านแบบฟอร์ม Google Form ได้ทันที ทีมงานจะติดต่อกลับพร้อมแจ้งยืนยันสิทธิ์และรายละเอียดการเข้าร่วม
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#e57192] hover:bg-[#d65f82] text-white font-bold text-base shadow-lg shadow-pink-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <span>กรอกฟอร์มสมัครเข้าร่วม (Google Form)</span>
              <span className="text-lg">↗</span>
            </a>
            <a
              href="https://line.me/R/ti/p/@468httmq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-200 shadow-sm transition-all"
            >
              <span>สอบถามเพิ่มเติม LINE: @468httmq</span>
            </a>
          </div>
        </section>
      )}
    </>
  );
}

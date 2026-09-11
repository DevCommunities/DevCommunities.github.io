import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, camps, tutors } from "../../lib/content";

export default function LeadForm({
  campId,
  tutorId,
  onClearTutor,
}: {
  campId?: string;
  tutorId?: string;
  onClearTutor?: () => void;
}) {
  const [summary, setSummary] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [copied, setCopied] = useState(false);
  const [goals, setGoals] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const camp = camps.find((c) => c.id === campId);
  const tutor = tutors.find((t) => t.id === tutorId);

  const quickPrompts = [
    "วางแผนทำพอร์ตยื่น CEDT จุฬาฯ",
    "ปูพื้นฐานเขียนโค้ดจาก 0",
    "ติวเข้ม สอวน.คอมพิวเตอร์ ค่าย 1-2",
    "ปรึกษาทำโครงงาน / Consult Project",
    "สนใจ AI & Data Science",
  ];

  function handleAddPrompt(promptText: string) {
    setGoals((prev) => {
      if (!prev) return promptText;
      if (prev.includes(promptText)) return prev;
      return `${prev}, ${promptText}`;
    });
    setSummary("");
    setCopied(false);
  }

  async function prepareAndSendEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const v = Object.fromEntries(new FormData(e.currentTarget));

    const subjectTitle = camp
      ? `[DevCommu] สอบถามและวางแผนเรียนค่าย ${camp.title} - ${v.name}`
      : `[DevCommu] ปรึกษาและวางแผนการเรียน - ${v.name}`;

    const generated = [
      `สวัสดีครับ/ค่ะ ทีมงาน DevCommu`,
      ``,
      `ต้องการสอบถามและวางแผนการเรียน โดยมีรายละเอียดดังนี้:`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `ชื่อ–นามสกุล: ${v.name}`,
      `ระดับการศึกษา: ${v.level}`,
      `เบอร์ติดต่อ (โทร/LINE): ${v.phone}`,
      `อีเมลติดต่อกลับ: ${v.email}`,
      `วิชาที่สนใจ: ${v.subject}`,
      `เป้าหมายและพื้นฐาน: ${v.goals}`,
      tutor ? `ผู้สอนที่สนใจ: ${tutor.name} (${tutor.role})` : "",
      camp ? `ค่ายกิจกรรม: ${camp.title} (${camp.schedule})` : "",
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `รบกวนทีมงานช่วยแนะนำรายละเอียด Roadmap การเรียนและตารางเวลาเพิ่มเติม ขอบคุณครับ/ค่ะ`,
    ]
      .filter(Boolean)
      .join("\n");

    setSummary(generated);
    setEmailSubject(subjectTitle);
    setCopied(false);

    const mailtoUrl = `mailto:admin@devcommu.org?subject=${encodeURIComponent(
      subjectTitle,
    )}&body=${encodeURIComponent(generated)}`;

    // Optional background submission attempt via formsubmit
    try {
      fetch("https://formsubmit.co/ajax/admin@devcommu.org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: subjectTitle,
          name: v.name,
          level: v.level,
          phone: v.phone,
          email: v.email,
          subject: v.subject,
          goals: v.goals,
          tutor: tutor ? `${tutor.name} (${tutor.role})` : "-",
          camp: camp ? `${camp.title} (${camp.schedule})` : "-",
          fullMessage: generated,
        }),
      }).catch(() => {});
    } catch {
      // Ignore background post error and rely on mailto / copy
    }

    setIsSubmitting(false);

    // Trigger user's mail client directly
    window.location.href = mailtoUrl;

    // Smooth scroll to the preview card
    setTimeout(() => {
      document
        .getElementById("message-ready-card")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
  }

  async function copyToClipboard() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = summary;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }

  const mailtoLink = summary
    ? `mailto:admin@devcommu.org?subject=${encodeURIComponent(
        emailSubject,
      )}&body=${encodeURIComponent(summary)}`
    : "mailto:admin@devcommu.org";

  const gmailWebLink = summary
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=admin@devcommu.org&su=${encodeURIComponent(
        emailSubject,
      )}&body=${encodeURIComponent(summary)}`
    : "https://mail.google.com/mail/?view=cm&fs=1&to=admin@devcommu.org";

  return (
    <section id="consultation" className="dc-section relative my-12">
      {/* Background ambient lighting effects */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 bg-primary/15 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      {/* Main Form Container */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/60 font-lineSansTH text-left">
        {/* Header Section */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>EMAIL INQUIRY · admin@devcommu.org</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {camp
              ? `สอบถามและวางแผนเรียน · ${camp.title}`
              : "ปรึกษาและวางแผนการเรียน"}
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
            {camp
              ? "ต้องการสอบถามรายละเอียดหลักสูตร วันเรียน หรือสำรองที่นั่งค่าย กรอกข้อมูลด้านล่างแล้วส่งเมลหาทีมงานได้ทันที"
              : "บอกเป้าหมายหรือวิชาที่สนใจ แล้วส่งอีเมลหาทีมงานเพื่อรับคำแนะนำ Roadmap การเรียนที่ตอบโจทย์คุณที่สุด"}
          </p>

          {/* Tutor Selected Context Card */}
          {tutor && (
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-pink-50/90 via-white to-pink-50/40 border border-primary/25 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3.5">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-primary/40 shadow-sm"
                />
                <div>
                  <div className="text-[11px] text-primary font-bold uppercase tracking-wider">
                    กำลังปรึกษาและวางแผนกับ
                  </div>
                  <div className="font-bold text-slate-900 text-base sm:text-lg">
                    {tutor.name}
                  </div>
                  <div className="text-xs text-slate-500">{tutor.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-primary/20 text-primary font-semibold text-xs rounded-full shadow-sm">
                  <span>ผู้สอนที่เลือก</span>
                </div>
                {onClearTutor && (
                  <button
                    type="button"
                    onClick={onClearTutor}
                    className="text-xs text-slate-500 hover:text-slate-800 underline px-1.5 py-1 transition-colors cursor-pointer"
                  >
                    เปลี่ยน
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Camp Selected Context Card */}
          {camp && !tutor && (
            <div className="mt-5 p-4 rounded-2xl bg-slate-50/90 border border-slate-200 flex items-center justify-between gap-3.5 shadow-sm">
              <div>
                <div className="text-[11px] text-primary font-bold uppercase tracking-wider">
                  ค่ายกิจกรรมที่สนใจ
                </div>
                <div className="font-bold text-slate-900 text-base sm:text-lg">
                  {camp.title}
                </div>
                <div className="text-xs text-slate-500">
                  {camp.schedule} · {camp.location} · ราคา {camp.price}
                </div>
              </div>
              <div className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-full shadow-sm">
                ค่ายกิจกรรม
              </div>
            </div>
          )}
        </header>

        {/* Input Form */}
        <form
          onSubmit={prepareAndSendEmail}
          onChange={() => {
            setSummary("");
            setCopied(false);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Field 1: Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                ชื่อ–นามสกุลของผู้เรียน <span className="text-primary">*</span>
              </label>
              <input
                name="name"
                required
                maxLength={120}
                autoComplete="name"
                placeholder="เช่น น้องกานต์ หรือ วีรภัทร"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate-900 transition-all duration-200 text-sm outline-none"
              />
            </div>

            {/* Field 2: Level */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                ระดับการศึกษาปัจจุบัน <span className="text-primary">*</span>
              </label>
              <select
                name="level"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate-900 transition-all duration-200 text-sm outline-none"
              >
                <option value="" disabled>
                  เลือกระดับการศึกษา
                </option>
                <option value="มัธยมศึกษาตอนต้น (ม.1 - ม.3)">
                  มัธยมศึกษาตอนต้น (ม.1 - ม.3)
                </option>
                <option value="มัธยมศึกษาตอนปลาย (ม.4 - ม.6)">
                  มัธยมศึกษาตอนปลาย (ม.4 - ม.6)
                </option>
                <option value="มหาวิทยาลัย">มหาวิทยาลัย</option>
                <option value="บุคคลทั่วไป / วัยทำงาน">
                  บุคคลทั่วไป / วัยทำงาน
                </option>
              </select>
            </div>

            {/* Field 3: Phone / LINE */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                เบอร์โทรศัพท์ หรือ LINE ID <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="phone"
                required
                maxLength={50}
                minLength={3}
                autoComplete="tel"
                placeholder="เช่น 081-xxx-xxxx หรือ @line_id"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate-900 transition-all duration-200 text-sm outline-none"
              />
            </div>

            {/* Field 4: Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                อีเมลสำหรับติดต่อกลับ <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="student@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate-900 transition-all duration-200 text-sm outline-none"
              />
            </div>

            {/* Field 5: Subject */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                วิชาหรือทักษะที่สนใจเป็นพิเศษ <span className="text-primary">*</span>
              </label>
              <select
                name="subject"
                required
                defaultValue={camp ? `ค่ายกิจกรรม: ${camp.title}` : ""}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate-900 transition-all duration-200 text-sm outline-none"
              >
                <option value="" disabled>
                  เลือกวิชาหรือหมวดหมู่ที่ต้องการเรียน
                </option>
                {camp && (
                  <option value={`ค่ายกิจกรรม: ${camp.title}`}>
                    {camp.title}
                  </option>
                )}
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 6: Goals and Background */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="block text-sm font-bold text-slate-700">
                  เป้าหมายและพื้นฐานการเรียนในปัจจุบัน{" "}
                  <span className="text-primary">*</span>
                </label>
                <span className="text-xs text-slate-400">
                  คลิกปุ่มด้านล่างเพื่อเติมข้อความตัวอย่างได้ทันที
                </span>
              </div>

              {/* Quick Prompts Chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleAddPrompt(prompt)}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-700 border border-slate-200/80 transition-all active:scale-95 cursor-pointer flex items-center gap-1 font-medium"
                  >
                    <span>{prompt}</span>
                    <span className="text-primary font-bold">+</span>
                  </button>
                ))}
              </div>

              <textarea
                name="goals"
                value={goals}
                onChange={(e) => {
                  setGoals(e.target.value);
                  setSummary("");
                }}
                required
                minLength={5}
                maxLength={2000}
                rows={4}
                placeholder="เช่น ไม่มีพื้นฐานมาก่อน อยากเริ่มปูพื้นฐาน Python / สนใจเตรียมพอร์ตยื่นวิศวะคอมฯ CEDT จุฬาฯ / อยากทำโปรเจกต์ส่งประกวด..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-slate-900 transition-all duration-200 text-sm leading-relaxed outline-none resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary via-[#DE5D82] to-[#C9476C] text-white font-bold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>ส่งอีเมลไปที่ admin@devcommu.org</span>
                <span className="text-lg">→</span>
              </motion.button>
              <div className="text-xs text-slate-500 mt-3 text-center">
                เมื่อกดปุ่ม ระบบจะเปิดโปรแกรมส่งอีเมลไปยัง admin@devcommu.org พร้อมส่งได้ทันที
              </div>
            </div>
          </div>
        </form>

        {/* Generated Summary Card */}
        <AnimatePresence>
          {summary && (
            <motion.div
              id="message-ready-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-10 pt-8 border-t border-slate-200"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-800">
                {/* Glow decor */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 bg-primary/25 rounded-full blur-3xl"
                  aria-hidden="true"
                />

                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>เตรียมข้อความส่งไปที่ admin@devcommu.org เรียบร้อย</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    หากโปรแกรมอีเมลไม่เปิดขึ้นมา สามารถเลือกกดปุ่มด้านล่างได้เลย
                  </span>
                </div>

                {/* Preformatted Chat Preview Box */}
                <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-slate-800 text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap text-slate-200 select-all mb-6 relative">
                  {summary}
                </div>

                {/* Action Buttons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Mail App Button */}
                  <a
                    href={mailtoLink}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-[#DE5D82] text-white font-bold text-sm shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>เปิดในแอปเมล</span>
                    <span>→</span>
                  </a>

                  {/* Gmail Webmail Button */}
                  <a
                    href={gmailWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>เปิดด้วย Gmail (Web)</span>
                    <span>↗</span>
                  </a>

                  {/* LINE Button */}
                  <a
                    href="https://line.me/R/ti/p/@468httmq"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-md shadow-[#06C755]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 fill-white shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                    <span>ส่งทาง LINE OA</span>
                  </a>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>{copied ? "คัดลอกเรียบร้อยแล้ว" : "คัดลอกข้อความ"}</span>
                  </button>
                </div>

                {copied && (
                  <p className="text-center text-xs text-emerald-400 mt-3.5 font-medium animate-pulse">
                    คัดลอกข้อความลงคลิปบอร์ดแล้ว นำไปวางส่งในอีเมลหรือแชทให้ทีมงานได้ทันที
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

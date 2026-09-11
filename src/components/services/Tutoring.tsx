import { useState } from "react";
import { tutors, safeUrl } from "../../lib/content";
import { Card, Heading } from "./shared";
import LeadForm from "./LeadForm";
import Pricing from "./Pricing";
export default function Tutoring({ team = false }: { team?: boolean }) {
  const items = tutors;
  const [selected, setSelected] = useState("");
  return (
    <>
      <Heading
        eyebrow={team ? "MEET YOUR MENTORS" : "PRIVATE TUTORING · 1 ON 1"}
        title={
          team
            ? "รู้จักพี่ ๆ ที่พร้อมเติบโตไปด้วยกัน"
            : "เรียนตัวต่อตัว ให้ตรงกับเป้าหมายคุณ"
        }
      >
        {team
          ? "ทีมงานและผู้สอน DevCommu พร้อมแบ่งปันความรู้และช่วยต่อยอดไอเดียของผู้เรียน"
          : "เรียนเขียนโค้ดและพัฒนาทักษะแบบ 1 ต่อ 1 ครอบคลุมตั้งแต่พื้นฐาน, Data & AI, เว็บไซต์, สอวน.คอม ไปจนถึงการ Consult Project"}
      </Heading>
      {!team && (
        <section className="dc-goals-grid">
          {[
            [
              "01",
              "การเขียนโปรแกรมพื้นฐาน",
              "Python, C, C++",
              "ปูพื้นฐานการเขียนโค้ด การคิดเชิงตรรกะ ไวยากรณ์ และทักษะการแก้ปัญหาสำหรับผู้เริ่มต้น",
            ],
            [
              "02",
              "Datasci-AI",
              "Data Science & AI",
              "ตั้งแต่การจัดการและวิเคราะห์ข้อมูลด้วย Python จนถึงการสร้างและทดลองโมเดล Machine Learning / AI",
            ],
            [
              "03",
              "Web dev",
              "Web Development",
              "พัฒนาเว็บไซต์และ Web Application เรียนรู้ตั้งแต่ HTML, CSS, JavaScript ไปจนถึงการ Deploy ผลงานจริง",
            ],
            [
              "04",
              "POSN101",
              "สอวน. คอมพิวเตอร์",
              "ติวเข้มสอบ สอวน.คอม ค่าย 1 ด้วยภาษา C/C++ สรุปเนื้อหา Data Structure, Algorithm และฝึกทำโจทย์แข่งขัน",
            ],
            [
              "05",
              "Consult Project",
              "Project & Roadmap",
              "ให้คำปรึกษาพัฒนาโปรเจกต์ โครงงาน หรือผลงานสำหรับยื่นพอร์ต และแนะแนววางแผนเส้นทางเรียนต่อสายเทคโนโลยี",
            ],
          ].map(([n, title, sub, desc]) => (
            <Card key={n}>
              <span className="text-primary font-bold">/{n}</span>
              <h3 className="mt-1 font-bold">{title}</h3>
              <p className="text-xs font-semibold text-primary mb-2">{sub}</p>
              <p className="dc-muted text-sm">{desc}</p>
            </Card>
          ))}
        </section>
      )}
      {!team && <Pricing />}
      <section className="dc-section">
        <h2>{team ? "ทีมงานทั้งหมด" : "ทีมผู้สอน"}</h2>
        <div className="dc-grid">
          {items.map((t) => (
            <Card key={t.id}>
              <img
                className="dc-avatar"
                src={safeUrl(t.image)}
                alt={t.name}
                loading="lazy"
              />
              <h3>{t.name}</h3>
              <p className="text-primary mb-3">{t.role}</p>
              <p className="dc-muted">{t.description}</p>
              <div className="my-4">
                {t.expertise.split(",").map((x) => (
                  <span className="dc-tag" key={x}>
                    {x}
                  </span>
                ))}
              </div>
              {!team && (
                <button
                  className={"dc-btn " + (selected === t.id ? "" : "secondary")}
                  onClick={() => {
                    setSelected(t.id);
                    document
                      .getElementById("consultation")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  เลือก{t.name} ↗
                </button>
              )}
            </Card>
          ))}
        </div>
      </section>
      {!team && (
        <LeadForm
          key={selected}
          tutorId={selected || undefined}
          onClearTutor={() => setSelected("")}
        />
      )}
    </>
  );
}

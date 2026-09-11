import { useState } from "react";
import { motion } from "framer-motion";

const prices = {
  solo: { online: [450, 3400, 6800], onsite: [500, 3800, 7600] },
  group: { online: [350, 2500, 5300], onsite: [400, 2900, 6100] },
};
const plans = [
  {
    title: "รายครั้ง",
    description: "เริ่มเรียนตามเรื่องที่สนใจ",
    unit: "บาท / ชั่วโมง",
    details: ["ชำระตามจำนวนชั่วโมงที่เรียน"],
  },
  {
    title: "รายเดือน · สัปดาห์ละ 1 ครั้ง",
    description: "ค่อย ๆ เรียนรู้และพัฒนาต่อเนื่อง",
    unit: "บาท / เดือน",
    details: ["เรียนครั้งละ 2 ชั่วโมง", "สัปดาห์ละ 1 ครั้ง"],
  },
  {
    title: "รายเดือน · สัปดาห์ละ 2 ครั้ง",
    description: "เพิ่มเวลาฝึก ให้เข้าใจได้มากขึ้น",
    unit: "บาท / เดือน",
    details: ["เรียนครั้งละ 2 ชั่วโมง", "สัปดาห์ละ 2 ครั้ง"],
  },
];
export default function Pricing() {
  const [type, setType] = useState<"solo" | "group">("solo");
  const [mode, setMode] = useState<"online" | "onsite">("online");
  return (
    <section
      id="pricing"
      className="dc-section"
      aria-labelledby="pricing-heading"
    >
      <div className="dc-section-top">
        <div>
          <p className="dc-eyebrow">LEARN YOUR WAY</p>
          <h2 id="pricing-heading">เลือกวิธีเรียน ดูราคาได้เลย</h2>
        </div>
        <p className="dc-muted">
          เรียนเดี่ยว หรือชวนเพื่อนมาเรียนด้วยกัน
          <br />
          เลือกแบบที่เหมาะกับคุณ
        </p>
      </div>
      <div className="dc-pricing-options">
        <div
          className="dc-price-toggle"
          role="group"
          aria-label="ประเภทการเรียน"
        >
          {(
            [
              ["solo", "เรียนเดี่ยว"],
              ["group", "เรียนกลุ่ม · 2 คนขึ้นไป"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              aria-pressed={type === value}
              onClick={() => setType(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="dc-price-toggle"
          role="group"
          aria-label="รูปแบบการเรียน"
        >
          {(
            [
              ["online", "ออนไลน์"],
              ["onsite", "ออนไซต์"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="dc-small mb-5" aria-live="polite">
        {type === "solo" ? "ราคาเรียนเดี่ยว" : "ราคาเรียนกลุ่มต่อคน · อย่างน้อย 2 คน"}{" "}
        · {mode === "online" ? "ออนไลน์" : "ออนไซต์ในโซน MRT / BTS"}
      </p>
      <div className="dc-grid dc-pricing-grid">
        {plans.map((plan, index) => (
          <motion.article
            whileHover={{ y: -4 }}
            key={plan.title}
            className={
              "dc-card dc-price-card" +
              (index === 1 ? " dc-price-featured" : "")
            }
          >
            <p className="dc-eyebrow">
              0{index + 1} / {index === 0 ? "SINGLE SESSION" : "MONTHLY PLAN"}
            </p>
            <h3>{plan.title}</h3>
            <p className="dc-small">{plan.description}</p>
            <div className="dc-price-amount">
              <strong>
                {prices[type][mode][index].toLocaleString("en-US")}
              </strong>
              <span>{plan.unit}{type === "group" ? " / คน" : ""}</span>
            </div>
            <ul>
              {plan.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            {mode === "onsite" && (
              <p className="dc-price-travel">
                รวมค่าเดินทาง{" "}
                {index === 0
                  ? "50 บาท / ชั่วโมง"
                  : index === 1
                    ? "400 บาท / เดือน"
                    : "800 บาท / เดือน"}{" "}
                แล้ว
              </p>
            )}
            <a
              className={"dc-btn" + (index === 1 ? "" : " secondary")}
              href="#consultation"
            >
              ปรึกษาเรื่องเรียน ↗
            </a>
          </motion.article>
        ))}
      </div>
      <p className="dc-small mt-5">
        ออนไซต์ได้ในโซน MRT / BTS · ค่าเดินทางเพิ่มจากราคาออนไลน์ 50 บาท /
        ชั่วโมง โดยราคาออนไซต์ด้านบนรวมค่าเดินทางแล้ว
      </p>
    </section>
  );
}

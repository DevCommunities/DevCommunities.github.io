// Event details and artwork supplied in DevCommunities/Devcommu_linktree.
// Dates are Bangkok calendar dates. Registration closes at the end of that day.
export const lineUrl = "https://line.me/R/ti/p/@468httmq";

export type HubEvent = {
  id: string;
  title: string;
  deadline: string;
  description: string;
  price: string;
  schedule?: string;
  signupUrl?: string;
};

export const featuredCamps: HubEvent[] = [
  {
    id: "llm-agentic-ai-november",
    title: "LLM and Agentic AI Bootcamp",
    deadline: "2026-11-20",
    schedule: "21–22 พฤศจิกายน 2569 เวลา 10.00–17.00 น.",
    description: "ออนไลน์ผ่าน Zoom",
    price: "1,190 บาท",
    signupUrl: "https://forms.gle/QMTtxjY4Pp6E3YDq8",
  },
];

export const competitions: HubEvent[] = [
  {
    id: "biology-quiz",
    title: "Biology Quiz",
    deadline: "2026-10-18",
    price: "350 บาท / คน",
    description: "แข่งเดี่ยว สำหรับ ม.1–6",
  },
  {
    id: "vajira-quiz",
    title: "VQ Vajira Quiz",
    deadline: "2026-10-19",
    price: "1,200 บาท / ทีม",
    description: "ทีมละ 3 คน สำหรับ ม.ปลาย",
  },
  {
    id: "hri-hackathon",
    title: "HRI Hackathon Thailand 2026",
    deadline: "2026-10-22",
    price: "สมัครฟรี",
    description: "ทีมไม่เกิน 5 คน สำหรับ ม.ปลายถึงปริญญาตรี",
  },
  {
    id: "singha-challenge",
    title: "SINGHA Ultimate Challenge 2026",
    deadline: "2026-10-22",
    price: "สมัครฟรี",
    description: "ทีม 2–4 คน สำหรับนักศึกษาปริญญาตรี",
  },
  {
    id: "spark-hack",
    title: "Spark Hack Season 2",
    deadline: "2026-10-24",
    price: "สมัครฟรี",
    description: "ทีม 3–5 คน อายุ 18–35 ปี",
  },
  {
    id: "ict-challenge",
    title: "ICT Challenge 2026",
    deadline: "2026-10-30",
    price: "สมัครฟรี",
    description: "ทีมละ 3 คน สำหรับ ม.ปลาย หรือ ปวช.",
  },
];

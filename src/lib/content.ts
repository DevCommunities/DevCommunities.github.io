import campArchive from "../data/camps.json";
import { About } from "../data/data";
export type Camp = {
  id: string;
  title: string;
  description: string;
  image: string;
  stack: string;
  syllabus: string;
  audience: string;
  schedule: string;
  location: string;
  price: string;
  status: string;
  year?: number;
  capacity?: string;
  category?: string;
  sourceUrl?: string;
  notes?: string;
  instructors?: string;
  contacts?: string;
  isMock?: boolean;
};
export type Tutor = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  expertise: string;
  availability: string;
  achievements: string;
};
export type Story = {
  id: string;
  slug?: string;
  name: string;
  category: string;
  institution: string;
  faculty: string;
  quote: string;
  image: string;
  url: string;
  details?: string;
  objectPosition?: string;
};
export type Stat = { id: string; label: string; value: string };
const upcomingCamps: Camp[] = [
  {
    id: "comeng-bootcamp-sep-2026-by-devcommu",
    title: "Com Engineering Bootcamp | Sep 2026 By Devcommu",
    description:
      "เปิดโลกวิศวะคอม พร้อมค้นหาเส้นทางที่ใช่ เรียนรู้ว่าวิศวกรรมคอมพิวเตอร์คืออะไร สำรวจทักษะที่จำเป็น และอาชีพในสายงาน พูดคุยกับ mentor พร้อมรับคำแนะนำส่วนตัว",
    image: "/images/camps/comeng-bootcamp-sep-2026-by-devcommu.webp",
    stack: "Computer Engineering, Hardware & Architecture, Software Development, System & Network, AI, Career Pathway",
    syllabus:
      "เรียนรู้ว่า วิศวกรรมคอมพิวเตอร์ คืออะไร\nสำรวจทักษะที่จำเป็น และ อาชีพในสายงาน\nพูดคุยกับ mentor พร้อมรับคำแนะนำส่วนตัว\nถาม-ตอบแนวทางการเตรียมตัวและทำพอร์ตเข้าคณะวิศวะคอม",
    audience: "ม.1 - ม.6 / ปวช., ปวส., บุคคลทั่วไป (ปีการศึกษา 2569)",
    schedule: "อาทิตย์ 13 กันยายน 2569 (09.00 - 16.00 น.)",
    location: "กิจกรรมออนไลน์ (เรียน Online ผ่านช่องทาง Zoom)",
    price: "299 บาท (จ่ายตอนสมัคร)",
    status: "open",
    year: 2026,
    capacity: "ไม่จำกัด",
    category: "Com Eng",
    notes: "รับสมัครถึงพรุ่งนี้! วันที่รับสมัครวันสุดท้าย เสาร์ 12 กันยายน 2569",
    instructors: "พี่หมูกรอบ (รุ่นพี่วิศวะคอม จุฬาฯ)",
    contacts: "กิจกรรมนี้จัดโดย DevCommu (ติดต่อผู้จัด คลิกที่ไอคอนด้านล่าง: LINE @468httmq, Messenger, Instagram)",
    isMock: false,
  },
];
export const camps: Camp[] = [...upcomingCamps, ...campArchive];
export const tutors: Tutor[] = About.flatMap((group) => group.people).map(
  (p, i) => {
    const isMookrob = String(p.name).includes("หมูกรอบ");
    const isChokdee = String(p.name).includes("โชคดี");
    const isGuide = String(p.name).includes("ไกด์");
    const isSayHi = String(p.name).includes("เซย์ไฮ");
    const isGigi = String(p.name).includes("จีจี้");
    return {
      id: `tutor-${i + 1}`,
      name: String(p.name),
      role: isMookrob
        ? "Managing Director · DevCommu"
        : isChokdee
          ? "Head of Tutors · DevCommu"
          : isGuide
            ? "ติวเตอร์ Web Dev, AI & Consult Project"
            : isSayHi
              ? "ติวเตอร์ สอวน. คอมพิวเตอร์ & Competitive Programming"
              : isGigi
                ? "ติวเตอร์ สอวน. คอมพิวเตอร์ & Competitive Programming"
                : String(p.role),
      description: String(p.description),
      image: String(p.img),
      expertise: isMookrob
        ? "Web dev, Datasci-AI, การเขียนโปรแกรมพื้นฐาน (Python), Consult Project"
        : isChokdee
          ? "Web dev, Game dev, Consult Project, POSN101, การเขียนโปรแกรมพื้นฐาน (C/C++)"
          : isGuide
            ? "Web dev, Datasci-AI, Consult Project, การเขียนโปรแกรมพื้นฐาน (Python)"
            : isSayHi
              ? "Competitive Programming, สอวน. คอมพิวเตอร์ (POSN), C/C++, การเขียนโปรแกรมพื้นฐาน"
              : isGigi
                ? "สอวน. คอมพิวเตอร์ (POSN), POSN101, C/C++, การเขียนโปรแกรมพื้นฐาน, Competitive Programming"
                : "Web dev, Consult Project และแนะแนวแผนการเรียน",
      availability:
        [
          "เสาร์ 09:00–12:00",
          "อาทิตย์ 13:00–16:00",
          "เสาร์ 13:00–16:00",
          "อาทิตย์ 09:00–12:00",
          "จันทร์–ศุกร์ 18:00–20:00",
        ][i % 5],
      achievements: isGigi
        ? [
            "ผู้แทนศูนย์ สอวน. คอมพิวเตอร์ 2 ปีซ้อน (TOI 19-20 ในปี 2565–2566)",
            "เข้าร่วมค่าย สอวน. คอมพิวเตอร์ 3 ปีซ้อน ตั้งแต่ปี 2564 (ค่าย 2)",
            "มีประสบการณ์ติวนักเรียนเพื่อเตรียมสอบโอลิมปิกวิชาการคอมพิวเตอร์",
            "เชี่ยวชาญการแข่งขันสาย Competitive Programming และอัลกอริทึม",
          ].join("\n")
        : isSayHi
          ? [
              "ตัวแทนศูนย์ สอวน. มจพ. การแข่งขันโอลิมปิกคอมพิวเตอร์ระดับชาติ ครั้งที่ 19 (TOI 19th)",
              "Global Rank 35 จาก 8,000 ทีมทั่วโลก การแข่งขัน IEEEXtreme (19 Oct 2025)",
            ].join("\n")
          : isChokdee
            ? "เหรียญทองแดง คอมพิวเตอร์โอลิมปิกระดับชาติ (TOI)"
            : isMookrob
              ? "CEO บริษัท Startup 'Remetrix' Spin-off จากจุฬาลงกรณ์มหาวิทยาลัย"
              : isGuide
                ? "เจ้าของ Software House เชี่ยวชาญงานพัฒนาเว็บและระบบ AI"
                : "",
    };
  },
);
export const stats: Stat[] = [
  { id: "bootcamps", label: "Bootcamp ที่จัดแล้ว", value: "50+" },
  { id: "camp-students", label: "นักเรียนในค่าย", value: "2,000+" },
  { id: "private-students", label: "นักเรียน Private Tutoring", value: "100+" },
  { id: "partners", label: "ร่วมมือกับสถานศึกษา", value: "10+" },
];
export const categories = [
  "การเขียนโปรแกรมพื้นฐาน (Python, C, C++)",
  "Datasci-AI",
  "Web dev",
  "POSN101",
  "Consult Project และแนะแนวแผนการเรียน",
];
export function safeUrl(value: string) {
  return /^https:\/\//i.test(value) || /^\/(?!\/)/.test(value)
    ? value
    : undefined;
}

export const isMockContent = false;
export const stories: Story[] = [
  // --- มหาวิทยาลัย (University Admissions) ---
  {
    id: "story-uni-prom",
    name: "พร้อม",
    category: "university",
    institution: "จุฬาลงกรณ์มหาวิทยาลัย",
    faculty: "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT Chula)",
    quote:
      "ผมยังจำได้อยู่เลย วันแรกที่เรียนกับพี่คอร์ส Computer Vision พี่เอารูปเกม XO มาแล้วถามว่าเราจะแยก X กับ O ยังไง ผมตอบว่า Object Detection พี่บอกมันเวอร์เกินไป ดูสีก็ดูได้แล้ว มันทำให้ผมชอบ Computer Vision ขึ้นมาเลย",
    image: "/images/students/prom.webp",
    url: "",
  },
  {
    id: "story-uni-zan",
    name: "แซน",
    category: "university",
    institution: "ติด 4 มหาวิทยาลัยชั้นนำ (มจธ. / สจล. / มธ. / มก.)",
    faculty: "AISE มจธ. ราชบุรี · IoT สจล. · Software มธ. · เซมิคอนดักเตอร์ KU",
    quote:
      "ขอบคุณมากๆ สำหรับการดูแลแซนตลอด 3 ปี การก่อร่างสร้าง Port มาด้วยกัน น้องอาจจะเบื่อในบางวัน งอแงในบางครั้ง แต่พี่หมูกรอบก็น่ารักกับน้องมาก",
    image: "/images/students/sannn.webp",
    url: "",
  },
  {
    id: "story-uni-pogas",
    name: "โปกัส",
    category: "university",
    institution: "จุฬาลงกรณ์มหาวิทยาลัย",
    faculty: "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT Chula)",
    quote:
      "พี่ ๆ ช่วยติวและให้คำปรึกษาทั้งการแข่งขันและการทำโปรเจกต์อย่างเข้มข้น จนคว้ารางวัลระดับประเทศและสอบติด CEDT จุฬาฯ ได้สำเร็จ",
    image: "/images/students/pogas.webp",
    url: "",
  },
  {
    id: "story-uni-chen",
    name: "เชน",
    category: "university",
    institution: "จุฬาลงกรณ์มหาวิทยาลัย",
    faculty: "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT Chula)",
    quote:
      "ได้ฝึกทักษะการทำงานเป็นทีมและพัฒนานวัตกรรมจริง จนได้รางวัลรองชนะเลิศอันดับ 3 Siriraj Hackathon และสอบติด CEDT จุฬาฯ",
    image: "/images/students/avatar-placeholder.svg",
    url: "",
  },
  {
    id: "story-uni-tim",
    name: "ทีม",
    category: "university",
    institution: "จุฬาลงกรณ์มหาวิทยาลัย",
    faculty: "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT Chula)",
    quote:
      "ปูพื้นฐาน Algorithm และแก้โจทย์อย่างเป็นขั้นตอน จนผ่านเข้าค่าย 2 สอวน.คอม และสอบติด CEDT จุฬาฯ",
    image: "/images/students/tim.webp",
    url: "",
  },
  {
    id: "story-uni-khaopan",
    name: "ข้าวปั้น",
    category: "university",
    institution: "The University of Hong Kong (HKU)",
    faculty: "Faculty of Engineering · Computer Engineering",
    quote:
      "ต่อยอดทักษะสู่เวทีสากล ปูพื้นฐานโค้ดและพัฒนาโปรเจกต์ที่แข็งแกร่งสำหรับยื่นมหาวิทยาลัยระดับโลก",
    image: "/images/students/khaopan.webp",
    url: "",
  },
  {
    id: "story-uni-oat",
    name: "โอ๊ต",
    category: "university",
    institution: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    faculty: "วิศวกรรมคอมพิวเตอร์และความปลอดภัยไซเบอร์ (KMITL)",
    quote:
      "เจาะลึกทั้งพื้นฐานคอมพิวเตอร์และด้าน Cybersecurity ช่วยให้มั่นใจทั้งการทำผลงานและการสัมภาษณ์",
    image: "/images/students/oat.webp",
    url: "",
  },
  {
    id: "story-uni-ken",
    name: "เคน",
    category: "university",
    institution: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    faculty: "คณะเทคโนโลยีสารสนเทศ (IT ลาดกระบัง) · สอวน.คอม ค่าย 2",
    quote:
      "ฝึกการคิดเชิงตรรกะและอัลกอริทึมอย่างเป็นระบบ ผ่านเข้าค่าย 2 สอวน.คอม และสอบติด IT ลาดกระบัง",
    image: "/images/students/ken.webp",
    url: "",
  },
  {
    id: "story-uni-us",
    name: "อัส",
    category: "university",
    institution: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    faculty: "ศึกษาต่อ สจล. (ลาดกระบัง) · เหรียญทองแดง Super AI Engineer Season 5",
    quote:
      "เรียนรู้ด้าน AI อย่างจริงจังจนคว้ารางวัล Super AI Engineer Season 5 และนำองค์ความรู้ไปต่อยอดในระดับมหาวิทยาลัย",
    image: "/images/students/us.webp",
    url: "",
    objectPosition: "center top",
  },

  // --- สนามแข่งขัน & รางวัล (Awards & Competitions) ---
  {
    id: "story-award-pogas",
    name: "โปกัส",
    category: "award",
    institution: "Siriraj Hackathon & Super AI Engineer",
    faculty: "รองชนะเลิศอันดับ 3 Siriraj Hackathon · เหรียญทอง Super AI Engineer Season 5",
    quote:
      "ฝึกทักษะการแก้ปัญหาในสถานการณ์จริง การคิดนวัตกรรมสุขภาพ และพัฒนาโมเดล AI จนคว้ารางวัลทั้งสองเวทีระดับประเทศ",
    image: "/images/students/pogas.webp",
    url: "",
  },
  {
    id: "story-award-chen",
    name: "เชน",
    category: "award",
    institution: "Siriraj Hackathon 2024",
    faculty: "รองชนะเลิศอันดับ 3 Siriraj Hackathon",
    quote:
      "การทำงานเป็นทีมและพัฒนานวัตกรรมที่ตอบโจทย์การแพทย์จริงจนคว้ารางวัลรองชนะเลิศอันดับ 3 ในเวทีระดับชาติ",
    image: "/images/students/avatar-placeholder.svg",
    url: "",
  },
  {
    id: "story-award-jewelry",
    name: "จิวเวอรี่",
    category: "award",
    institution: "Change Innovation Award & Young Innovator",
    faculty: "1st Place Change Innovation Award 2026 · เหรียญทอง Young Innovator Hackathon 2025",
    quote:
      "เปลี่ยนไอเดียให้กลายเป็นโซลูชันที่จับต้องได้ คว้าอันดับ 1 Change Innovation และเหรียทอง Hackathon",
    image: "/images/students/Njew.webp",
    url: "",
  },
  {
    id: "story-award-win",
    name: "วิน",
    category: "award",
    institution: "CEDT Summit · AI Builders · NSC ระดับภาค",
    faculty: "สอวน.คอม ค่าย 2 · ขวัญใจกรรมการ AI Builders · รางวัลชมเชย CEDT Innovation Summit",
    quote:
      "ลุยทั้งสายแข่งอัลกอริทึม สอวน.คอม และสายทำโปรเจกต์ AI จนผ่านคัดเลือกระดับภาค NSC และได้รางวัลจากเวทีชั้นนำ",
    image: "/images/students/win.webp",
    url: "",
  },
  {
    id: "story-award-tim",
    name: "ทีม",
    category: "award",
    institution: "สอวน. คอมพิวเตอร์",
    faculty: "ผ่านการคัดเลือกเข้าค่าย 2 สอวน. คอมพิวเตอร์",
    quote:
      "ฝึกฝนทักษะการเขียนโปรแกรมและการแก้โจทย์ Data Structure & Algorithm จนผ่านเข้าสู่ค่าย 2 สอวน.คอม",
    image: "/images/students/tim.webp",
    url: "",
  },
  {
    id: "story-award-zan",
    name: "แซน",
    category: "award",
    institution: "Data Science Project Contest 2025",
    faculty: "เหรียญทองแดง Data Science Project Contest 2025",
    quote:
      "ออกแบบและพัฒนาโครงงานวิทยาศาสตร์ข้อมูลอย่างเป็นระบบ จนได้รับเหรียญรางวัลในการประกวดแข่งขันระดับประเทศ",
    image: "/images/students/sannn.webp",
    url: "",
  },

  // --- โปรเจกต์ของผู้เรียน (Featured Student Projects) ---
  {
    id: "story-proj-sabaijai",
    slug: "sabaijai",
    name: "Website Sabaijai - พื้นที่ปลอดภัย ให้ใจได้พัก",
    category: "project",
    institution: "น้องจิว · โรงเรียนสวนกุหลาบวิทยาลัย ธนบุรี",
    faculty: "ระดับโรงเรียน/สถาบัน ไม่มีค่าใช้จ่าย · ร่วมกับ โรงเรียนสวนกุหลาบวิทยาลัย ธนบุรี",
    quote:
      "ผลที่ได้รับ: มีผู้ใช้จริงใน phase แรก รวมกันกว่าหลายร้อยคน และได้ถูกนำไปพัฒนาต่อเพื่อใช้เป็นระบบดูแลนักเรียนภายในโรงเรียน 'Sabaijai X SKT Students'",
    image: "/images/projects/sabaijai-cover.webp",
    url: "https://sabaijai-mentaleddy.vercel.app/",
    details:
      "จากปัญหาด้านสุขภาพจิตที่เพิ่มขึ้นอย่างเห็นได้ชัด ทั้งจากแรงกดดันและความเครียดต่าง ๆ ในสังคม ทำให้หลายคนต้องการพื้นที่สำหรับระบายความรู้สึกและมีใครสักคนรับฟัง แต่เมื่อเลือกที่จะโพสต์หรือระบายความรู้สึกกับใคร ก็ยังไม่สามารถหลีกเลี่ยงความกังวลเรื่องการถูกตัดสินได้ หนูและทีมจึงพัฒนาเว็บไซต์ “Sabaijai” เพื่อสร้างพื้นที่ปลอดภัยที่ผู้ใช้สามารถแสดงความรู้สึกได้อย่างสบายใจโดยไม่จำเป็นต้องเปิดเผยตัวตน\n\nหนูได้รับหน้าที่เป็น Head of Project ดูแลตั้งแต่การคิดและพัฒนาไอเดีย ออกแบบ UI/UX และพัฒนาเว็บไซต์ด้วย React, TypeScript และ Next.js พร้อมทั้งทำ Auth และจัดเก็บข้อมูลโดยใช้ Firebase ดึง API จาก Gemini รวมถึง Deploy เว็บไซต์เพื่อให้สามารถใช้งานได้จริง\n\nฟังก์ชันหลักของ Sabaijai เปิดให้ผู้ใช้สามารถระบายความรู้สึกทั้งในวันที่มีความสุขหรือวันที่รู้สึกไม่ดีโดยไม่ระบุตัวตน พร้อมเลือกสีที่ตรงกับความรู้สึกของตนเอง โดยหลังผู้ใช้ระบาย อารมณ์จะถูกวิเคราะห์และบันทึกข้อมูลลงใน Mood Diary เพื่อให้สามารถย้อนกลับมาสังเกตแนวโน้มอารมณ์ของตนเองในแต่ละวันได้\n\nนอกจากนี้ยังมี AI Buddy ที่สามารถวิเคราะห์อารมณ์ รับฟัง และตอบโต้ผู้ใช้ได้ทันทีหลังจากพิมพ์ข้อความ รวมถึงฟังก์ชัน แชร์เพลง สำหรับแบ่งปันเพลงเพื่อฮีลใจกัน, Grounding & Breathing Exercise สำหรับฝึกการหายใจและผ่อนคลาย, แบบประเมินสุขภาพจิตเบื้องต้น และอื่น ๆ อีกมากมาย\n\nจากวิสัยทัศน์ที่ตรงกันของทีมผู้บริหารและครูแนะแนว โรงเรียนสวนกุหลาบวิทยาลัย ธนบุรี จึงได้ต่อยอดเว็บไซต์เป็น “Sabaijai X SKT Students” สำหรับนักเรียนภายในโรงเรียนโดยเฉพาะ เพื่อเป็นระบบสนับสนุนและดูแลช่วยเหลือนักเรียน พร้อมเพิ่มฟังก์ชันสำหรับครูแนะแนวเพื่อให้สามารถติดตามภาพรวมความรู้สึกของนักเรียนและทำงานได้อย่างมีประสิทธิภาพมากขึ้น\n\nโครงการนี้ยังได้รับคำแนะนำและการสนับสนุนจาก พญ. สิริกัญญา สมบูรณ์ยิ่ง จิตแพทย์เด็กและวัยรุ่น โรงพยาบาลนครพิงค์ เพื่อให้แนวคิดและการออกแบบเว็บไซต์นี้มีความเหมาะสมกับบริบทด้านสุขภาพจิตของผู้ใช้งานมากยิ่งขึ้น",
  },
  {
    id: "story-proj-thaiailens",
    slug: "thaiailens",
    name: "ThaiAI Lens - ห้องทดลองปัญญาประดิษฐ์ภาษาไทยผ่านสื่อภาพแบบโต้ตอบ",
    category: "project",
    institution: "น้องวิน · สาธิต มศว ประสานมิตร (ฝ่ายมัธยม)",
    faculty: "NSC ครั้งที่ 28 · Interactive Visualization-based AI Learning",
    quote:
      "ผลที่ได้รับ: เว็บแอปพลิเคชันห้องทดลองปัญญาประดิษฐ์ภาษาไทยแบบโต้ตอบครบวงจร 11 หมวด 4 ระดับ พร้อมระบบสำรวจชุดข้อมูลไทย และ AI แนะนำคอนเซ็ปต์ในเบราว์เซอร์",
    image: "/images/projects/thaiai-lens-cover.webp",
    url: "",
    details:
      "เว็บแอปพลิเคชัน \"ThaiAI Lens\" ได้รับการพัฒนาขึ้นโดยมีวัตถุประสงค์เพื่อส่งเสริมให้ผู้เรียนชาวไทย ก้าวจากการเป็น \"ผู้ใช้เทคโนโลยีปัญญาประดิษฐ์\" ไปสู่การเป็น \"ผู้สร้างนวัตกรรมปัญญาประดิษฐ์\" ผ่านการเรียนรู้ด้วยสื่อภาพแบบโต้ตอบ สอดรับกับนโยบาย \"AI Love U\" ของกระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม ท่ามกลางสภาวะการขาดแคลนบุคลากรด้านปัญญาประดิษฐ์ของประเทศไทยที่สูงถึง 80,000 คน อย่างไรก็ตาม แหล่งเรียนรู้ปัญญาประดิษฐ์ที่ใช้รูปแบบการเรียนรู้ผ่านสื่อภาพแบบโต้ตอบ (Interactive Visualization-based Learning) ซึ่งมีหลักฐานเชิงประจักษ์ว่ามีประสิทธิภาพสูงกว่าการเรียนแบบบรรยายนั้น ส่วนใหญ่เป็นภาษาอังกฤษและมุ่งอธิบายแนวคิดเพียงหัวข้อใดหัวข้อหนึ่งเป็นการเฉพาะ คณะผู้พัฒนาจึงออกแบบเว็บแอปพลิเคชันให้ทำหน้าที่เป็น \"ห้องทดลองปัญญาประดิษฐ์ภาษาไทย\" ที่รวบรวมเนื้อหาไว้อย่างครบวงจรในที่เดียว โดยผู้เรียนสามารถปรับพารามิเตอร์ของแบบจำลองและสังเกตผลลัพธ์ได้แบบเรียลไทม์\n\nเนื้อหาการเรียนรู้ในเว็บแอปพลิเคชันครอบคลุมการเรียนรู้ของเครื่อง (Machine Learning) และการเรียนรู้เชิงลึก (Deep Learning) ทั้ง 11 หมวด จัดเรียงเป็น 4 ระดับ ตั้งแต่ระดับรากฐาน (คณิตศาสตร์สำหรับปัญญาประดิษฐ์ การเรียนรู้ของเครื่องคลาสสิก และโครงข่ายประสาทเทียมพื้นฐาน) ระดับปัญญาประดิษฐ์ตามประเภทข้อมูล (ตาราง รูปภาพ ข้อความ และเสียง) ระดับเทคนิคขั้นสูง (ปัญญาประดิษฐ์เชิงสร้างสรรค์และปัญญาประดิษฐ์เชิงตัวแทน) ไปจนถึงระดับการประยุกต์ใช้และจริยธรรมของปัญญาประดิษฐ์ โดยผู้เรียนสามารถเลือกเรียนรู้ตามระดับเพื่อปูพื้นฐานอย่างเป็นระบบ หรือเลือกเข้าสู่หมวดที่สนใจได้โดยตรงตามความต้องการ\n\nเว็บแอปพลิเคชันประกอบด้วย 3 ฟังก์ชันหลัก ได้แก่:\n• สื่อภาพแบบโต้ตอบ (Interactive Visualization): ระบบนำเสนอเนื้อหาการเรียนรู้ของเครื่องและการเรียนรู้เชิงลึกในรูปแบบสื่อภาพที่ผู้เรียนสามารถปรับพารามิเตอร์ของแบบจำลอง อาทิ ค่าน้ำหนัก ค่าเรียนรู้ และจำนวนชั้นของโครงข่ายประสาทเทียม พร้อมสังเกตผลลัพธ์การเปลี่ยนแปลงได้แบบเรียลไทม์ ประกอบกับคำอธิบายว่าผลลัพธ์เปลี่ยนแปลงอย่างไรและเพราะเหตุใด\n• พื้นที่สำรวจชุดข้อมูล (Thai Dataset Explorer): ระบบจัดเตรียมชุดข้อมูล 3 ชุด ได้แก่ Wisesight Sentiment Corpus, Wongnai Reviews และ CIFAR-10 พร้อมสื่อภาพการวิเคราะห์ในหลากหลายมุมมอง อาทิ การกระจายของป้ายกำกับ การลดมิติด้วย t-SNE และ UMAP ตารางความสับสน (Confusion Matrix) และแผนที่ความร้อนของแบบจำลอง ซึ่งช่วยให้ผู้เรียนเข้าใจขั้นตอนการทำงานของปัญญาประดิษฐ์ครบวงจร\n• ค้นพบคอนเซ็ปต์ตามบริบท (Context-aware Concept Discovery): ระบบประยุกต์ใช้เทคนิคการฝังตัวเชิงความหมาย (Semantic Embedding) ในการแนะนำคอนเซ็ปต์ปัญญาประดิษฐ์ที่เหมาะสมกับบริบทและความสนใจของผู้เรียนแต่ละคน โดยรับข้อความโจทย์ภาษาไทยหรือภาษาอังกฤษเป็นข้อมูลนำเข้า\n\nเทคโนโลยีหลักที่นำมาใช้ในระบบ:\nประกอบด้วย Next.js และ React สำหรับการพัฒนาส่วนติดต่อผู้ใช้, ไลบรารี D3.js และ Three.js สำหรับการสร้างสื่อภาพแบบโต้ตอบในสองและสามมิติ, ไลบรารี Transformers.js ร่วมกับโมเดล paraphrase-multilingual-MiniLM-L12-v2 สำหรับฟังก์ชันค้นพบคอนเซ็ปต์ตามบริบทที่ทำงานในเบราว์เซอร์ของผู้ใช้โดยไม่จำเป็นต้องส่งข้อมูลไปประมวลผลที่ฝั่งเซิร์ฟเวอร์ และ Python Offline Pipeline ที่ใช้ไลบรารี scikit-learn, umap-learn และ PyTorch ร่วมกับเทคนิค Gradient-weighted Class Activation Mapping (Grad-CAM) ในการประมวลผลและสร้างสื่อภาพการวิเคราะห์ชุดข้อมูลล่วงหน้า\n\nเว็บแอปพลิเคชันใช้ภาษาไทยเป็นภาษาหลัก พร้อมรองรับการใช้งานเป็นภาษาอังกฤษเพื่อขยายโอกาสในการเข้าถึงผู้เรียนทั้งในและต่างประเทศ ผู้ใช้สามารถเข้าถึงเนื้อหาได้ผ่านเว็บเบราว์เซอร์ทุกที่ทุกเวลา และนำไปประยุกต์ใช้ได้ในหลากหลายบริบท อาทิ การใช้เป็นสื่อประกอบการเรียนการสอนในรายวิชาที่เกี่ยวข้องกับปัญญาประดิษฐ์ และการใช้เป็นแหล่งเรียนรู้สำหรับผู้สนใจทั่วไปที่ต้องการทำความเข้าใจหลักการเชิงลึก การพัฒนาเว็บแอปพลิเคชัน ThaiAI Lens จึงสอดคล้องกับแนวคิดนวัตกรรมเพื่อความยั่งยืน (Sustainable Innovation) ในเชิงสังคมผ่านการลดความเหลื่อมล้ำในการเข้าถึงความรู้ปัญญาประดิษฐ์คุณภาพสูง ในเชิงเศรษฐกิจผ่านการเพิ่มจำนวนบุคลากรพื้นฐานที่จะป้อนเข้าสู่โครงการระดับวิชาชีพของประเทศ และในเชิงสิ่งแวดล้อมผ่านการออกแบบระบบให้ทำงานในลักษณะเว็บแบบสถิต (Static Site) ที่ช่วยลดการใช้พลังงานของเซิร์ฟเวอร์\n\nคำสำคัญ (Keywords): ปัญญาประดิษฐ์ (Artificial Intelligence), การเรียนรู้ของเครื่อง (Machine Learning), การเรียนรู้เชิงลึก (Deep Learning), การเรียนรู้ผ่านสื่อภาพแบบโต้ตอบ (Interactive Visualization-based Learning), เว็บแอปพลิเคชัน (Web Application), การฝังตัวเชิงความหมาย (Semantic Embedding), ปัญญาประดิษฐ์เชิงสร้างสรรค์ (Generative AI), ปัญญาประดิษฐ์เชิงตัวแทน (Agentic AI), จริยธรรมปัญญาประดิษฐ์ (AI Ethics)",
  },
];

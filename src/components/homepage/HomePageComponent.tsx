import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Marquee from "react-fast-marquee";

import { MoreDetailList, posterData } from "~/data/data";

interface Text {
  text1: String;
  text2: String;
  text3: String;
}

export default function HomePageContainer({ text1, text2, text3 }: Text) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const side1 = useTransform(scrollYProgress, [0, 1], ["-79%", "-200%"]);
  const side2 = useTransform(scrollYProgress, [0, 1], ["120%", "200%"]);
  const side3 = useTransform(scrollYProgress, [0, 1], ["120%", "200%"]);

  return (
    <section id="Home" className="flex flex-col items-center">
      <section className="dc-main-hero w-full flex flex-col items-center">
        <div className="h-16 w-32 bg-no-repeat  bg-[url('/images/branding/devcommu-word-dark.webp')] bg-center bg-contain"></div>
        <section className="dc-main-title font-lineSansTH_XB text-center text-cutoff">
          <h1>
            {text1}
            <br />
            <span className="text-primary">{text2}</span>
          </h1>
          <p className="dc-hero-subtitle">{text3}</p>
        </section>
        <p className="font-lineSansTH text-slate-500 max-w-xl mx-4 mt-3">
          ถ้าคุณชอบเทคโนโลยี และอยากลองสร้างผลงานของตัวเอง
          เรียนเขียนโปรแกรมกับ DevCommu ได้ทั้งค่าย Bootcamp
          และติวส่วนตัว 1 ต่อ 1
        </p>
        <p className="font-lineSansTH text-slate-500 max-w-3xl mx-4 mt-2">
          สอนพิเศษคอมพิวเตอร์สำหรับเด็กและเยาวชน เชิงลึกอันดับต้น ๆ
          ของประเทศไทย โดยติวเตอร์นิสิตและบัณฑิตวิศวกรรมศาสตร์
          จุฬาลงกรณ์มหาวิทยาลัย (CEDT) ที่มีประสบการณ์แข่งขัน
          และทำโปรเจกต์จริงทุกคน
        </p>
        <div className="relative z-10 flex flex-wrap justify-center gap-3 my-5 font-lineSansTH">
          <motion.a
            whileHover={{ scale: 1.04 }}
            href="/bootcamps"
            className="dc-btn"
          >
            เลือกค่ายที่สนใจ ↗
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            href="/tutoring"
            className="dc-btn secondary"
          >
            เรียนตัวต่อตัว →
          </motion.a>
        </div>

        {/*SideBar effect Scrolling */}
        <motion.section
          style={{ x: side1 }}
          className={`  pointer-events-none hidden fixed top-[13%] w-[50%] h-96 bg-[url('/images/decor/keyboard.webp')] bg-contain bg-no-repeat md:block`}
        ></motion.section>
        <motion.section
          style={{ x: side2 }}
          className={` pointer-events-none hidden fixed top-[25%] h-96 w-[50%] bg-[url('/images/decor/arduino.webp')] bg-contain bg-no-repeat md:block`}
        ></motion.section>
        <motion.section
          style={{ x: side3 }}
          className={` pointer-events-none hidden fixed top-[20%] h-20 w-[50%] bg-[url('/images/decor/python.webp')] bg-contain bg-no-repeat md:block`}
        ></motion.section>
      </section>
    </section>
  );
}

export function VideoExample() {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = "rVpOLKC47aA";

  return (
    <section className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 lg:my-4 md:mx-auto rounded-xl flex flex-col items-center justify-center">
      <div className="relative w-full pb-[56.25%]">
        {showVideo ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&si=BE_O4EPijalJKa5G`}
            title="YouTube video player"
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <button
            type="button"
            aria-label="เล่นวิดีโอแนะนำ DevCommu"
            onClick={() => setShowVideo(true)}
            className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden cursor-pointer group border-0 p-0 bg-black"
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt="ภาพปกวิดีโอ DevCommu"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 md:w-10 md:h-10 fill-white ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}

export function MarqueePoster() {
  return (
    <section className=" flex space-x-4 md:h-96 h-60 w-[90%] mx-auto bg-zinc-100">
      <Marquee
        gradient={false}
        speed={60}
        pauseOnHover={true}
        className="space-x-4"
      >
        {posterData.map((poster, index) => {
          return (
            <div
              key={index}
              className=" md:h-96 md:w-96 h-60 w-60 mx-3 bg-white"
            >
              <img
                alt={`ภาพบรรยากาศค่ายกิจกรรม DevCommu ที่ ${index + 1}`}
                loading={index < 2 ? "eager" : "lazy"}
                height={"300px"}
                width={"300px"}
                src={poster.img}
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}

export function MoreDetail() {
  return (
    <section>
      <section className="md:flex md:space-x-10 space-y-3  w-[90%] mx-auto my-10 ">
        <section className="flex md:w-[50%] w-full text-start items-start">
          <section className="  w-full font-lineSansTH md:space-y-5 font-bold md:text-5xl text-2xl">
            <p>เมื่อหลักสูตรปัจจุบัน</p>
            <p>อาจตามไม่ทันโลกยุคดิจิทัล</p>
          </section>
        </section>
        <section className="md:w-[50%]   items-start text-start">
          <section className="w-full font-[#64748B] font-lineSansTH text-sm md:text-xl text-left space-y-3">
          <p>
            เทคโนโลยีปัญญาประดิษฐ์ (AI) หุ่นยนต์ (Robotics) หรือ Metaverse
            เข้ามามีบทบาทในโลกทุกวันนี้ โลกหมุนเร็วกว่าที่หลักสูตรปัจจุบันตามทัน
          </p>
          <p>
            ขณะเดียวกัน เด็กไทยที่สนใจสาขาวิชาชีพเหล่านี้มักเจออุปสรรคทางภาษา
            และห้องเรียนที่เน้นการท่องจำมากกว่าการคิด
          </p>
          <p>
            เราจึงนำเสนอการเรียนที่เน้นการสร้างสรรค์ คิดเชิงออกแบบ ลงมือทำ
            และเรียนรู้จากประสบการณ์จริง เพื่อให้น้อง ๆ สนุกกับการเรียนรู้
            และเจอเพื่อนใหม่ที่มีความสนใจเดียวกัน
          </p>
        </section>
        </section>
      </section>
      {/* <section className="flex space-x-10  w-[90%] mx-auto ">
        <section className=" relative overflow-hidden w-[50%] min-h-[50vh] bg-[#E2E8F0] py-10 px-10 text-start rounded-lg items-start">
          <div className=" mb-4 font-lineSansTH font-bold text-[30px]">
            สร้างสื่อการสอนการเขียน<br></br>เข้าถึงการสอนได้ทุกที่
          </div>
          <section className=" absolute w-full h-full mx-auto rounded-xl bg-[url('/images/home/picture-example.webp')] bg-cover bg-center bg-no-repeat ">
            <video controls width="100%" className="rounded-xl">
              <source
                src="/videos/campPromote1/campPromote1.mp4#t=0.1"
                type="video/mp4"
              />
              Sorry, your browser doesn't support videos.
            </video>
          </section>
        </section>
        <section className=" relative overflow-hidden w-[50%] min-h-[50vh] bg-[#E2E8F0] bg-[url('/images/decor/background-we-are.webp')] bg-cover bg-center py-10 px-10 text-start rounded-lg items-start">
          <div className=" mb-4 font-lineSansTH font-bold text-[30px] h-full w-full ">
            สร้างคอมมูนิตี้แบบไฮบริดจ์ <br></br>ในการเรียนรู้ร่วมกัน
          </div>
        </section>
      </section> */}
    </section>
  );
}

export function MoreDetailPopup() {
  return (
    <section className="w-[90%] md:block hidden md:h-auto   mx-auto rounded-lg h-0 px-10 py-10  mt-10 bg-[#E2E8F0]">
      <div className=" mb-4 font-lineSansTH font-bold text-[30px] text-start">
        ฝากนักเรียนให้คิดและลงมือทำ<br></br>ผ่าน Project Based Learning
      </div>
      <div className="flex flex-row space-x-10">
        {/* Card */}
        <section className="flex flex-col space-y-5">
          {MoreDetailList.map((item, index) => {
            return (
              <MoreDetailCard
                key={index}
                detail={item}
                index={index}
              ></MoreDetailCard>
            );
          })}
        </section>
        {/* Student Project */}
        <section className="flex-1 flex flex-col space-y-5 text-center"></section>
      </div>
    </section>
  );
}

function MoreDetailCard(props: { detail: DetailProps; index: number }) {
  return (
    <div className="w-72 h-72 relative">
      <motion.div
        initial={{ width: "18rem", zIndex: 1 }}
        whileHover={{ width: "39rem", zIndex: 20 }}
        className={`h-full  rounded-xl absolute   bg-white flex shadow-lg  group space-x-7 `}
      >
        <div
          className="w-72 h-full bg-contain bg-no-repeat absolute  "
          style={{ backgroundImage: `url(${props.detail.image})` }}
        ></div>
        <motion.div className=" opacity-0 absolute group-hover:opacity-100 transition-all duration-400 invisible group-hover:visible  space-y-3 font-lineSansTH text-start pl-72 w-[39rem] h-full pr-10 py-5">
          <p className="text-3xl font-lineSansTH_XB ">{props.detail.title}</p>
          <p>{props.detail.description}</p>
          <p className="text-primary text-3xl font-lineSansTH_XB">
            {props.detail.title2}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
export interface DetailProps {
  title: string;
  description: string;
  image: string;
  title2: string;
}

export function IntroSection() {
  return (
    <section className="mx-auto w-[90%] max-w-3xl my-14 text-center font-lineSansTH">
      <p className="dc-eyebrow">ABOUT DEVCOMMU</p>
      <h2 className="text-3xl md:text-4xl font-lineSansTH_XB font-bold mb-6">
        DevCommu คืออะไร?
      </h2>
      <div className="text-slate-600 md:text-lg space-y-4">
        <p>
          DevCommu คือกลุ่มสอนเขียนโปรแกรมสำหรับเด็กและเยาวชน
          ก่อตั้งและดูแลโดยนิสิตและบัณฑิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          (CEDT)
        </p>
        <p>
          เราเชื่อว่าการเรียนเขียนโปรแกรมที่ดีต้องลงมือทำจริง ไม่ใช่แค่นั่งฟัง
          ทุกหลักสูตรจึงเน้นโปรเจกต์ที่ใช้งานได้จริง
          ตั้งแต่เกมแรกของน้อง ๆ ไปจนถึงผลงาน Portfolio ที่ใช้ยื่นมหาวิทยาลัย
        </p>
        <p>
          นักเรียนของเราผ่านเข้าค่าย 2 สอวน. คอมพิวเตอร์ คว้าเหรียญการแข่งขัน
          และสอบติด CEDT จุฬาฯ, HKU, สจล. และ IT ลาดกระบัง มาแล้วหลายสิบคน
        </p>
        <p>
          ก่อตั้งมากว่า 4 ปี เราจัดค่ายไปแล้วกว่า 50 รอบ
          และดูแลนักเรียนกว่า 2,000 คนทั่วประเทศ
          ทั้งแบบเจอหน้ากันและเรียนออนไลน์
          หลายคนเริ่มจากศูนย์แล้วกลับมาเป็นพี่ติวเตอร์ให้รุ่นน้องในวันนี้
        </p>
        <p>
          เลือกเรียนได้ 2 รูปแบบ คือค่าย Bootcamp ที่ลงมือทำไปกับเพื่อน
          หรือติวส่วนตัว 1 ต่อ 1 ที่ปรับเนื้อหาตามเป้าหมายของแต่ละคน
          และเมื่อจบคลาส น้อง ๆ ยังฝึกโจทย์ต่อได้ฟรีผ่าน DevCommu Grader
          ระบบตรวจโค้ดออนไลน์ที่เราพัฒนาเอง
        </p>
      </div>
    </section>
  );
}

const subjects: [string, string, string, string, string][] = [
  [
    "พื้นฐานเขียนโปรแกรม",
    "Python, C, C++",
    "เริ่มจากศูนย์ได้ ปูตั้งแต่ตัวแปร เงื่อนไข ลูป ฟังก์ชัน ไปจนถึงโปรเจกต์แรก",
    "/tutoring",
    "ดูคอร์สตัวต่อตัว →",
  ],
  [
    "สอวน. คอมพิวเตอร์",
    "ติวเข้ม C/C++ · Algorithm",
    "ครอบคลุม Data Structure และ Algorithm พร้อมฝึกโจทย์ผ่าน DevCommu Grader ทุกสัปดาห์",
    "/blog/เตรียมสอบ-สอวน-คอมพิวเตอร์-2569",
    "อ่านคู่มือเตรียมสอบ →",
  ],
  [
    "Web Development",
    "HTML · CSS · JavaScript",
    "ทำเว็บจริงตั้งแต่หน้าแรกจนถึงการ Deploy ให้คนอื่นใช้งานได้",
    "/bootcamps",
    "ดูค่ายเว็บ →",
  ],
  [
    "Data Science & AI",
    "Python · Machine Learning",
    "วิเคราะห์ข้อมูลจริง สร้างและทดลองโมเดล AI ตั้งแต่พื้นฐาน",
    "/bootcamps",
    "ดูค่าย Data & AI →",
  ],
  [
    "Portfolio เข้ามหาวิทยาลัย",
    "TCAS รอบ Portfolio",
    "วางแผนผลงานตั้งแต่เลือกหัวข้อ พัฒนา จนถึงเตรียมเล่าในการสัมภาษณ์",
    "/blog/สร้าง-portfolio-เข้า-มหาวิทยาลัย-สาย-คอมพิวเตอร์",
    "อ่านวิธีสร้าง Portfolio →",
  ],
  [
    "เรียนพิเศษคอม ม.ปลาย",
    "ม.4 ถึง ม.6",
    "คอร์สเฉพาะทางสำหรับนักเรียน ม.ปลาย ที่มีเป้าหมายชัดเจนเรื่องการเข้ามหาวิทยาลัย",
    "/เรียนพิเศษคอมพิวเตอร์-ม-ปลาย",
    "ดูรายละเอียด ม.ปลาย →",
  ],
];

export function SubjectsStrip() {
  return (
    <section className="mx-auto w-[90%] max-w-6xl my-14 font-lineSansTH">
      <p className="dc-eyebrow">WHAT YOU CAN LEARN</p>
      <h2 className="text-3xl md:text-4xl font-lineSansTH_XB font-bold mb-8">
        เรียนอะไรกับ DevCommu ได้บ้าง?
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-left">
        {subjects.map(([title, sub, desc, href, link]) => (
          <article
            key={title}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:-translate-y-1 transition-transform"
          >
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-xs font-semibold text-primary mb-2">{sub}</p>
            <p className="text-sm text-slate-500 mb-4">{desc}</p>
            <a href={href} className="text-primary font-semibold text-sm">
              {link}
            </a>
          </article>
        ))}
      </div>
      <p className="text-slate-500 text-sm mt-6">
        ไม่แน่ใจว่าควรเริ่มจากอะไร? ทักมาคุยกับพี่ ๆ ได้ฟรี
        เราจะช่วยแนะนำเส้นทางที่เหมาะกับระดับและเป้าหมายของคุณ
      </p>
    </section>
  );
}

export function WhyBand() {
  const reasons: [string, string][] = [
    [
      "ผู้สอนตัวจริงจาก CEDT จุฬาฯ",
      "ทุกคนเป็นนิสิตและบัณฑิตวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ที่ผ่านการแข่งขันและทำโปรเจกต์จริง ไม่ใช่แค่ผู้สอนตามหนังสือ",
    ],
    [
      "เน้นลงมือทำ ไม่ใช่แค่ฟัง",
      "ทุกหลักสูตรจบด้วยผลงานที่น้อง ๆ สร้างเอง ตั้งแต่เกมสั้น ๆ ไปจนถึงเว็บแอปพลิเคชันที่มีคนใช้จริง",
    ],
    [
      "ผลลัพธ์พิสูจน์ได้",
      "นักเรียนของเราผ่าน สอวน. ค่าย 2 คว้ารางวัล Hackathon ระดับประเทศ และสอบติดคณะวิศวะคอมพิวเตอร์ของมหาวิทยาลัยชั้นนำทั้งในและต่างประเทศ",
    ],
  ];
  return (
    <section className="mx-auto w-[90%] max-w-5xl my-14 font-lineSansTH">
      <p className="dc-eyebrow">WHY DEVCOMMU</p>
      <h2 className="text-3xl md:text-4xl font-lineSansTH_XB font-bold mb-8">
        ทำไมน้อง ๆ และผู้ปกครองเลือกเรา?
      </h2>
      <div className="grid gap-4 md:grid-cols-3 text-left">
        {reasons.map(([title, desc]) => (
          <article
            key={title}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-slate-500">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HowToStart() {  const steps: [string, string][] = [
    [
      "1. เลือกเป้าหมาย",
      "อยากลองเขียนโค้ด เตรียมสอบ สอวน. หรือสร้างพอร์ตเข้ามหาวิทยาลัย? เริ่มจากตอบคำถามนี้ก่อน แล้วเลือกเส้นทางที่ตรงกับเป้าหมายที่สุด",
    ],
    [
      "2. เริ่มจากรูปแบบที่ใช่",
      "ถ้ายังไม่เคยเขียนโปรแกรม ค่าย Bootcamp สั้น ๆ ช่วยให้เห็นภาพก่อนได้ ถ้ามีเป้าหมายชัดแล้ว การเรียนตัวต่อตัวจะก้าวหน้าเร็วกว่า",
    ],
    [
      "3. ฝึกต่อเนื่อง",
      "ความสม่ำเสมอสำคัญกว่าความเก่ง ฝึกโจทย์บน Grader รีวิวโค้ดกับพี่ ๆ และต่อยอดเป็นผลงานจริงที่น้องเล่าได้เอง",
    ],
  ];
  return (
    <section className="mx-auto w-[90%] max-w-5xl my-14 font-lineSansTH">
      <p className="dc-eyebrow">GET STARTED</p>
      <h2 className="text-3xl md:text-4xl font-lineSansTH_XB font-bold mb-8">
        เริ่มต้นอย่างไรดี?
      </h2>
      <div className="grid gap-4 md:grid-cols-3 text-left">
        {steps.map(([title, desc]) => (
          <article
            key={title}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-2 text-primary">{title}</h3>
            <p className="text-sm text-slate-500">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DevCommuVerse() {
  const platforms = [
    {
      href: "https://posn101.devcommu.org",
      label: "คลังความรู้ สอวน. · ฟรี",
      title: "POSN101",
      subtitle: "เฉลยข้อสอบ สอวน. คอมพิวเตอร์",
      desc: "รวมเฉลยข้อสอบ สอวน. คอมพิวเตอร์ย้อนหลัง พร้อมโค้ดตัวอย่างและวิธีคิดแบบละเอียด ทบทวนจากข้อสอบจริงได้ทุกปี ก่อนเข้าค่ายและก่อนสอบ",
      domain: "posn101.devcommu.org",
      image: "/images/verse/posn101.webp",
      alt: "หน้าจอเว็บไซต์ POSN101 คลังเฉลยข้อสอบ สอวน. คอมพิวเตอร์",
      tags: "เฉลยย้อนหลัง · โค้ดตัวอย่าง · ทบทวนก่อนสอบ",
      cta: "อ่านเฉลยฟรี →",
      dark: false,
    },
    {
      href: "https://grader.devcommu.org",
      label: "Online Judge · ฟรี",
      title: "DevCommu Grader",
      subtitle: "ระบบตรวจโค้ดออนไลน์ของเราเอง",
      desc: "ฝึกโจทย์ภาษา C, C++ และ Python ส่งโค้ดแล้วรู้ผลทันทีแบบเรียลไทม์ โจทย์ภาษาไทยตั้งแต่ระดับเริ่มต้นจนถึงระดับแข่งขัน สอวน. และ TOI",
      domain: "grader.devcommu.org",
      image: "/images/verse/grader.webp",
      alt: "หน้าจอ DevCommu Grader ระบบตรวจโค้ดออนไลน์ แดชบอร์ดสถิติการส่งโจทย์",
      tags: "โจทย์ภาษาไทย · ตรวจเรียลไทม์ · ระดับเริ่มต้นถึงแข่งขัน",
      cta: "เข้าฝึกโจทย์ฟรี →",
      dark: true,
    },
  ];
  return (
    <section className="dc-verse-section font-lineSansTH text-left">
      <div className="dc-section-top">
        <div>
          <p className="dc-eyebrow">OUR ECOSYSTEM</p>
          <h2>DevCommu Verse</h2>
        </div>
        <p className="dc-muted">
          Ecosystem และ platform ที่เราพัฒนามาเพื่อช่วยเหลือการเดินทางของน้อง ๆ
        </p>
      </div>
      <div className="dc-verse-grid">
        {platforms.map((p) => (
          <a
            key={p.domain}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={"dc-path dc-verse" + (p.dark ? " dc-path-private" : "")}
          >
            <div className="dc-path-top">
              <span>{p.label}</span>
              <b aria-hidden="true">↗</b>
            </div>
            <h3>
              {p.title}
              <span>{p.subtitle}</span>
            </h3>
            <p>{p.desc}</p>
            <div className="dc-verse-shot">
              <div className="dc-verse-bar">
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <span>{p.domain}</span>
              </div>
              <img
                src={p.image}
                alt={p.alt}
                width="1280"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="dc-path-bottom">
              <span>{p.tags}</span>
              <strong>{p.cta}</strong>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  const faqs: [string, string][] = [
    [
      "ไม่เคยเขียนโค้ดมาก่อน เริ่มเรียนได้เลยไหม?",
      "ได้เลย ค่าย Bootcamp และคอร์สพื้นฐานของเราออกแบบสำหรับผู้เริ่มต้นโดยเฉพาะ เริ่มตั้งแต่ตัวแปร เงื่อนไข และลูป ไม่ต้องมีพื้นฐานมาก่อน",
    ],
    [
      "ควรเรียนค่ายหรือเรียนตัวต่อตัวดี?",
      "ถ้ายังไม่แน่ใจว่าชอบหรือเปล่า แนะนำค่าย Bootcamp ก่อน เพราะสนุกและได้ลองหลายอย่างในเวลาสั้น ๆ แต่ถ้ามีเป้าหมายชัดเจน เช่น เตรียมสอบ สอวน. หรือทำ Portfolio การเรียนตัวต่อตัวจะก้าวหน้าเร็วกว่า",
    ],
    [
      "อายุเท่าไหร่เริ่มเรียนได้?",
      "นักเรียนของเรามีตั้งแต่ประถมปลายจนถึงมัธยมปลาย เนื้อหาและเครื่องมือจะปรับตามวัยและพื้นฐานของแต่ละคน",
    ],
    [
      "เรียนออนไลน์ได้ไหม?",
      "ได้ ทั้งค่ายและคลาสตัวต่อตัวมีรูปแบบออนไลน์ เรียนได้ทุกที่ทั่วประเทศ หรือเลือกเรียนออนไซต์ในกรุงเทพฯ โซน MRT/BTS",
    ],
    [
      "นอกเวลาเรียนมีอะไรให้ฝึกต่อไหม?",
      "มี น้อง ๆ ฝึกโจทย์ได้ฟรีผ่าน DevCommu Grader ระบบตรวจโค้ดออนไลน์ของเรา และส่งโค้ดกลับมาขอรีวิวกับพี่ ๆ ได้ตลอด",
    ],
  ];
  return (
    <section className="mx-auto w-[90%] max-w-3xl my-14 font-lineSansTH text-left">
      <p className="dc-eyebrow">FAQ</p>
      <h2 className="text-3xl md:text-4xl font-lineSansTH_XB font-bold mb-8">
        คำถามที่พบบ่อย
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map(([q, a]) => (
          <details
            key={q}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm group"
          >
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
              {q}
              <span className="text-primary group-open:rotate-45 transition-transform text-xl leading-none">
                +
              </span>
            </summary>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

const DataFB: FBPage[] = [
  {
    feedback:
      '"ขอบคุณมากๆ สำหรับการดูแลแซนตลอด 3 ปี การก่อร่างสร้าง Port มาด้วยกัน น้องอาจจะเบื่อในบางวัน งอแงในบางครั้ง แต่พี่หมูกรอบก็น่ารักกับน้องมาก"',
    name: "น้องแซน",
    social:
      "เหรียญทองแดง Data Science Contest 2025 · ติด 4 มหาวิทยาลัย (มจธ. / สจล. / มธ. / มก.)",
    image: "/images/students/sannn.webp",
  },
  {
    feedback:
      '"พี่ ๆ ช่วยติวและให้คำปรึกษาทั้งการแข่งขันและการทำโปรเจกต์อย่างเข้มข้น ทำให้กล้าคิดและลงมือทำ จนคว้ารางวัลระดับประเทศและติด CEDT จุฬาฯ ได้สำเร็จ"',
    name: "โปกัส",
    social:
      "ติด CEDT จุฬาฯ · รองชนะเลิศอันดับ 3 Siriraj Hackathon · เหรียญทอง Super AI Season 5",
    image: "/images/students/pogas.webp",
  },
  {
    feedback:
      '"ลุยทั้งสายแข่งโจทย์ สอวน.คอม และการทำโครงงานจริง จนผ่านคัดเลือกระดับภาค NSC และได้รางวัลจาก AI Builders พี่ ๆ ช่วยไกด์วิธีคิดได้ดีมาก"',
    name: "น้องวิน",
    social: "สอวน.คอม ค่าย 2 · ผ่านคัดเลือกระดับภาค NSC · ผู้พัฒนา ThaiAI Lens",
    image: "/images/students/win2.webp",
  },
  {
    feedback:
      '"ต่อยอดทักษะสู่เวทีสากลได้อย่างมั่นใจ พี่ ๆ ช่วยปูพื้นฐานการเขียนโค้ดและพัฒนาโปรเจกต์ที่แข็งแกร่งจนสามารถนำไปยื่นมหาวิทยาลัยระดับโลกได้สำเร็จ"',
    name: "น้องข้าวปั้น",
    social:
      "The University of Hong Kong (HKU) · Faculty of Engineering (Computer Engineering)",
    image: "/images/students/khaopan.webp",
  },
  {
    feedback:
      '"ฝึกการคิดเชิงตรรกะและอัลกอริทึมอย่างเป็นระบบ โจทย์ยาก ๆ ที่เคยกลัวกลายเป็นเรื่องสนุก ผ่านเข้าค่าย 2 สอวน.คอม และสอบติด IT ลาดกระบังตามเป้าหมาย"',
    name: "น้องเคน",
    social: "คณะเทคโนโลยีสารสนเทศ (IT ลาดกระบัง) · สอวน. คอมพิวเตอร์ ค่าย 2",
    image: "/images/students/ken.webp",
  },
  {
    feedback:
      '"เรียนรู้ด้าน AI อย่างจริงจังและเจาะลึก พี่ ๆ คอยไกด์ตั้งแต่การสร้างโมเดลไปจนถึงการแก้ปัญหาจริง จนคว้ารางวัล Super AI Engineer และนำองค์ความรู้ไปต่อยอดในระดับมหาวิทยาลัย"',
    name: "น้องอัส",
    social:
      "เหรียญทองแดง Super AI Engineer Season 5 · ศึกษาต่อ สจล. (ลาดกระบัง)",
    image: "/images/students/us.webp",
  },
  {
    feedback:
      '"เปลี่ยนไอเดียให้กลายเป็นโซลูชันที่จับต้องได้ พี่ ๆ ช่วยแนะนำกระบวนการคิดและพัฒนาผลงานจนคว้ารางวัลชนะเลิศอันดับ 1 และต่อยอดสู่โปรเจกต์จริง"',
    name: "น้องจิวเวอรี่",
    social:
      "1st Place Change Innovation Award 2026 · เหรียญทอง Young Innovator Hackathon 2025",
    image: "/images/students/njew.webp",
  },
  {
    feedback:
      '"ปูพื้นฐาน Algorithm และฝึกแก้โจทย์แข่งขันอย่างเป็นขั้นตอน ช่วยให้จับจุดข้อสอบได้แม่นยำ จนผ่านเข้าค่าย 2 สอวน.คอม และสอบติด CEDT จุฬาฯ"',
    name: "น้องทีม",
    social: "สอวน. คอมพิวเตอร์ ค่าย 2 · สอบติด CEDT จุฬาลงกรณ์มหาวิทยาลัย",
    image: "/images/students/tim.webp",
  },
  {
    feedback:
      '"เจาะลึกทั้งพื้นฐานคอมพิวเตอร์และด้าน Cybersecurity ได้ลงมือปฏิบัติจริง ช่วยให้มั่นใจทั้งตอนทำผลงานและการสอบสัมภาษณ์เข้ามหาวิทยาลัย"',
    name: "น้องโอ๊ต",
    social: "วิศวกรรมคอมพิวเตอร์และความปลอดภัยไซเบอร์ (KMITL)",
    image: "/images/students/oat.webp",
  },
  {
    feedback:
      '"ผมยังจำได้อยู่เลย วันแรกที่เรียนกับพี่คอร์ส Computer Vision พี่เอารูปเกม XO มาแล้วถามว่าเราจะแยก X กับ O ยังไง ผมตอบว่า Object Detection พี่บอกมันเวอร์เกินไป ดูสีก็ดูได้แล้ว มันทำให้ผมชอบ Computer Vision ขึ้นมาเลย"',
    name: "น้องพร้อม",
    social: "สอบติด CEDT จุฬาลงกรณ์มหาวิทยาลัย",
    image: "/images/students/prom.webp",
  },
];

export function FeedBackPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <section className="dc-reviews" aria-labelledby="reviews-heading">
      <div className="dc-reviews-heading">
        <div>
          <p className="dc-eyebrow">รีวิวจากน้อง ๆ</p>
          <h2 id="reviews-heading">
            น้อง ๆ ในโครงการ
            <br />
            พูดถึง DevCommu ว่ายังไงบ้าง?
          </h2>
        </div>
        <div className="dc-review-controls">
          <button
            aria-label="รีวิวก่อนหน้า"
            onClick={() =>
              setCurrentIndex(
                (currentIndex + DataFB.length - 1) % DataFB.length
              )
            }
          >
            ←
          </button>
          <span aria-live="polite">
            {currentIndex + 1} / {DataFB.length}
          </span>
          <button
            aria-label="รีวิวถัดไป"
            onClick={() => setCurrentIndex((currentIndex + 1) % DataFB.length)}
          >
            →
          </button>
        </div>
      </div>
      <div className="dc-reviews-viewport">
        <div className="dc-reviews-stack">
          {DataFB.map((review, index) => (
            <div
              key={review.name}
              className="dc-review-slide"
              aria-hidden={index !== currentIndex}
              style={{
                opacity: index === currentIndex ? 1 : 0,
                visibility: index === currentIndex ? "visible" : "hidden",
                pointerEvents: index === currentIndex ? "auto" : "none",
              }}
            >
              <FeedBackCard {...review} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        {DataFB.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`ไปที่รีวิวที่ ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? "w-7 h-2 bg-[#e57192] shadow-sm"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

interface FBPage {
  feedback: string;
  name: string;
  social: string;
  image: string;
}

export function FeedBackCard({ feedback, name, social, image }: FBPage) {
  return (
    <motion.section whileHover={{ y: -4 }} className="dc-review-card text-left">
      <div className="mb-5 md:text-xl text-lg leading-relaxed text-slate-800">
        {feedback}
      </div>
      <div className="flex space-x-4 items-center">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            width="80"
            height="80"
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shrink-0 border-2 border-primary/20 shadow-md"
            style={
              image.includes("us.")
                ? { objectPosition: "center top" }
                : { objectPosition: "center 18%" }
            }
          />
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-2xl shrink-0 border-2 border-primary/20 shadow-md">
            {name.slice(0, 1)}
          </div>
        )}
        <div>
          <div className="font-bold md:text-xl text-lg text-slate-900">
            {name}
          </div>
          <div className="md:text-sm text-xs text-[#989DA5] leading-snug">
            {social}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

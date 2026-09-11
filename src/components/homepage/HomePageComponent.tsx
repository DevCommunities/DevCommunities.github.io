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
          ค่ายกิจกรรมและเรียนตัวต่อตัว สำหรับคนที่อยากเริ่มเขียนโปรแกรม
          เตรียมสอบ หรือสร้างพอร์ต
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
                <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-white ml-1">
                  <path d="M8 5v14l11-7z"/>
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
          <section className="w-full text-[#64748B] font-lineSansTH text-sm md:text-xl text-left">
            เทคโนโลยีปัญญาประดิษฐ์ (AI) หุ่นยนต์ (Robotics) หรือ
            Metaverseเข้ามามีบทบาท โลกทุกวันนี้หมุนเร็วมาก
            ขณะเดียวกันเด็กไทยที่สนใจสาขาวิชาชีพเหล่านี้ประสบปัญหาอุปสรรคทางภาษา
            และการเดินตามกระบวนการคิดในห้องเรียนที่เน้นการท่องจำ
            เราจึงพยายามนำเสนอการเรียนในด้านที่ใหม่กว่า
            ที่เน้นการสร้างสรรค์และคิดเชิงออกแบบ ลงมือทำ
            และเรียนรู้จากประสบการณ์จริง
            เพื่อให้น้องๆได้รับรู้ถึงความสนุกของการเรียนรู้
            รวมถึงสร้างการพบเจอกับเพื่อนใหม่ ที่มีความสนใจเดียวกัน
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
    social:
      "สอวน.คอม ค่าย 2 · ผ่านคัดเลือกระดับภาค NSC · ผู้พัฒนา ThaiAI Lens",
    image: "/images/students/win.webp",
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
    social:
      "คณะเทคโนโลยีสารสนเทศ (IT ลาดกระบัง) · สอวน. คอมพิวเตอร์ ค่าย 2",
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
    social:
      "สอวน. คอมพิวเตอร์ ค่าย 2 · สอบติด CEDT จุฬาลงกรณ์มหาวิทยาลัย",
    image: "/images/students/tim.webp",
  },
  {
    feedback:
      '"เจาะลึกทั้งพื้นฐานคอมพิวเตอร์และด้าน Cybersecurity ได้ลงมือปฏิบัติจริง ช่วยให้มั่นใจทั้งตอนทำผลงานและการสอบสัมภาษณ์เข้ามหาวิทยาลัย"',
    name: "น้องโอ๊ต",
    social:
      "วิศวกรรมคอมพิวเตอร์และความปลอดภัยไซเบอร์ (KMITL)",
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
  const reviews = [DataFB[DataFB.length - 1], ...DataFB, DataFB[0]];
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
                (currentIndex + DataFB.length - 1) % DataFB.length,
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
        <motion.div
          className="dc-reviews-track"
          animate={{
            x: `calc((100% - var(--review-width)) / 2 - ${currentIndex + 1} * (var(--review-width) + 24px))`,
          }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="dc-review-slide"
              aria-hidden={index !== currentIndex + 1}
              style={{ opacity: index === currentIndex + 1 ? 1 : 0.45 }}
            >
              <FeedBackCard {...review} />
            </div>
          ))}
        </motion.div>
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
      <div className="mb-5 md:text-xl text-lg leading-relaxed text-slate-800">{feedback}</div>
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
            style={image.includes("us.") ? { objectPosition: "center top" } : { objectPosition: "center 18%" }}
          />
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-2xl shrink-0 border-2 border-primary/20 shadow-md">
            {name.slice(0, 1)}
          </div>
        )}
        <div>
          <div className="font-bold md:text-xl text-lg text-slate-900">{name}</div>
          <div className="md:text-sm text-xs text-[#989DA5] leading-snug">{social}</div>
        </div>
      </div>
    </motion.section>
  );
}

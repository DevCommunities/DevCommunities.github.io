import { type SlideProjectProps } from "~/components/project/ProjectPageComponent";
import { type AboutUs } from "~/components/about/AboutUsPageComponent";
import { type DetailProps } from "~/components/homepage/HomePageComponent";
import type { NavData } from "./data.type";

export const navdata: NavData[] = [
  { title: "หน้าแรก", href: "/" },
  { title: "ค่ายกิจกรรม", href: "/bootcamps" },
  { title: "เรียนส่วนตัว", href: "/tutoring" },
  { title: "ความสำเร็จ", href: "/success" },
  { title: "ทีมงาน", href: "/team" },

];

// ------- Founders, Mentors, and Tutors Details -------
export const About: AboutUs[] = [
  {
    people: [
      {
        name: "พี่หมูกรอบ",
        description:
          "จบการศึกษาจากคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย · Managing Director ของ DevCommu รวมถึงเป็น CEO บริษัท Startup 'Remetrix' ที่ Spin-off จากจุฬาฯ",
        role: "Managing Director / ติวเตอร์ Web Dev, Data Science & AI",
        img: "/images/about/Mookrob.webp",
      },
      {
        name: "พี่โชคดี",
        description:
          "จบการศึกษาจากคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย · เหรียญทองแดงคอมพิวเตอร์โอลิมปิกระดับชาติ (TOI) · เชี่ยวชาญการพัฒนาเว็บไซต์ สร้างเกม และการให้คำปรึกษาทำโปรเจกต์",
        role: "Head of Tutors / ติวเตอร์ Web Dev, Game Dev & Consult Project",
        img: "/images/about/Chokdee.webp",
      },
    ],
  },
  {
    people: [
      {
        name: "พี่ไกด์",
        description:
          "จบการศึกษาจากคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย · เจ้าของ Software House เชี่ยวชาญงานพัฒนาซอฟต์แวร์ เว็บไซต์ และระบบ AI อย่างลึกซึ้ง",
        role: "ติวเตอร์ Web Dev, AI & Consult Project / เจ้าของ Software House",
        img: "/images/about/Guide.webp",
      },
      {
        name: "พี่เซย์ไฮ",
        description:
          "นิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย (CEDT) · ตัวแทนศูนย์ สอวน. มจพ. ในการแข่งขัน Thailand Olympiad in Informatics ครั้งที่ 19 (TOI 19th) และ Achieved Global Rank 35 จาก 8,000 ทีมในการแข่งขัน IEEEXtreme (19 Oct 2025)",
        role: "ติวเตอร์ สอวน. คอมพิวเตอร์ & Competitive Programming",
        img: "/images/about/SayHi.webp",
      },
    ],
  },
  {
    people: [
      {
        name: "พี่จีจี้",
        description:
          "นิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย (CEDT) · มีประสบการณ์ด้าน Competitive Programming เข้าร่วมค่าย สอวน.คอมพิวเตอร์ 3 ปีซ้อน ตั้งแต่ปี 2564 (ค่าย 2) และได้เป็นผู้แทนศูนย์ในการแข่งขัน TOI 19-20 (ปี 2565-2566) พร้อมประสบการณ์ติวนักเรียนเตรียมสอบโอลิมปิกวิชาการคอมพิวเตอร์โดยตรง",
        role: "ติวเตอร์ สอวน. คอมพิวเตอร์ & Competitive Programming",
        img: "/images/about/Gigi.webp",
      },
    ],
  },
];

// ------- Our Camps History -------
export const SlideProjectList: SlideProjectProps[] = [
  {
    slug: "dev1",
    title: "ค่าย DevCommu x โรงเรียนนวมิทร์ทราชูทิศ สตรีวิทยา 2",
    type: "DATA BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/001_data_boot_camp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/001_data_boot_camp/thumbnail/horizon.webp",
    },
    description:"ค่ายปููพื้นฐานภาษา Python และ Data Analytics, สำหรับน้องๆ ที่สนใจเรียนรู้เกี่ยวกับการวิเคราะห์ข้อมูลด้วย Python โดยจัดร่วมกับโรงเรียนนวมิทร์ทราชูทิศ สตรีวิทยา 2",
    date: "12",
    month: "กุมภาพันธ์",
    year: "2564",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev2",
    title: "ค่าย DevCommu x โรงเรียนนวมิทร์ทราชูทิศ สตรีวิทยา 2",
    type: "PYTHON BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/002_python_boot_camp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/002_python_boot_camp/thumbnail/horizon.webp",
    },
    description:
      "ค่ายปูพื้นฐานภาษา Python และการทำ Event Based UI ด้วย Custom Tkinter กับน้องๆชั้นมัธยมปลายโดยได้รับการสนับสนุนจาก โรงเรียนนวมิทร์ทราชูทิศ สตรีวิทยา 2",
    date: "20",
    month: "มิถุนายน",
    year: "2565",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev3",
    title: "ค่าย DevCommu ครั้งที่ 3 Make AI Drive Your Dream",
    type: "AI BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/003_ai_boot_camp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/003_ai_boot_camp/thumbnail/vertical.webp",
    },
    description:
      "ค่าย DEVCOMMU ที่ในครั้งนี้จะพาน้องๆ ไปพบการทำ AI แบบ Project based learning ที่จะทำให้น้องๆได้ลงมือทำโปรเจคต์ AI ของตัวเอง ที่คิดขึ้นมาเอง ด้วยตัวเอง ให้กลายเป็นโปรเจ็คคุณภาพ",
    date: "28",
    month: "ตุลาคม",
    year: "2566",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev4",
    title: "DevCommu 4 : Intro to Natural Language Processing",
    type: "AI BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/004_intro_to_nlp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/004_intro_to_nlp/thumbnail/vertical.webp",
    },
    description:
      "ค่าย 2วันที่จะพาน้องๆไปดื่มด่ำกับโลกของ AI ด้านภาษา โดยน้องๆจะได้เริ่มตั้งแต่การเรียนการเขียนโปรแกรมพื้นฐานไปจนถึงการสร้าง AI ที่เข้าใจภาษาของมนุษย์ขึ้นมา!",
    date: "28",
    month: "มกราคม",
    year: "2567",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev5",
    title: "POSN Camp at PCSHS PL",
    type: "POSN CAMP",
    images: {
      horizontal: "/images/works/camps/005_pcshs_pl_posn_camp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/005_pcshs_pl_posn_camp/thumbnail/horizon.webp",
    },
    description:
      "ค่ายพื้นฐานการเขียนโปรแกรมสำหรับการสอบเข้า ค่ายสอวนคอมพิเตอร์ค่าย 2  จัดให้กับนักเรียนโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย พิษณุโลก",
    date: "12",
    month: "กุมภาพันธ์",
    year: "2564",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev6",
    title: "Arduino Bootcamp",
    type: "PYTHON BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/006_arduino_bootcamp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/006_arduino_bootcamp/thumbnail/vertical.webp",
    },
    description:
      "ค่ายเรียนการพัฒนาอุปกรณ์ IOT จาก Arduino และอุปกรร์ต่างๆ เป็นค่ายออนไซต์ 2 วันที่สอนตั้งแต่เนื้อหาพื้นฐานของบอร์ดและการเขียนโปรแกรม ไปจนถึงการพัฒนาโปรเจคเล็กๆของน้องๆเอง",
    date: "12",
    month: "มีนาคม",
    year: "2564",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev7",
    title: "GameDev Bootcamp",
    type: "GameDev BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/007_godot_gamedev_camp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/007_godot_gamedev_camp/thumbnail/vertical.webp",
    },
    description:
      "ค่ายสอนสร้างเกมด้วย Godot Engine พาน้องๆไปรู้จัก GD script รวมถึงองค์ประกอบจำเป็นต่างๆในการสร้างเกม และได้ลองสร้างเกม 2D สุดคลาสสิคในแบบของตัวเองขึ้นมา",
    date: "12",
    month: "มกราคม",
    year: "2564",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev7",
    title: "Machine Learning Bootcamp | Intro to Image Processing",
    type: "DATA BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/009_intro_to_image_processing/thumbnail/horizon.webp",
      vertical: "/images/works/camps/009_intro_to_image_processing/thumbnail/vertical.webp",
    },
    description:
      "ค่าย Machine Learning สายภาพ น้องได้เรียนรู้ทักษะเขียนโปรแกรมพื้นฐาน และได้นำไปใช้ในการเรียนรู้ด้าน Image Processing และ Computer Vision และได้ทำโปรเจค Machine Learning เจ๋งไเป็นของตัวเองอีกด้วย",
    date: "12",
    month: "กุมภาพันธ์",
    year: "2564",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
  {
    slug: "dev8",
    title: "Arduino Bootcamp | Let’s Build a car",
    type: "PYTHON BOOTCAMP",
    images: {
      horizontal: "/images/works/camps/008_arduino_rc_camp/thumbnail/horizon.webp",
      vertical: "/images/works/camps/008_arduino_rc_camp/thumbnail/vertical.webp",
    },
    description:
      "ค่ายอุปกรณ์ Arduino โดยในรอบนี้เรามาในหัวข้อพิเศษ Let’s build a car ซึ่งเราจะมาโฟกัสกันที่การใช้อุปกรณ์ต่างทั้ง Arduino และอื่นเพื่อใช้ในการสร้างรถบังคับผ่าน มือถือขึ้นมา โดยน้องๆ สามารถที่จะสร้างสรรค์รถสไตล์พิเศษแบบที่ไม่เหมือนใครได้เลย!",
    date: "12",
    month: "มีนาคม",
    year: "2564",
    show: false,
    imageDetail: [
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
      "/images/project/camp/dev1/1.png",
      "/images/project/camp/dev1/2.png",
      "/images/project/camp/dev1/3.png",
      "/images/project/camp/dev1/4.png",
    ],
    schedule: [
      [
        "Basic GD Script",
        "Basic GoDot",
        "Basic Nodes",
        "Physics Process",
        "Frames & Time",
      ],
      [
        "Charactor Control",
        "Background",
        "Animation",
        "Collision",
        "Interface and Health logic",
      ],
      [
        "Creating enemies",
        "Create Scene",
        "Design Level",
        "Create your own level",
      ],
    ],
    projectExam: [
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
      {
        title: "เครื่องปรับอากาศไม่ใช้ไฟฟ้า",
        author: "หิรัญกุล พิมพ์ศิริ",
        description:
          "รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด",
        image: "/images/project/camp/dev1/archive/archive1.png",
      },
    ],
    constructor: [
      {
        img: "/images/works/instructor/guide.webp",
        name: "พี่ไกด์",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/mookrob.webp",
        name: "พี่หมูกรอบ",
        describtion: "Chula CEDT",
      },
      {
        img: "/images/works/instructor/tak.webp",
        name: "พี่แท็ค",
        describtion: "Chula CEDT",
      },
    ],
  },
];

// --------- Course Data ------------
export const posterData = [
  // { img: "/images/homepage/poster/poster0.webp" }, // We Off Poster that shown the price
  { img: "/images/homepage/poster/poster1.webp" },
  { img: "/images/homepage/poster/poster2.webp" },
  { img: "/images/homepage/poster/poster3.webp" },
  // { img: "/images/homepage/poster/poster4.webp" },
  // { img: "/images/homepage/poster/poster5.webp" },
  { img: "/images/homepage/poster/poster6.webp" },
  { img: "/images/homepage/poster/poster7.webp" },
];

export const MoreDetailList: DetailProps[] = [
  {
    title: "วางแผนและคิดอย่างเป็นระบบ",
    description:
      "กระตุ้นให้นักเรียนคิดวิเคราะห์และวางแผนการทำงาน เพื่อพัฒนาทักษะการแก้ปัญหาอย่างมีประสิทธิภาพ",
    image: "/images/homepageStand1.webp",
    title2: "Thinking and Planning",
  },
  {
    title: "ค้นคว้าและเรียนรู้",
    description:
      "ให้นักเรียนหาข้อมูลและเรียนรู้เกี่ยวกับโครงการที่ต้องการทำ ฝึกการวิจัยและการเรียนรู้อย่างลึกซึ้ง",
    image: "/images/homepageStand2.webp",
    title2: "Research and Learning",
  },
  {
    title: "ลงมือทำและพัฒนา",
    description:
      "ให้นักเรียนลงมือปฏิบัติและพัฒนาผลงานของตนเอง ฝึกการทำงานเป็นขั้นตอนและการแก้ปัญหาที่เกิดขึ้น",
    image: "/images/homepageStand3.webp",
    title2: "Implementation and Development",
  },
  {
    title: "สร้างสรรค์ผลงาน",
    description:
      "ผ่านการฝึกฝนและทดลองต่างๆ จนสร้างขึ้นมาเป็นผลงานหรือวิธีการแก้ปัญหาที่ถูกต้องและพัฒนาผลงานชิ้นใหม่ของตัวเอง",
    image: "/images/homepageStand4.webp",
    title2: "Create and Innovate",
  },
];

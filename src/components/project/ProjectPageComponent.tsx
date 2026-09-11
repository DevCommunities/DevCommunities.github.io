import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import { SlideProjectList } from "~/data/data";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";

interface ProjectPageComponentProps {
  text1: string;
  text2: string;
  text3: string;
  buttonText: string;
}

function Slug(title: string) {
  return (
    title
      // remove leading & trailing whitespace
      .trim()
      // remove special characters
      .replace(/[^A-Za-z0-9 ]/g, "")
      // replace spaces
      .replace(/\s+/g, "-")
      // remove leading & trailing separtors
      .replace(/^-+|-+$/g, "")
      // output lowercase
      .toLowerCase()
  );
}

export default function ProjectPageComponent(props: ProjectPageComponentProps) {
  const { text1, text2, text3, buttonText } = props;
  return (
    <section>
      <section className="mt-20">
        <img
          src="/images/branding/devcommu-word-dark.webp"
          alt="DarkDevCommuWord"
          className="h-4 max-w-80 mb-6 mx-auto"
        />
        <section className="font-lineSansTH_XB md:text-5xl text-2xl md:space-y-3">
          <h1>
            {text1} <span className="text-primary"> {text2}</span>
          </h1>
          <p>{text3}</p>
        </section>
        <motion.button
          whileHover={{ scale: 1.04 }}
          className="h-10 p-auto px-7 font-lineSansTH font-bold text-white bg-primary rounded-full my-5 hover:bg-[#c96380] transition-colors duration-200
      "
        >
          {buttonText}
        </motion.button>
      </section>
    </section>
  );
}

export function ProjectCard(props: {
  project: SlideProjectProps;
  className?: string;
}) {
  return (
    // crop fill
    <div
      className={`h-full group ${props.className} font-lineSansTH text-center`}
    >
      <div
        className={`
        h-full bg-center bg-cover bg-no-repeat bg-primary rounded-3xl hover:bg-opacity-90 transition-all duration-500 hover:cursor-pointer`}
        style={{ backgroundImage: `url(${props.project.images.vertical})` }}
      >
        {/* explanation card */}
        <a
          // TODO: Off Unfinished SLUG page, AS it's not ready
          // href={`/project/${props.project.slug}`}
          className="group-hover:bg-opacity-90 group-hover:block h-full bg-accent-secondary bg-opacity-0 rounded-3xl trasition-all duration-500"
        >
          <div className="flex flex-col justify-center h-full p-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="text-2xl font-bold text-primary">
              {props.project.title}
            </h3>
            <p className="text-cutoff mt-3">{props.project.description}</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export function SlidingProjects({ className }: { className?: string }) {
  return (
    <div className="sticky top-20 z-10 md:mt-10">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className={`w-screen h-96${className ?? ""}`}
      >
        {SlideProjectList?.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="md:w-72 md:h-96 h-72 w-56 bg-white rounded-3xl shadow-lg md:mx-5 mx-2  group"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
}

export interface SlideProjectProps {
  slug: string;
  title: string;
  description: string;
  images: {
    horizontal: string;
    vertical: string;
  };
  type: string;
  date: string;
  month: string;
  year: string;
  show: any;
  imageDetail: string[];
  schedule: string[][];
  projectExam: {
    title: string;
    description: string;
    image: string;
    author: string;
  }[];
  constructor: { img: string; name: string; describtion: string }[];
}

export function SlideProjectCard(props: { project: SlideProjectProps }) {
  const [ref, inView] = useInView({
    rootMargin: "-420px 0px",
  });
  const isMediumScreen = () => {
    const mdQuery = window.matchMedia("(min-width: 768px)");
    return mdQuery.matches;
  };

  return (
    <div className="flex  relative">
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        className="  h-full text-end text-white md:-mr-14 -ml-20  py-4 font-lineSansTH font-bold  "
      >
        <p className=" md:text-lg text-sm">{props.project.date}</p>
        <p className=" md:text-lg text-sm">{props.project.month}</p>
        <p className=" md:text-lg text-sm">{props.project.year}</p>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ x: 0 }} // Initial animation state
        animate={{ x: inView ? (isMediumScreen() ? 90 : 30) : 0 }} // Animate when in view
        transition={{ duration: 0.5 }} // Animation duration
      >
        <motion.div className="md:flex md:space-x-12 w md:max-w-full overflow-hidden  space-x-3 mb-10 snap-center">
          <img
            src={props.project.images.horizontal}
            alt={props.project.title || "ผลงานค่ายกิจกรรม DevCommu"}
            loading="lazy"
            className="md:h-56 md:max-w-96 h-32 sm:h-52  w-full  rounded-lg bg-center bg-cover bg-no-repeat object-fill"
          />
          <div className="py-3">
            <p className="font-lineSansTH text-primary font-bold md:text-lg text-sm">
              {props.project.type}
            </p>
            <h3 className="font-lineSansTH text-white font-bold md:text-2xl text-lg">
              {props.project.title}
            </h3>
            <button className="h-8 min-w-24 px-4 bg-[#334155] md:mt-7 mt-2 rounded-full transition-colors hover:bg-[#475d78]">
              {/* TODO: Off Unfinished SLUG page */}
              {/* <a href={`/project/${Slug(props.project.slug)}`}> */}
              <a>
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-3 bg-[url('/images/icons/arrow.png')] bg-contain bg-center bg-no-repeat"></div>
                  <p className=" font-lineSansTH font-bold text-[17px]">
                    อ่านเพิ่มเติม
                  </p>
                </div>
              </a>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function SlideBlackArea() {
  const { scrollYProgress } = useScroll();
  const [showAll, setShowAll] = useState(false);
  const INITIAL_PROJECTS = 4;
  const visibleProjects = showAll
    ? SlideProjectList
    : SlideProjectList.slice(0, INITIAL_PROJECTS);

  const handleToggle = () => {
    if (showAll) {
      setShowAll(false);
      const el = document.getElementById("past-camps-title");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setShowAll(true);
    }
  };

  return (
    <div className="z-40 relative text-white">
      <div className="z-[400]">
        <section className=" bg-gradient-to-t from-[#1E1E1E] to-transparent min-h-[20vh]"></section>
        <section className=" bg-[#1E1E1E]  py-10">
          <div id="past-camps-title">
            <div className="font-bold font-lineSansTH_XB md:text-4xl text-2xl">
              พวกเราผ่านอะไรมาแล้วบ้าง
            </div>
            <div className="font-lineSansTH font-thin text-[#FFBE5C] md:text-3xl text-xl">
              ลองเลื่อนอ่านเล่นๆได้นะ
            </div>
          </div>
        </section>
        <section className="bg-[#1E1E1E] flex overflow-x-auto overflow-y-hidden">
          {/* scrolling bar */}
          <div className="w-1/6 relative">
            <div className="bg-[#616161] mx-auto w-1 h-full md:left-24 rounded-full absolute">
            </div>
          </div>
          <div className="w-full p-10 text-start">
            {visibleProjects.map((project, index) => {
              return (
                <SlideProjectCard
                  key={index}
                  project={project}
                ></SlideProjectCard>
              );
            })}

            {SlideProjectList.length > INITIAL_PROJECTS && (
              <div className="flex justify-center mt-10 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleToggle}
                  className="px-8 py-3 bg-[#e57192]/20 hover:bg-primary border border-primary/50 text-[#ff9cb7] hover:text-white font-lineSansTH font-bold rounded-full transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-primary/35 cursor-pointer"
                >
                  <span>
                    {showAll
                      ? "ย่อกลับ"
                      : `ดูค่ายที่ผ่านมาเพิ่มเติม (${SlideProjectList.length - INITIAL_PROJECTS} ค่าย)`}
                  </span>
                  <span className="text-lg font-bold">
                    {showAll ? "↑" : "↓"}
                  </span>
                </motion.button>
              </div>
            )}
          </div>
        </section>
      </div>
      <div className="bg-[#1E1E1E] pt-24 md:pt-40">
        <Footer></Footer>
      </div>
    </div>
  );
}

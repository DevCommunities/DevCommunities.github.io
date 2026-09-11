import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

import { About } from "~/data/data";
import Marquee from "react-fast-marquee";

interface AboutUsPageComponentProps {
  text1: string;
}

export interface AboutUs {
  people: {
    name: String;
    description: String;
    role: String;
    img: String;
  }[];
}

export default function AboutUsPageComponent(props: AboutUsPageComponentProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const side1 = useTransform(scrollYProgress, [0, 1], ["-40%", "-150%"]);
  const side2 = useTransform(scrollYProgress, [0, 1], ["83%", "130%"]);
  const side3 = useTransform(scrollYProgress, [0, 1], ["86%", "120%"]);
  const { text1 } = props;
  return (
    <div>
      <section id="Home" className=" h-10"></section>
      <section className="mt-20">
        <div className=" h-4 max-w-80 bg-no-repeat mb-6 mx-auto bg-[url('/images/branding/devcommu-word-dark.webp')] bg-center bg-contain"></div>
        <section className="font-lineSansTH_XB text-[60px]">
          <h1>{text1}</h1>
        </section>
        <motion.section
          style={{ x: side1 }}
          className={`fixed top-[13%] hidden md:block  w-[50%] h-96  bg-20 bg-[url('/images/decor/keyboard.webp')] bg-contain bg-no-repeat`}
        ></motion.section>
        <motion.section
          style={{ x: side2 }}
          className={`fixed top-[25%] hidden md:block h-96 w-full bg-20 bg-[url('/images/decor/arduino.webp')] bg-contain bg-no-repeat`}
        ></motion.section>
        <motion.section
          style={{ x: side3 }}
          className={`fixed hidden md:block top-[20%] h-20 w-full bg-20 bg-[url('/images/decor/python.webp')] bg-contain bg-no-repeat`}
        ></motion.section>
      </section>
    </div>
  );
}

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 300,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null });
  const containerRef = useRef<any>(null);
  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mousemove",
          updateMousePosition
        );
      }
    };
  }, []);
  let maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={cn("max-h-[30vh] relative", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center text-6xl absolute bg-secondary bg-grid-white/[0.2] text-white [mask-image:url(/mask.svg)] [mask-size:40px] [mask-repeat:no-repeat]"
        animate={{
          WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${
            mousePosition.y - maskSize / 2
          }px`,
          WebkitMaskSize: `${maskSize}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        <div className="absolute inset-0   h-full w-full z-0 opacity-" />
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="max-w-4xl mx-auto text-center text-black  text-4xl font-bold relative z-20"
        >
          {children}
        </div>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center  text-white">
        {revealText}
      </div>
    </motion.div>
  );
};

export function MaskEffectDevCommu() {
  return (
    <MaskContainer
      revealText={
        <img
          src="/images/branding/devcommu-dark-side.webp"
          alt="logo"
          className="h-1/2"
        />
      }
      className="h-[40rem] md:block"
    >
      <div className="w-full h-52 bg-[url('/images/about/bg-word.webp')] bg-center bg-cover bg-no-repeat">
        <Quote />
      </div>
    </MaskContainer>
  );
}

export function Quote() {
  return (
    <div className="md:w-full w-full mx-auto mt-10">
      <p className="font-lineSansTH md:text-5xl text-sm font-bold text-center">
        "Simplify
        <span className="text-primary"> Learning</span>, Amplify
        <span className="text-primary"> Building</span>"
      </p>
    </div>
  );
}

export function PeopleCard(props: { people: AboutUs }) {
  return (
    <section className="flex flex-col space-y-3 mb-10">
      {props.people.people.map((people, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          className="md:w-full w-96 md:h-[15rem] h-56 p-5  flex space-x-5"
        >
          <div
            className={`h-full w-48 bg-cover bg-center rounded-lg`}
            style={{ backgroundImage: `url(${people.img})` }}
          ></div>
          <div className="w-full ">
            <p className=" text-start font-lineSansTH text-primary font-bold md:text-lg text-sm">
              {people.role}
            </p>
            <p className="text-start font-lineSansTH font-[900] md:text-3xl text-xl">
              {people.name}
            </p>
            <div className="flex font-lineSansTH font-bold text-[#989DA5] text-sm md:text-lg text-start">
              <p className="md:text-3xl text-xl">“</p>
              <p className="mt-3">{people.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

export function OurMission() {
  return (
    <div className="md:w-full w-full mx-auto mt-10">
      <p className="font-lineSansTH md:text-5xl text-sm font-bold text-center">
        Our Mission
      </p>
      <p className="font-lineSansTH md:text-2xl text-sm font-bold text-center">
        "Simplify Learning, Amplify Building"
      </p>
    </div>
  );
}

export function SlidingPeople() {
  return (
    <Marquee
      gradient={false}
      speed={50}
      pauseOnHover={true}
      className={`w-screen mb-32 md:mt-16`}
    >
      {About?.map((people, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className=" md:w-[40rem]  mt-20  rounded-3xl  mx-5 group"
        >
          <PeopleCard people={people} />
        </motion.div>
      ))}
    </Marquee>
  );
}

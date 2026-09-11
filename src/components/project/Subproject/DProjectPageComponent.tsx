import { type SlideProjectProps } from "../ProjectPageComponent";
import Marquee from "react-fast-marquee";

import { motion } from "framer-motion";

export default function HomePageContainer(props: {
  project: SlideProjectProps;
}) {
  return (
    <section>
      <section id="Home" className=" h-10 origin-top"></section>
      <section className=" md:w-[80%] w-full mx-auto  font-lineSansTH">
        <div className=" h-4 max-w-80 bg-no-repeat mb-6 mx-auto bg-[url('/images/branding/devcommu-word-dark.webp')] bg-center bg-contain"></div>
        <div
          className=" md:h-[70vh] h-32 w-full bg-cover rounded-lg bg-center bg-no-repeat my-5"
          style={{ backgroundImage: `url(${props.project.images.horizontal})` }}
        ></div>
        <h1 className="font-bold font-lineSansTH_XB md:text-3xl text-xl text-start">
          {props.project.title}
        </h1>
        <h2 className="md:mt-10 mt-5 text-start font-bold md:text-2xl">
          รายละเอียด
        </h2>
        <div className="mt-1 text-start md:text-lg text-sm">
          {props.project.description}
        </div>
        <h2 className="mt-10 text-start font-bold md:text-2xl">
          เนื้อหาการสอน
        </h2>
        <div className="mt-3 text-start text-lg flex space-x-3 items-center">
          <button className="h-7 w-16 hover:scale-105 bg-white border-red-500 border-2 rounded-lg transition-all duration-200">
            <div className="flex space-x-1 justify-center">
              <div className="h-4 w-4 my-1 bg-[url('/images/icons/pdf.webp')] bg-contain bg-center bg-no-repeat"></div>
              <div className="text-sm text-red-600">pdf</div>
            </div>
          </button>
          <div className="text-red-500 font-bold text-sm">Course Sylybus</div>
        </div>
        <div className="mt-4 md:flex md:h-[60vh] w-full md:space-x-5 space-y-4 md:space-y-0">
          {props.project.schedule.map((schedule, index) => {
            return <ScheduleCard schedule={schedule} index={index} />;
          })}
        </div>
        <h2 className="mt-10 text-start font-bold text-2xl">สอนโดย</h2>
        <div className="flex w-full space-x-4 mt-5 overflow-x-scroll overflow-y-hidden">
          {props.project.constructor.map((constructor, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-[6rem] space-y-1 flex items-center space-x-4 text-start p-3 rounded-md md:w-[20rem] min-w-48 bg-white shadow-md"
              >
                <div
                  className="md:mx-2 min-w-14 min-h-14 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${constructor.img})` }}
                ></div>
                <div className="w-[60%]">
                  <div className="md:text-lg text-sm font-bold">
                    {constructor.name}
                  </div>
                  <div className="text-md md:text-xs font-bold text-primary">
                    {constructor.describtion}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <h2 className="mt-10 text-start font-bold text-2xl">ภาพบรรยากาศ</h2>
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          className={`w-screen`}
        >
          {props.project.imageDetail.map((img, index) => {
            return <SlidePicture img={img} />;
          })}
        </Marquee>
        <h2 className="mt-10 text-start font-bold text-2xl">
          ตัวอย่างผลงานของน้อง ๆ
        </h2>
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          className={`w-screen`}
        >
          {props.project.projectExam.map((project, index) => {
            return <SlideProject project={project}></SlideProject>;
          })}
        </Marquee>
      </section>
    </section>
  );
}

function ScheduleCard(props: { schedule: string[]; index: number }) {
  return (
    <motion.div
      className="md:w-[24%] w-full h-full relative group"
      whileHover={{ bottom: 10 }}
    >
      <div className="h-[90%] w-full bg-white rounded-lg shadow-lg text-start pb-10">
        <div className="bg-primary rounded-t-lg group-hover:bg-[#c7627e] transition-colors duration-200">
          <div className=" p-2 text-center mt-4 font-bold text-lg text-white">
            {" "}
            วันที่ {props.index + 1}
          </div>
        </div>
        {props.schedule.map((item, index) => {
          return (
            <div className="flex p-5 pb-0">
              <div className="h-2 w-2 rounded-full bg-primary my-auto mr-4"></div>
              <div className="font-bold">{item}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SlidePicture(props: { img: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="md:h-[20rem] md:my-10 my-5 md:w-[18rem] h-56 w-56 rounded-md shadow-lg mx-1 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${props.img})` }}
    ></motion.div>
  );
}

function SlideProject(props: {
  project: {
    title: string;
    description: string;
    image: string;
    author: string;
  };
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className=" flex flex-col justify-end min-h-[40rem] md:my-10 mt-10 w-[18rem] rounded-md shadow-lg mx-1 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${props.project.image})` }}
    >
      <div className="w-full h-auto  bg-zinc-50 pb-6 rounded-b-lg shadow-md p-2 text-start font-lineSansTH">
        <p className="font-bold text-xl">{props.project.title}</p>
        <p className="font-bold text-primary -mt-1 text-lg">
          {props.project.author}
        </p>
        <p className=" text-md">{props.project.description}</p>
      </div>
    </motion.div>
  );
}

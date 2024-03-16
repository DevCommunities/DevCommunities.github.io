import { type SlideProjectProps } from "../ProjectPageComponent";
import Marquee from "react-fast-marquee";

import { motion } from "framer-motion";

export default function HomePageContainer(props: {
  project: SlideProjectProps;
}) {
  return (
    <section>
      <section id="Home" className=" h-10 origin-top"></section>
      <section className=" w-[80%] mx-auto  font-lineSansTH">
        <div className=" h-4 max-w-80 bg-no-repeat mb-6 mx-auto bg-[url('/images/DarkDevCommuWord.png')] bg-center bg-contain"></div>
        <div
          className=" h-[70vh] w-full bg-cover rounded-lg bg-center bg-no-repeat my-5"
          style={{ backgroundImage: `url(${props.project.image})` }}
        ></div>
        <div className=" font-bold font-lineSansTH_XB text-3xl text-start">
          {props.project.title}
        </div>
        <div className=" mt-10 text-start font-bold text-2xl"> รายละเอียด</div>
        <div className=" mt-1 text-start text-lg ">
          {" "}
          {props.project.description}
        </div>
        <div className=" mt-10 text-start font-bold text-2xl">
          {" "}
          เนื้อหาการสอน
        </div>
        <div className=" mt-3 text-start text-lg flex space-x-3 items-center ">
          <button className="h-7 w-16 hover:scale-105 bg-white border-red-500 border-2 rounded-lg transition-all duration-200 ">
            <div className="flex space-x-1 justify-center">
              <div className="h-4 w-4 my-1 bg-[url('/images/project/pdf.png')] bg-contain bg-center bg-no-repeat"></div>
              <div className=" text-sm text-red-600">pdf</div>
            </div>
          </button>
          <div className=" text-red-500 font-bold text-sm ">Course Sylybus</div>
        </div>
        <div className=" mt-4 flex h-[60vh]  space-x-5">
          {props.project.schedule.map((schedule, index) => {
            return <ScheduleCard schedule={schedule} index={index} />;
          })}
        </div>
        <div className=" mt-10 text-start font-bold text-2xl"> สอนโดย</div>
        <div className="flex  w-full space-x-4 mt-5">
          {props.project.constructor.map((constructor, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-[6rem] space-y-1 flex items-center space-x-4 text-start p-3 rounded-md w-[20rem] bg-white shadow-md"
              >
                <div
                  className=" mx-2 w-14 h-14 rounded-full  bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${constructor.img})` }}
                ></div>
                <div className=" w-[60%] ">
                  <div className="text-lg font-bold">{constructor.name}</div>
                  <div className="text-md font-bold text-primary">
                    {constructor.describtion}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className=" mt-10 text-start font-bold text-2xl"> ภาพบรรยากาศ</div>
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
        <div className=" mt-10 text-start font-bold text-2xl">
          {" "}
          ตัวอย่างผลงานของน้อง ๆ
        </div>
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
      className="w-[24%] h-full relative group"
      whileHover={{ bottom: 10 }}
    >
      <div className="h-[90%] w-full bg-white rounded-lg shadow-lg text-start">
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
      className="h-[20rem] my-10 w-[18rem] rounded-md shadow-lg mx-1 bg-contain bg-center bg-no-repeat"
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
      className=" flex flex-col justify-end min-h-[40rem] my-10 w-[18rem] rounded-md shadow-lg mx-1 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${props.project.image})` }}
    >
      <div className="w-full h-auto  bg-zinc-50 rounded-b-lg shadow-md p-2 text-start font-lineSansTH">
        <p className="font-bold text-xl">{props.project.title}</p>
        <p className="font-bold text-primary -mt-1 text-lg">
          {props.project.author}
        </p>
        <p className=" text-md">{props.project.description}</p>
      </div>
    </motion.div>
  );
}
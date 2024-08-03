import React from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='25 h-25 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
      <>
          <motion.div variants={textVariant()}>
              <p className={styles.sectionSubText}>Introduction</p>
              <h2 className={styles.sectionHeadText}>Overview.</h2>
          </motion.div>

          <motion.div
              variants={fadeIn("", "", 0.1, 1)}
              className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
              I'm a skilled mathematician with a particular interest in probability and its
              financial implications. I have some of the top grades in my cohort with an 85%
              overall average grade and a 97% average grade across my last three probability
              modules. I give 100% effort in everything that I do, and I'm passionate
              about putting my skills and work ethic to good use in the finance industry,
              with the hope of having a purposeful and impactful career. Below are some of my interests:
          </motion.div>

          <div className='mt-20 flex flex-wrap gap-10'>
              {services.map((service, index) => (
                  <ServiceCard key={service.title} index={index} {...service} />
              ))}
          </div>
      </>
  );
};

export default SectionWrapper(About, "about");
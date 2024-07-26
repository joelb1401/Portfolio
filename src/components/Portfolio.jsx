import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Works from "./Works";
import Education from "./Education";
import Other_Experience from "./Other_Experience";

const Portfolio = () => {
  return (
    <div className='relative z-0 bg-primary'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Education />
      <Experience />
      <Works />
      <Other_Experience />
      <Tech />
    </div>
  );
};

export default Portfolio;
import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Tech from "./components/Tech.jsx";
import Works from "./components/Works.jsx";
import Education from "./components/Education.jsx";
import Other_Experience from "./components/Other_Experience.jsx";

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
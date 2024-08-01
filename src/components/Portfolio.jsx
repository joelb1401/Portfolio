import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Works from "./Works";
import Education from "./Education";
import Other_Experience from "./Other_Experience";

const Portfolio = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Find the element with the matching id
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        // Scroll to the element
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

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
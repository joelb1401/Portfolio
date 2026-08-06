import React from "react";

import KeyboardNav from "./components/KeyboardNav.jsx";
import Menu from "./components/Menu.jsx";
import ReadingProgress from "./components/ReadingProgress.jsx";
import SectionRail from "./components/SectionRail.jsx";
import About from "./components/About.jsx";
import Arbor from "./components/Arbor.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import Powerlifting from "./components/Powerlifting.jsx";
import Works from "./components/Works.jsx";

const Portfolio = () => {
  return (
    <>
      <ReadingProgress />
      <SectionRail />
      <Menu />

      <main className="page">
        <header className="masthead" id="home">
          <h1 className="masthead__name">Joel Bassil</h1>
          <p className="masthead__subtitle">
            PhD Student in Statistical and Applied Mathematics (SAMBa), University of Bath
          </p>
          <hr className="rule" />
        </header>

        <About />
        <Arbor />
        <Education />
        <Works />
        <Experience />
        <Powerlifting />

        <BackToTop />
      </main>

      <KeyboardNav />
    </>
  );
};

export default Portfolio;

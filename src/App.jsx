import React, { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/NavBar/NavBar.jsx";
import About from "./components/About/About.jsx";
import Vision from "./components/Vision/Vision.jsx";
import "./App.css";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [imageSectionTop, setImageSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fullImageSection = document.querySelector(".full-page");
    if (fullImageSection) {
      setImageSectionTop(fullImageSection.offsetTop);
    }
  }, []);

  // Calculate fade-out effect when scrolling past full image
  const transitionPoint = imageSectionTop + 200; // Adjust for smoothness
  const fadeEffect = Math.min((scrollY - transitionPoint) / 300, 1);

  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <Hero />
      </div>
      <div className="vision-section">
        <Vision />
      </div>

      {/* Full Image Section - Remains Static Until Scrolled Past */}
      <div className="full-page"></div>

      {/* About Section - Fades In While Image Section Fades Out */}
      <div
        className="about-section"
        style={{
          opacity: fadeEffect, // Fades in the about section
          transform: `translateY(${100 - fadeEffect * 100}px)`, // Moves up
        }}
      >
        <About />
      </div>
    </div>
  );
};

export default App;

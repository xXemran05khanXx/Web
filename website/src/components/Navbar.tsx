import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../style/navbar.module.css";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import assets properly
import logo from "../assets/xenith_logo.png";
import dropdownGif from "../assets/down-arrow.gif";
import homeGif from "../assets/home.gif";
import socialGif from "../assets/social.gif";
import sportGif from "../assets/sport.gif";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gifKey, setGifKey] = useState(0); // Key to restart animation

  const handleNavigation = (path: string) => {
    if (path === "/social") {
      window.location.href = "/social"; 
      window.location.href = "http://localhost:3000";
    }
    else if (path === "/sport") {
      window.location.href = "/sport"; 
      window.location.href = "http://localhost:3002";
    }
    else {
      window.location.href = path;
    }
  };

  useEffect(() => {
    gsap.to("#nav", {
      backgroundColor: "rgba(90, 227, 60, 0.3)",
      backdropFilter: "blur(10px)",
      height: "90px",
      duration: 0.5,
      scrollTrigger: {
        trigger: "body",
        start: "top -5%",
        end: "top -11%",
        scrub: 1,
      },
    });
  }, []);

  const dropdownItems = [
    { name: "Home", icon: homeGif },
    { name: "Social", icon: socialGif },
    { name: "Sport", icon: sportGif },
  ];

  

  return (
    <nav id="nav" className={styles.nav}>
      {/* Fixed logo path */}
      <img src={logo} alt="Xenith Logo" className={styles.logo} />

  

      {/* Dropdown Menu */}
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownButton}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setGifKey((prevKey) => prevKey + 1)} // Restart GIF on hover
        >
          <img key={gifKey} src={dropdownGif} style={{ width: "20px" }} alt="Menu" />
        </button>

        {isOpen && (
          <div className={styles.dropdownList}>
             {dropdownItems.map((item) => (
              <div
                key={item.name}
                className={styles.dropdownItem}
                onClick={() => handleNavigation(`/${item.name.toLowerCase()}`)}
              >
                <img src={item.icon} alt={`${item.name} icon`} className={styles.iconGif} />
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

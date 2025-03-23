import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import styles from "../style/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <nav id="nav" className={styles.nav}>
      {/* Fixed logo path */}
      <img src="src/assets/xenith_logo.png" alt="Xenith Logo" className={styles.logo} />

      <div className={styles.navItems}>
        {["Gallery", "Upcoming", "Members", "About", "Contact"].map((item) => (
          <h4 key={item} className={styles.navItem}>
            {item}
          </h4>
        ))}
      </div>
      <div className={styles.dropdown}>
          <button className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
            <img src="src/assets/down-arrow.png" style={{ width: "20px" }} alt="Menu" />
          </button>
          {isOpen && (
            <div className={styles.dropdownList}>
              {["Home", "Social", "Sport"].map((item) => (
                <div key={item} className={styles.dropdownItem} onClick={() => handleNavigation(`/${item.toLowerCase()}`)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

    </nav>

  );
};

export default Navbar;

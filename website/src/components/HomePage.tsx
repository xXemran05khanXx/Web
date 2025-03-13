import React, { useEffect, useRef } from "react";
import styles from "../index.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sliderRef1 = useRef<HTMLDivElement>(null);
  const sliderRef2 = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBlurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    if (videoRef.current && bgRef.current) {
      gsap.set(videoRef.current, { willChange: "opacity" });
      gsap.set(bgRef.current, { willChange: "opacity" });
  
      gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1.5,
          toggleActions: "play reverse play reverse", // Ensures it fades back in
          invalidateOnRefresh: true,
        },
      })
        .to(videoRef.current, { opacity: 0, duration: 1.5 }, 0)
        .to(bgRef.current, { opacity: 1, duration: 1.5 }, 0);
    }
  }, []);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const sliders = [sliderRef1.current, sliderRef2.current];
  
    sliders.forEach((slider) => {
      if (slider) {
        const list = slider.querySelector(`.${styles.list}`);
  
        gsap.to(list, {
          xPercent: -50, // Moves the images continuously
          ease: "linear", // Ensures smooth movement
          duration: 15, // Controls speed (adjust as needed)
          repeat: -1, // Infinite scrolling
        });
      }
    });
  }, []);  

  useEffect(() => {
    let timeout: number;

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (cursorRef.current && cursorBlurRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          cursorBlurRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
        }
      }, 10);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div ref={cursorRef} className={styles.cursor}></div>
      <div ref={cursorBlurRef} className={styles.cursor_blur}></div>

      {/* Video Background */}
      <video ref={videoRef} autoPlay muted loop className={styles.bgVideo}>
        <source src="/public/xenith_video.mp4" type="video/mp4" />
      </video>

      {/* Black Background for fade-in effect */}
      <div ref={bgRef} className={styles.blackBackground}></div>

      <div className={styles.main}>
        <div className={styles.page1}>
          <h1>EXPERIENCE. INNOVATE. CELEBRATE.</h1>
          <h2>WELCOME TO XENITH!</h2>
          <p>
            Xenith is your gateway to an electrifying experience, bringing together creativity,
            technology, and passion in one thrilling event. Join us as we push the boundaries of
            innovation and entertainment!
          </p>
        </div>

        <div className={styles.page2}>
          <div className={styles.scroller}>
            <div className={styles.scrollerIn}>
              {[".EXPERIENCE.", "INNOVATE.", "CELEBRATE.", "INSPIRE.", "CREATE.", "CONNECT.", "EXPLORE."].map((text, index) => (
                <h4 key={index}>{text}</h4>
              ))}
            </div>
            <div className={styles.scrollerIn}>
              {[".EXPERIENCE.", "INNOVATE.", "CELEBRATE.", "INSPIRE.", "CREATE.", "CONNECT.", "EXPLORE."].map((text, index) => (
                <h4 key={index + 7}>{text}</h4>
              ))}
            </div>
          </div>
         
          <div className={styles.aboutUs}>
           <div className={styles.slider} ref={sliderRef1}>
             <div className={styles.list}>
               {Array.from({ length: 8 }, (_, i) => (
                 <div className={styles.item} key={i}>
                   <img src={`src/assets/slider_img_${i + 1}.jpg`} alt="" />
                 </div>
               ))}
             </div>
           </div>
         
           {/* 🏆 Event Info with Blurred Background */}
           <div className={styles.aboutUsIn}>
             <h3>Events</h3>
             <p>
               Xenith is a student-run organization that hosts a variety of events
               throughout the year. From hackathons to workshops, we have something for everyone!
             </p>
           </div>
         </div>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;

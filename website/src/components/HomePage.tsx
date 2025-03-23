import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "../index.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sliderRef1 = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBlurRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  // ** High-Priority: Smooth Scroller **
  useLayoutEffect(() => {
    const textElements = document.querySelectorAll(`.${styles.scrollerIn} h4`);
    const cursorElement = document.querySelector(`.${styles.cursor}`);

    const handleScroll = () => {
      if (!cursorElement) return;
      const cursorRect = cursorElement.getBoundingClientRect();

      textElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          rect.top < cursorRect.bottom &&
          rect.bottom > cursorRect.top &&
          rect.left < cursorRect.right &&
          rect.right > cursorRect.left
        ) {
          el.classList.add(styles.hoverEffect);
        } else {
          el.classList.remove(styles.hoverEffect);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ** Video Fade-out & Background Fade-in **
  useEffect(() => {
    if (!videoRef.current || !bgRef.current) return;
    gsap.timeline({
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top top",
        end: "50% top",
        scrub: 1.5,
        toggleActions: "play reverse play reverse",
      },
    })
      .to(videoRef.current, { opacity: 0, duration: 1.5 }, 0)
      .to(bgRef.current, { opacity: 1, duration: 1.5 }, 0);
  }, []);

  // ** Continuous Image Slider **
  useEffect(() => {
    if (!sliderRef1.current) return;
    const list = sliderRef1.current.querySelector(`.${styles.list}`);
    if (!list) return;

    gsap.to(list, {
      xPercent: -50,
      ease: "linear",
      duration: 15,
      repeat: -1,
    });
  }, []);

  // ** Cursor Tracking Optimization **
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorBlurRef.current) {
        requestAnimationFrame(() => {
          cursorRef.current!.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          cursorBlurRef.current!.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
        });
      }
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

          <div className={styles.aboutEvent}>
            <h1 className={styles.title}>Ojus | APSIT</h1>
            <h3 className={styles.subtitle}>Proudly Run By Students at APSIT</h3>
            <p className={styles.description}>
              Ojus is a premier cultural and sports festival, uniting students with a passion for excellence. Experience thrilling competitions, extraordinary performances, and a platform to showcase your talent.
            </p>

            {/* Stats Section */}
            <div className={styles.stats}>
              {[
                { src: "src/assets/participants.gif", text: "500+ Participants" },
                { src: "src/assets/prize.gif", text: "₹1,00,000+ Prize Pool" },
                { src: "src/assets/organizers.gif", text: "50+ Organizers" },
                { src: "src/assets/events.gif", text: "20+ Exciting Events" },
              ].map(({ src, text }, index) => (
                <div className={styles.statBox} key={index}>
                  <img src={src} alt={text} className={styles.statIcon} />
                  <h4>{text}</h4>
                </div>
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

            {/* Event Info with Blurred Background */}
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

import React, { useState } from "react";
import styles from "../style/EventCards.module.css";

const EventCards = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const events = [
    { id: 1, title: "Ojus 21", year: "2021" },
    { id: 2, title: "Ojus 23", year: "2023" },
    { id: 3, title: "Ojus 24", year: "2024" },
    { id: 4, title: "Coming Soon", year: "", comingSoon: true },
  ];

  return (
    <div className={`${styles.websiteContainer} ${hovered !== null ? styles.blurred : ""}`}>
      <div className={styles.cardContainer}>
        {events.map((event) => (
          <div
            key={event.id}
            className={`${styles.card} ${event.comingSoon ? styles.comingSoon : ""} ${hovered === event.id ? styles.focused : ""}`}
            onMouseEnter={() => setHovered(event.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <h2 className={styles.cardTitle}>{event.title}</h2>
            {!event.comingSoon && <p className={styles.cardYear}>{event.year}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCards;

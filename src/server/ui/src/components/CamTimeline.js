import React from 'react'
import { Chrono } from 'react-chrono';

const items = [
  {
    title: "January 14th, 2024, 5:15PM",
    cardTitle: "Car",
    cardSubtitle: "Camera 1",
    cardDetailedText: "A car parked at the front.",
  },
  {
    title: "January 14th, 2024, 5:27PM",
    cardTitle: "Bird",
    cardSubtitle: "Camera 4",
    cardDetailedText: "A bird entered the back.",
  },
  {
    title: "January 14th, 2024, 6:17PM",
    cardTitle: "Person",
    cardSubtitle: "Camera 3",
    cardDetailedText: "A person entered the side.",
  }
];
/* Creates the timeline listing items from the given list. */
const CamTimeline = () => (
  <div className="flex">
    <Chrono
      items={items}
      mode="VERTICAL"
      itemWidth={150}
      showSingle
      theme={{
        primary: "white",
        secondary: "cyan",
        cardBgColor: "white",
        titleColor: "white",
        titleColorActive: "black",
      }}
    />
  </div>
)

export default CamTimeline

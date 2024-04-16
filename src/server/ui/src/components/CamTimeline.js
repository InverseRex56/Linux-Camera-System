import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";

const CamTimeline = () => {
  // Constants that will be used to set data to.
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  // Retrieves the information for each image.
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // For testing purposes using localhost.
        // const response = await fetch('http://localhost:8080/get_events/10');
        const response = await fetch('http://10.166.138.213:8080/get_events/10');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const items = events.map((event, index) => ({
    title: `Time: ${event.time}`,
    cardTitle: `IP: ${event.ip}`,
    media: {
      name: `Event ${index + 1}`,
      source: {
        url: `data:image/jpeg;base64,${event.pic}`
      },
      type: "IMAGE"
    },
  }));

  return (
    <div>
      <h1>IP Camera Timeline</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Chrono
          items={items}
          mode="VERTICAL"
          theme={{
            primary: "white",
            secondary: "cyan",
            cardBgColor: "white",
            titleColor: "white",
            titleColorActive: "black",
          }}
          cardWidth={600} // Adjust card width to fit larger images.
          cardHeight={500} // Set card height to auto to accommodate varying image heights.
          mediaHeight={480}
        />
      )}
    </div>
  );
};

export default CamTimeline;

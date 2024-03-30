import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";

const CamHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [cameraNumber, setCameraNumber] = useState(null);

  // Extracts the current camera ID from the URL
  useEffect(() => {
    const pathname = window.location.pathname;
    // Filter for the ID
    const regex = /camera(\d+)/;
    const match = pathname.match(regex);
    
    if (match && match[1]) {
      console.log("Match1", match[1]); // Log match for debugging
      setCameraNumber(match[1]);
      console.log("camnum", cameraNumber); // Log match for debugging
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (cameraNumber !== null) { // Check if cameraNumber is not null
          console.log("Current cam number: ", cameraNumber);
          const response = await fetch(`http://10.166.138.213:8080/get_cam_id_events/${cameraNumber}/10`);
          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }
          const data = await response.json();
          setEvents(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [cameraNumber]);



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

    // // Extracts the current camera ID from the URL
    // useEffect(() => {
    //   const pathname = window.location.pathname;
    //   console.log("Pathname:", pathname); // Log pathname for debugging
    //   // Filter for the /camera<N>/history path
    //   const regex = /camera(\d+)\/history?/;
    //   const match = pathname.match(regex);
    //   console.log("Match:", match); // Log match for debugging
    //   console.log("Match of 1:", match[1]); // Log match for debugging
    //   // if (match && match[1]) {
    //   setCameraNumber(parseInt(match[1]));
    //   console.log("camnum", cameraNumber); // Log match for debugging
    //   // }
    // }, []);
    

  return (
    <div>
      <a href={`/camera${cameraNumber}`}><div className={`text-white py-3 hover:brightness-75`}>Back</div></a>
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
          cardWidth={600} // Adjust card width to fit larger images
          cardHeight={500} // Set card height to auto to accommodate varying image heights
          mediaHeight={480}
        />
      )}
    </div>
  );
};

export default CamHistory;

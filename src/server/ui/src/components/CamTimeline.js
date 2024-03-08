import React from "react";
import { Chrono } from "react-chrono";
import { cam1 } from "../assets";

const CamTimeline = () => {
  const images = [];
  const items = [];

  for (let i = 0; i <= 10; i++) {
    images.push(
      <div>
        <a href={cam1} download="camera1feed.png" target='_blank'>
          <img src={cam1} className={`rounded-[10px]`} />
        </a>
      </div>,
    );
  }
  for (let i = 0; i <= 10; i++) {
    items.push(
      {
        title: "TIME TAKEN: XX:XX:XX",
        cardTitle: "CAM ID",
      },
    );
  }

  // for (let i = 0; i <= 10; i++) {
  //   customContent.push(
  //     <div>e
  //       <a href={cam1} download="camera1feed.png" target='_blank'>
  //         <img src={`data:image/jpeg;base64,${item.pic}`} className={`rounded-[10px]`} />
  //       </a>
  //     </div>,
  //   );
  // }
  // for (let i = 0; i <= 10; i++) {
  //   items.push(
  //     {
  //       title: `${item.date}`,
  //       cardTitle: `${item.id}}`,
  //     },
  //   );
  // }

  // const customContent = [
  // <div>
  //   <a href={cam1} download="camera1feed.png" target='_blank'>
  //     <img src={cam1} className={`rounded-[10px]`} />
  //   </a>
  // </div>,
  //   <div>
  //     <img src={cam1} className={`rounded-[10px]`} />
  //   </div>,
  // ];
  // const items = [
  //   {
  //     title: "TIME TAKEN: XX:XX:XX",
  //     cardTitle: "CAM ID",
  //   },
  //   {
  //     title: "Item 1",
  //     cardTitle: "Card 1",
  //   },
  // ];

  return (
    <div><Chrono items={items} mode="VERTICAL" itemWidth={150} cardHeight={325} showSingle theme={{
      primary: "white",
      secondary: "cyan",
      cardBgColor: "white",
      titleColor: "white",
      titleColorActive: "black",
    }}>{images}</Chrono>;</div>
  );
};

export default CamTimeline;
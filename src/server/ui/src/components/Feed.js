import React, { useState, useEffect } from 'react';
import styles from '../style';

const Feed = () => {
  // Constants that will be used to set data to.
  const [listOfCams, setListOfCams] = useState([]);
  const [cameraNumber, setCameraNumber] = useState(null);

    const fetchDataForCams = async () => {
    try {
      const images = [];
      // Loop that retrieves a picture from each camera, pushing it to the display.
        images.push(fetchData(cameraNumber));
      const allData = await Promise.all(images);
      setListOfCams(allData);
    } catch (error) {
      console.error('Error fetching data for all cameras:', error);
    }
  };

  const fetchData = async (i) => {
    try {
      // For testing purposes using localhost.
      // const response = await fetch(`http://localhost:8080/get_img/${i}`);
      const response = await fetch(`http://10.166.138.213:8080/get_img/${cameraNumber}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data for camera ${cameraNumber}:`, error);
      return [];
    }
  };

  // Extracts the current camera ID from the URL.
  useEffect(() => {
    const pathname = window.location.pathname;
    // Filter for the ID.
    const regex = /camera(\d+)/;
    const match = pathname.match(regex);
    
    if (match && match[1]) {
      setCameraNumber(match[1]);
    }
  }, []);

  // Function that captures an image instantly, refreshing the current page.
  const capturePicture = async (i) => {
    try {
      // For testing purposes using localhost.
      // const response = await fetch(`http://localhost:8080/ui_capture/${cameraNumber}`);
      const response = await fetch(`http://10.166.138.213:8080/ui_capture/${cameraNumber}`);
      window.location.reload();
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data for camera ${cameraNumber}:`, error);
      return [];
    }
  };
// Retrieves the data for the camera if the camera exists.
  useEffect(() => {
      if (cameraNumber !== null) {
        fetchDataForCams();
      }
    }, [cameraNumber]);

  return (
  <div className={``}>
    <div className={`grid text-white text-4xl py-3 justify-center`}>Camera {cameraNumber}</div>
    {/*Camera*/}
    <div className={`${styles.flexStart} space-x-10`}>
    {listOfCams.map((data, index) => (
              // Changes the URL based on the camera ID
              <a>
                {data.map((item, itemIndex) => (
                  <div className={`grid justify-center space-x-10`} key={itemIndex}>
                    <img  className={`rounded-[10px]`} src={`data:image/jpeg;base64,${item.most_recent_pic}`} />
                  </div>
                ))}
              </a>
            ))}
      {/* Downloads the current displayed image. */}
      <div className={`align-top grid justify-items-center`}>
      <a href={`/camera`}><button className={`text-white py-3 hover:brightness-75`}>Back</button></a>
      {listOfCams.map((data, index) => (
              // Changes the URL based on the camera ID
              <a>
                {data.map((item, itemIndex) => (
                  <a href={`data:image/jpeg;base64,${item.most_recent_pic}`} download="camerafeed.png" target='_blank'>
                  <button className={`text-white py-3 hover:brightness-75`}>Screen Capture</button>
                </a>
                ))}
              </a>
            ))}
        <button onClick={capturePicture} className={`text-white py-3 hover:brightness-75`}>Capture Picture</button>
        <a href={`/camera${cameraNumber}/history`} ><div className={`text-white py-3 hover:brightness-75`}>History</div></a>
      </div>
    </div>
  </div>
  )
}

export default Feed

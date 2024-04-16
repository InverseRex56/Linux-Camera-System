import React, { useState, useEffect } from 'react';
import styles from '../style';

const Camera = () => {
  // Constants that will be updated with the images from the camera, as well as the largest cam ID. 
  const [listOfCams, setListOfCams] = useState([]);
  const [largestCamId, setLargestCamId] = useState(null);

  // Calls the function to retrieve the highest cam ID.
  useEffect(() => {
    fetchLargestCamId();
  }, []);

  // Function that will retrieve the number of cameras from the database, replace with your IP.
  const fetchLargestCamId = async () => {
    try {
      // For testing purposes using localhost
      // const response = await fetch(`http://localhost:8080/get_number_of_cams`);
      const response = await fetch('http://10.166.138.213:8080/get_number_of_cams');
      const data = await response.json();
      setLargestCamId(data.largest_cam_id);
    } catch (error) {
      console.error('Error fetching largest cam ID:', error);
    }
  };
  
  // Calls the function that retrieves images from the camera only if it exists.
  useEffect(() => {
    if (largestCamId !== null) {
      fetchDataForCams();
    }
  }, [largestCamId]);

  // Retrieves images from each camera, then pushes it to display.
  const fetchDataForCams = async () => {
    try {
      const images = [];
      // Loop the retrieves a picture from each camera, pushing it to the display.
      for (let i = 1; i <= largestCamId; i++) {
        images.push(fetchData(i));
      }
      const allData = await Promise.all(images);
      setListOfCams(allData);
    } catch (error) {
      console.error('Error fetching data for all cameras:', error);
    }
  };

  // 
  const fetchData = async (i) => {
    try {
      // For testing purposes using localhost.
      // const response = await fetch(`http://localhost:8080/get_img/${i}`);
      const response = await fetch(`http://10.166.138.213:8080/get_img/${i}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data for camera ${i}:`, error);
      return [];
    }
  };

  return (
    <div>
      <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          <div className={`${styles.cameraPreview}`}>
            {listOfCams.map((data, index) => (
              // Changes the URL based on the camera ID
              <a href={`/camera${index + 1}`} key={index}>
                {data.map((item, itemIndex) => (
                  <div className={`grid justify-center space-x-10`} key={itemIndex}>
                    <img className={`rounded-[10px] hover:brightness-75`} src={`data:image/jpeg;base64,${item.most_recent_pic}`} />
                  </div>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Camera;

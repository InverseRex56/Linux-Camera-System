import React, { useState, useEffect } from 'react';
import styles from '../style';

const CameraTest = () => {
  const [listOfCams, setListOfCams] = useState([]);
  const [largestCamId, setLargestCamId] = useState(null);

  useEffect(() => {
    fetchLargestCamId();
  }, []);

  const fetchLargestCamId = async () => {
    try {
      const response = await fetch('http://192.168.1.179:8080/get_number_of_cams');
      const data = await response.json();
      setLargestCamId(data.largest_cam_id);
    } catch (error) {
      console.error('Error fetching largest cam ID:', error);
    }
  };

  useEffect(() => {
    if (largestCamId !== null) {
      fetchDataForCams();
    }
  }, [largestCamId]);

  const fetchDataForCams = async () => {
    try {
      const promises = [];
      for (let i = 1; i <= largestCamId; i++) {
        promises.push(fetchData(i));
      }
      const allData = await Promise.all(promises);
      setListOfCams(allData);
    } catch (error) {
      console.error('Error fetching data for all cameras:', error);
    }
  };

  const fetchData = async (i) => {
    try {
      const response = await fetch(`http://192.168.1.179:8080/get_img/${i}`);
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
          <div className="flex flex-row justify-between items-center w-full grid grid-cols-3 gap-1">
            {listOfCams.map((data, index) => (
              <a href={`/camera${index + 1}`} key={index}>
                {data.map((item, itemIndex) => (
                  <div className={`grid justify-center`} key={itemIndex}>
                    <img src={`data:image/jpeg;base64,${item.most_recent_pic}`} />
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

export default CameraTest;

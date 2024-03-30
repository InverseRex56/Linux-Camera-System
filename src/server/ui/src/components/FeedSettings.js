import React, { useState, useEffect } from 'react';
import styles from '../style';

const Feed1Settings = () => {
  const [listOfCams, setListOfCams] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [cameraNumber, setCameraNumber] = useState(null);

  // Retrieves images from each camera, then pushes it to display.
  const fetchDataForCams = async () => {
    try {
      const images = [];
      // Loop the retrieves a picture from each camera, pushing it to the display.
        images.push(fetchData(cameraNumber));
      const allData = await Promise.all(images);
      setListOfCams(allData);
    } catch (error) {
      console.error('Error fetching data for all cameras:', error);
    }
  };

  // 
  const fetchData = async (i) => {
    try {
      // const response = await fetch(`http://localhost:8080/get_img/${i}`);
      const response = await fetch(`http://10.166.138.213:8080/get_img/${cameraNumber}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data for camera ${cameraNumber}:`, error);
      return [];
    }
  };
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

  // Sets the user's value to InputValue
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Sets the submit button for use with InputValue
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logs the current value for testing
    console.log('Input value:', inputValue);
  };

  useEffect(() => {
    if (cameraNumber !== null) {
      fetchDataForCams();
    }
  }, [cameraNumber]);

  return (
  <div className={``}>
    <div className={`text-white text-4xl py-3 grid justify-center`}>Camera {cameraNumber}</div>
    {/*Camera 1 */}
    <div className={`${styles.flexStart} space-x-10`}>
    {listOfCams.map((data, index) => (
              // Changes the URL based on the camera ID
              <a>
                {data.map((item, itemIndex) => (
                  <div className={`grid justify-center space-x-10`} key={itemIndex}>
                    <img className={`rounded-[10px]`} src={`data:image/jpeg;base64,${item.most_recent_pic}`} />
                  </div>
                ))}
              </a>
            ))}
      {/* Downloads the current displayed image. */}
      <div className={`align-top grid justify-items-center`}>
        <a href={`/camera${cameraNumber}`}><div className={`text-white py-3 hover:brightness-75`}>Back</div></a>
        <div className={`text-white py-3`}>Current N: </div>
        <form onSubmit={handleSubmit}>
        <label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={`text-white py-3 hover:brightness-75`} type="submit">{`\n`} Submit</button>
      </label>
        </form>
      </div>
    </div>
  </div>
      )
  }

export default FeedSettings

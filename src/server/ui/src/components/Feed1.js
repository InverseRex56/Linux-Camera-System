import React from 'react'
import styles from '../style';
import { cam1 } from '../assets';

const Camera = () => (

  <div className={``}>
    <div className={`text-white text-4xl py-3`}>Camera 1</div>
    {/*Camera 1 */}
    <div className={`${styles.flexStart}`}>
      <div className={`grid justify-start w-screen h-screen rounded-[10px] bg-gradient p-[2px] cursor-pointer `}><img src={cam1} alt="test" className="object-cover h-[90%] rounded-[10px]"></img></div>
      {/* Downloads the current displayed image. */}
      <div className={`align-top grid justify-items-center`}>
        <a href={cam1} download="camera1feed.png" target='_blank'>
          <button className={`text-white py-3`}>Screen Capture</button>
        </a>
        <div className={`text-white py-3`}>History</div>
        <a href={"/camera1/settings"}><div className={`text-white py-3`}>Settings</div></a>
      </div>
    </div>
  </div>
)

export default Camera

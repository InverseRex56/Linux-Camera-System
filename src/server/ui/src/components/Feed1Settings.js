import React from 'react'
import styles from '../style';
import { cam1 } from '../assets';

const Feed1Settings = () => (

  <div className={``}>
    <div className={`text-white text-4xl py-3 grid justify-center`}>Camera 1</div>
    {/*Camera 1 */}
    <div className={`${styles.flexStart}`}>
      <div className={`grid justify-center w-screen h-auto rounded-[10px] bg-gradient p-[2px] cursor-pointer `}><img src={cam1} alt="test" className="object-cover h-[200%] rounded-[10px]"></img></div>
      {/* Downloads the current displayed image. */}
      <div className={`align-top grid justify-items-center`}>
        <a href={"/camera1"}><div className={`text-white py-3`}>Back</div></a>
        <div className={`text-white py-3`}>Name</div>
        <div className={`text-white py-3`}>92%</div>
      </div>
    </div>
  </div>
)

export default Feed1Settings

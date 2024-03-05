// import React from 'react'
// import styles from '../style';
// import { cam1, cam2, cam4, cam5 } from '../assets';

// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/get_img/1');
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }; 
// }

// return CameraTest = () => (
//   <div>
//     {data.map((item, index) => (
//           <li key={index}>
//             {/* <div className={`grid justify-center w-screen h-auto rounded-[10px] bg-gradient p-[2px] cursor-pointer `}><img src={`data:image/jpeg;base64,${item.most_recent_pic}`} /></div> */}
//           </li>
//         ))}
//     <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
//       <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
//         <div className="flex flex-row justify-between items-center w-full">
//           {/*First set of cameras */}
//           <a href={"/camera1"}><div className={`${styles.flexCenter} w-[350px] h-[200px] rounded-[10px] bg-gradient p-[2px] cursor-pointer px-3 py-3`}><img src={cam1} alt="test" className="object-fill rounded-[10px]"></img></div></a>
//           <a href={"/camera2"}><div className={`${styles.flexCenter} w-[350px] h-[200px] rounded-[10px] bg-gradient p-[2px] cursor-pointer px-3 py-3`}><img src={cam2} alt="test" className="object-fill rounded-[10px]"></img></div></a>
//           <a href={"/camera3"}><div className={`${styles.flexCenter} w-[350px] h-[200px] rounded-[10px] bg-gradient p-[2px] cursor-pointer px-3 py-3`}><img src={cam5} alt="test" className="object-fill rounded-[10px]"></img></div></a>
//         </div>

//         <div><p>{" d"}</p></div>

//         {/*Second set of cameras */}
//         <div className="flex flex-row justify-between items-center w-full">
//           <a href={"/camera4"}><div className={`${styles.flexCenter} w-[350px] h-[200px] rounded-[10px] bg-gradient p-[2px] cursor-pointer px-3 py-3`}><img src={cam4} alt="test" className="object-fill rounded-[10px]"></img></div></a>
//           <a href={"/camera5"}><div className={`${styles.flexCenter} w-[350px] h-[200px] rounded-[10px] bg-gradient p-[2px] cursor-pointer px-3 py-3`}><img src={cam5} alt="test" className="object-fill rounded-[10px]"></img></div></a>
//           <a href={"/camera6"}><div className={`${styles.flexCenter} w-[350px] h-[200px] rounded-[10px] bg-gradient p-[2px] cursor-pointer px-3 py-3`}><img src={cam1} alt="test" className="object-fill rounded-[10px]"></img></div></a>
//         </div>
//       </div>
//     </section>
//   </div>
// )

// export default CameraTest







import styles from '../style';
import React, { useState, useEffect } from 'react';

const CameraTest = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/get_img/1');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 


  
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        {data.map((item, index) => (
            <div className={`grid justify-center`}><img src={`data:image/jpeg;base64,${item.most_recent_pic}`}  /><img src={`data:image/jpeg;base64,${item.most_recent_pic}`} /></div>
        ))}

      </div>
    </section>
  );
};

export default CameraTest;




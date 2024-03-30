import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Camera from './components/Camera';
import CamTimeline from './components/CamTimeline';
import styles from './style';
import Feed from './components/Feed';
import CamHistory from './components/CamHistory';

const App = () => (
  <div className={`${styles.cameraHome}`}>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
        <Routes>
          <Route path="/camera" element={<Camera />} />
          <Route path="/timeline" element={<CamTimeline />} />

          {Array.from({ length: 6 }).map((_, index) => (
            <Route key={index} path={`/camera${index + 1}`} element={<Feed />} />
          ))}
          {Array.from({ length: 6 }).map((_, index) => (
            <Route key={index} path={`/camera${index + 1}/history`} element={<CamHistory />} />
          ))}
        </Routes>
      </div>
    </div>
  </div>
);
export default App










// import React, { useState, useEffect } from 'react';

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


  
//   return (
//     <div>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>
//             <div className={`grid justify-center w-screen h-auto rounded-[10px] bg-gradient p-[2px] cursor-pointer `}><img src={`data:image/jpeg;base64,${item.most_recent_pic}`} /></div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

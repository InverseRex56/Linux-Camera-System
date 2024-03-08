import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Camera from './components/Camera';
import CamTimeline from './components/CamTimeline';
import styles from './style';
import Feed1 from './components/Feed1';
import Feed1Settings from './components/Feed1Settings';

const App = () => (
  <div className={`${styles.cameraHome}`}>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
        <Routes>
          <Route path="/camera" element={<Camera />} />
          <Route path="/timeline" element={<CamTimeline />} />
          <Route path="/camera1" element={<Feed1 />} />
          <Route path="/camera1/settings" element={<Feed1Settings />} />
          <Route path="/camera2" element={<Feed1 />} />
          <Route path="/camera3" element={<Feed1 />} />
          <Route path="/camera4" element={<Feed1 />} />
          <Route path="/camera5" element={<Feed1 />} />
          <Route path="/camera6" element={<Feed1 />} />
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

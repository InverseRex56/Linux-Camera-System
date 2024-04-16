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

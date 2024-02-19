import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Camera from './components/Camera';
import CamTimeline from './components/CamTimeline';
import styles from './style';
import Feed1 from './components/Feed1';
import Feed1Settings from './components/Feed1Settings';

const App = () => (
  <div className="bg-primary w-full h-screen overflow-auto">
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

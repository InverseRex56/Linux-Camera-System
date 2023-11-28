import './App.css';
import React from 'react';
import { Route, Routes, Link} from 'react-router-dom';
import Data from './pages/data';
import Input from './pages/input';

function App() {
  return (
  <>
  <nav>
    <ul className="navlist">
      <li>
        <Link to="/">Data</Link>
      </li>
      <li>
        <Link to="/input">Input</Link>
      </li>

    </ul>
  </nav>
      <Routes>
        <Route path="/" element={<Data />} />
        <Route path="/input" element={<Input />} />
      </Routes> 
  </>
  )
}
export default App
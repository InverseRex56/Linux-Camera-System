import './App.css';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';

// Uses styled components to create a styled button.
const Button = styled.button`
  background-color: #93E9BE;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border: 0px solid #FFFFFF;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

function App() {

  // Contains the data.
  const [data, setData] = useState(null);

  // Initial state of the component for data.
  const [showComponent, setShowComponent] = useState(true);

  // Function that refreshes the data and shows/hides it.
  function DisplayData(){
    fetch('http://localhost:8080/get_status_data')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
    setShowComponent(!showComponent) 
  }
  function RefreshData(){
    fetch('http://localhost:8080/get_status_data')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }
  return (
    <div className="App">
      <header className="App-header">
      <div><pre>{showComponent && JSON.stringify(data, null, 2) }</pre></div>
      <Button onClick={DisplayData}>Get Info</Button>
      <Button onClick={RefreshData}>Refresh</Button>
      </header>
    </div>
  );
}

export default App;
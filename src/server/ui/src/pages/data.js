import styled from 'styled-components';
import React, {useState} from 'react';

// Uses styled components to create a styled button.
const Button = styled.button`
  background-color: #93E9BE;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border: 0px solid #FFFFFF;
  border-radius: 5px;
  margin-right: 2%;
  cursor: pointer;
`;

// Constant that will format the buttons to be on the same row.
const ButtonGroup = styled.div`
  display: flex;
`;

function Data() {

  // Contains the data.
  const [data, setData] = useState(null);

  // For querying data, checks to see which one is selected.
  const [queryStatus, setQueryStatus] = useState(false);

  // For keeping track of the current option.
  const [currentOption, setCurrentOption] = useState('');

  // Changes the current option.
  const handleOptionChange = (event) => {
    setCurrentOption(event.target.value);
  };

  // Function that fetches the current status data.
  async function SendStatus(){  
    await fetch('http://localhost:8080/get_status_data')
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => console.error(error));
    setQueryStatus(true);
  }

  // Function that fetches the current events data.
  async function SendEvent(){
    await fetch('http://localhost:8080/get_event_data')
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => console.error(error));
    setQueryStatus(false);
  }
  // Updates the data depending on which option is selected.
  async function QueryData(){
    if (queryStatus === true){
      await fetch('http://localhost:8081/send_status')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      SendStatus();
    }
    else {
      await fetch('http://localhost:8081/send_event')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      SendEvent();
    }
  }

  return (
    <div className="App"> 
      <header className="App-header">
      <form>
        <label>
          <input
            type="radio"
            value="Status"
            checked={currentOption === 'Status'}
            onChange={handleOptionChange}
            onClick={SendStatus}
          />
          Get New Status Data
        </label>
        <label>
          <input
            type="radio"
            value="Event"
            checked={currentOption === 'Event'}
            onChange={handleOptionChange}
            onClick={SendEvent}
          />
          Get New Event Data
        </label>
      </form>
      <ButtonGroup>
      <Button onClick={QueryData}>Query</Button>
      </ButtonGroup>
      <div style={{fontSize: '10px'}}><pre>{JSON.stringify(data, null, 2) }</pre></div>
      </header>
    </div>
  );
}

export default Data;
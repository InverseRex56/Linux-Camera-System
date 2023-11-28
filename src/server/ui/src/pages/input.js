import React from 'react';

const Input = () => {
  return (
    <div className='App-header'>
      <p>Please enter data here:</p>
      <label>
        Data: <input name="myInput" defaultValue="" />
      </label>
    </div>
  );
};

export default Input;
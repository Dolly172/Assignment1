import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';


function Home({ onSelect }){

    const navigate = useNavigate();

    const choices = [
        'restaurant',
        'hospital',
        'pizza',
        'school'
      ];
    
      const [selectedOption, setSelectedOption] = useState(choices[0]);
    
      const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        onSelect(selectedOption);
        navigate('/listing');
      };
    
    return(
    <div>
     <div id="map"></div>
     <h1>Choose an Option:</h1>
      <form onSubmit={handleSubmit}>
        <select value={selectedOption} onChange={handleChange}>
          {choices.map((choice, index) => (
            <option key={index} value={choice}>{choice}</option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};



export default Home;
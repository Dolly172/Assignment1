import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';
import Home from './components/Home';
import Listing from './components/Listing';
import { Route, Routes } from 'react-router-dom';
import Details from './components/Details';

function App() {
  
  const API_KEY = "AIzaSyCAD23j-dEbcjHKreY_lrq8boyVlGLLEhA";

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    
    const showPosition = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log("Latitude: " + position.coords.latitude +
      " Longitude: " + position.coords.longitude);
    };
    
    getLocation();
  })

  const fetchPlaces = (selectedOption) => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 15
    });

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: { lat: latitude, lng: longitude },
      radius: 4500,
      type: [selectedOption]
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        setPlaces(results);
      } else {
        console.error('Error fetching places:', status);
      }
    });
  };

  const handleSelect = (selectedOption) => {
    fetchPlaces(selectedOption);
  };

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home onSelect={handleSelect} />} />
        <Route path='/listing' element={<Listing places={places} />} />
        <Route path='/details' element={<Details latitude={latitude} longitude={longitude} />} />
      </Routes>
     
    </div>
  );
}

export default App;

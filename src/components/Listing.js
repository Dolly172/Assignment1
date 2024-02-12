import React, { useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import '../App.css';
import Pagination from './Pagination';
import { Autocomplete } from '@react-google-maps/api';

function Listing({ places }){

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);

  const placesPerPage = 10;
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const totalPages = Math.ceil((filteredPlaces.length > 0 ? filteredPlaces : places).length / placesPerPage);

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filtered = places.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
  };

  const handleAutocompleteLoad = (autocomplete) => {
    console.log('Autocomplete loaded:', autocomplete);
    setAutocomplete(autocomplete); 
  };

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace(); 
      console.log('Selected place:', place);
      handleSearch(place.name); 
      navigateToDetails(place);
    }
  };

  const navigateToDetails = (place) => {
    navigate('/details', { state: JSON.stringify(place) }); 
  };

    function backhandler(){
        navigate('/');
    }

    return(
    <div>
    <button className='back-btn' onClick={backhandler}>Back to Home</button>   
    <h1>Listing Places</h1>
    <Autocomplete onLoad={handleAutocompleteLoad} onPlaceChanged={handlePlaceChanged}>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Search places...'
        />
      </Autocomplete>
        <ul>
        {(filteredPlaces.length > 0 ? filteredPlaces : currentPlaces).map((place, index) => (
            
        <li key={index}>
            <div>
            <Link to='/details' state={JSON.stringify(place)}>
            <h3>{place.name}</h3>
            </Link>
            <p>Address: {place.vicinity}</p>
            </div>
        </li>
        ))}
        </ul>
        <div>
          <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} places={places} filteredPlaces={filteredPlaces} />
      </div>
    </div>
    )
}

export default Listing;
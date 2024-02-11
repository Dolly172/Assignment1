import React, { useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import '../App.css';


function Listing({ places }){

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const placesPerPage = 10;
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const totalPages = Math.ceil((filteredPlaces.length > 0 ? filteredPlaces : places).length / placesPerPage);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = places.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <button key={i} onClick={() => handlePagination(i)}>
          {i}
        </button>
      );
    }
    return pagination;
  };

    function backhandler(){
        navigate('/');
    }

    return(
    <div>
    <button className='back-btn' onClick={backhandler}>Back to Home</button>   
    <h1>Listing Places</h1>
    <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search places..."
      />
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
        {renderPagination()}
      </div>
    </div>
    )
}

export default Listing;
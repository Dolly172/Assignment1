import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

function Details({latitude, longitude}){
    
    const location = useLocation();
    const placeDetails = JSON.parse(location.state);
    console.log(placeDetails);
    const navigate = useNavigate();

    function backhandler(){
        navigate('/listing');
    }

    const showDirections = () => {
        const { lat: destLat, lng: destLng } = placeDetails.geometry.location;

        const currentLocation = `${latitude},${longitude}`;
        const destination = `${destLat},${destLng}`;

        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation}&destination=${destination}`;
        window.open(directionsUrl, '_blank');
    }

    return(
    <div>
    <button onClick={backhandler}>Back to Listing</button>  
    <button onClick={showDirections}>Show Directions</button> 
    <h1>Details</h1>
        <div>
          <div>{placeDetails.name}</div>
          <div>Address: {placeDetails.vicinity}</div>
          <div>Rating: {placeDetails.rating}</div>
        </div>
    </div>
    )
}

export default Details;
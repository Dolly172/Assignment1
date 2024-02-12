import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

function Details({latitude, longitude}){
    
    const location = useLocation();
    const placeDetails = JSON.parse(location.state);
    // console.log("place details:: ", placeDetails);
    const navigate = useNavigate();
    const [placePhotos, setPlacePhotos] = useState([]);
    const [map, setMap] = useState(null); 


    useEffect(() => {
        const fetchPlaceDetails = async () => {
            console.log("inside fetch details");
          try {
            if (!map) {
                const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 15
               });
                setMap(map);
              }
            const request = {
              placeId: placeDetails.place_id,
              fields: ['name', 'formatted_address', 'rating', 'photos']
            };
            const service = new window.google.maps.places.PlacesService(map);
            service.getDetails(request, (place, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlacePhotos(place.photos);
              } else {
                console.error('Error fetching place details:', status);
              }
            });
          } catch (error) {
            console.error('Error fetching place details:', error);
          }
        };
    
        fetchPlaceDetails();
        
      }, [placeDetails.place_id, map]);     

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
        <div id="map"></div>
          <div>{placeDetails.name}</div>
          <div>Address: {placeDetails.vicinity}</div>
          <div>Rating: {placeDetails.rating}</div>
          <h4>Photos:</h4>
          <div>
          {placePhotos?.map((photo, index) => (
            <img
              key={index}
              src={photo.getUrl({minWidth: 300, maxWidth: 400, maxHeight: 200})}
              alt={`Photo ${index + 1}`}
            />
          ))}
        </div>
        </div>
    </div>
    )
}

export default Details;
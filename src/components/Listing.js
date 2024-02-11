import React from 'react';
import {useNavigate, Link} from 'react-router-dom';

function Listing({ places }){

    const navigate = useNavigate();

    function backhandler(){
        navigate('/');
    }

    return(
    <div>
    <button onClick={backhandler}>Back to Home</button>   
    <h1>Listing Places</h1>
        <ul>
        {places.map((place, index) => (
            
        <li key={index}>

            <div>
                {console.log(place)}
            <Link to='/details' state={JSON.stringify(place)}>
            {/* <Link to={{pathname: '/details', state: {place} }}> */}
            <h3>{place.name}</h3>
            </Link>

            <p>Address: {place.vicinity}</p>
            </div>
        </li>
        ))}
        </ul>
    </div>
    )
}

export default Listing;
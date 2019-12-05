 /* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./Map.css";
import GoogleMapReact from 'google-map-react';
import Marker from "../Marker/Marker";


const Map = ({predictedHomeInfo, proximalHouses}) => {

  const center = {
    lat: predictedHomeInfo.lat,
    lng: predictedHomeInfo.lng
  };
  const defaultCenter = {
    lat: 43.7181552,
    lng: -79.5184843
  };
  const zoom = 14.5;
  const markers = proximalHouses.map(house => {
    if (!(predictedHomeInfo.address).includes(house.houseNumber + " " + house.streetName)) {
      return (
        <Marker 
          key={house._id}
          lat={house.loc.coordinates[1]}
          lng={house.loc.coordinates[0]}
          name="house"
          color="blue"
      />
      )
    } else {
      return 0;
    }
  })
  

  return (
      <div className="Map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyACmALJxFSXPsfcTmHGQR8Q2tuVyQUzWdg' }}
            defaultCenter={defaultCenter}
            center={center}
            defaultZoom = {zoom}
          >
            
           <Marker 
              lat={predictedHomeInfo.lat}
              lng={predictedHomeInfo.lng}
              name="house"
              color="red"
            />
            {markers}
          </GoogleMapReact>
      </div>
  );
};



export default Map;

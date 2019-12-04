 /* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./Map.css";
import GoogleMapReact from 'google-map-react';
import Marker from "../Marker/Marker";


const Map = ({predictedHomeInfo}) => {

  const center = {
    lat: predictedHomeInfo.lat,
    lng: predictedHomeInfo.lng
  };
  const zoom = 14.5;
  

  return (
      <div className="Map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyACmALJxFSXPsfcTmHGQR8Q2tuVyQUzWdg' }}
            defaultCenter={center}
            defaultZoom = {zoom}
          >
           <Marker 
              lat={predictedHomeInfo.lat}
              lng={predictedHomeInfo.lng}
              name="house"
              color="red"
            />
          </GoogleMapReact>
      </div>
  );
};



export default Map;

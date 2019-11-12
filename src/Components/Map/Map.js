 /* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./Map.css";
import GoogleMapReact from 'google-map-react';

const Map = props => {
  const center = {
    lat: 43.2627604,
    lng: -79.9198973
  };
  const zoom = 14.5;

  return (
      <div className="Map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyACmALJxFSXPsfcTmHGQR8Q2tuVyQUzWdg' }}
            defaultCenter={center}
            defaultZoom = {zoom}
          ></GoogleMapReact>
      </div>
  );
};



export default Map;

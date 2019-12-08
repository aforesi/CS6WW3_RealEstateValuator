 /* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState, useEffect} from "react";
import "./Map.css";
import GoogleMapReact from 'google-map-react';
import Marker from "../Marker/Marker";
import InfoBox from "../InfoBox/InfoBox";

const Map = ({predictedHomeInfo, proximalHouses, amenities}) => {

  const center = {
    lat: predictedHomeInfo.lat,
    lng: predictedHomeInfo.lng
  };
  const defaultCenter = {
    lat: 43.7181552,
    lng: -79.5184843
  };
  const zoom = 16;

  const [hovered, setHovered] = useState(false);
  const [amenityHovered, setAmenityHovered] = useState(false);
  const [houseInfo, setHouseInfo] = useState(null);
  const [amenityInfo, setAmenityInfo] = useState(null);
  const [infoBoxCoordinates, setInfoBoxCoordinates] = useState(0);
  
  const displayInfoBox = (status, lat, lng, address, bedrooms, bathrooms, squareFt) => {
    setInfoBoxCoordinates({
      lat: lat * 1.00005,
      lng: lng
    })
    setHouseInfo({
      type: "house",
      address: address,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      squareFt: squareFt
    })
    setHovered(status);
  }

  const displayAmenityInfoBox = (status, lat, lng, name) => {
    setInfoBoxCoordinates({
      lat: lat * 1.00005,
      lng: lng
    })
    setAmenityInfo({
      type: "amenity",
      name: name
    })
    setAmenityHovered(status);
  }


  const proximalHouseMarkers = proximalHouses.map(house => {
    if (!(predictedHomeInfo.address).includes(house.houseNumber + " " + house.streetName)) {
      return (
          <Marker 
            key={house._id}
            houseInfo={house}
            lat={house.loc.coordinates[1]}
            lng={house.loc.coordinates[0]}
            name={house.houseNumber + " " + house.streetName}
            color="blue"
            type="proximalHouse"
            displayInfoBox={displayInfoBox}
          />
      )
    } else {
      return 0;
    }
  })

  const amenityMarkers = amenities.map(amenity => {
    return (
          <Marker 
            key={amenity._id}
            name={amenity.name}
            lat={amenity.loc.coordinates[1]}
            lng={amenity.loc.coordinates[0]}
            color="yellow"
            type="amenity"
            displayInfoBox={displayInfoBox}
            displayAmenityInfoBox={displayAmenityInfoBox}
          />
      )
    
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
              name={predictedHomeInfo.address.substr(0, predictedHomeInfo.address.indexOf(','))}
              color="green"
              displayInfoBox={displayInfoBox}
              houseInfo={predictedHomeInfo}
              type="predictedHouse"
            />
            {proximalHouseMarkers}
            {amenityMarkers}
            {hovered ? <InfoBox lat={infoBoxCoordinates.lat} lng={infoBoxCoordinates.lng} info={houseInfo} /> : undefined}
            {amenityHovered ? <InfoBox lat={infoBoxCoordinates.lat} lng={infoBoxCoordinates.lng} info={amenityInfo} /> : undefined}
            {/* {hovered ? <InfoBox lat={43.257980} lng={-79.917010} /> : undefined} */}
            {/* { hovered ? <Marker lat={43.257980} lng={-79.917010} name="test" color="red" toggleHover={toggleHover} type="predictedHouse"/> : undefined} */}
          </GoogleMapReact>
      </div>
  );
};



export default Map;

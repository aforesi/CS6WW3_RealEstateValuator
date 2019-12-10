 /* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState} from "react";
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
  
  const displayInfoBox = (status, lat, lng, address, bedrooms, bathrooms, squareFt, type, price, lastSaleDate) => {
    setInfoBoxCoordinates({
      lat: lat * 1.00005,
      lng: lng
    })
    setHouseInfo({
      type: type,
      address: address,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      squareFt: squareFt,
      price: price,
      lastSaleDate: lastSaleDate
    })
    setHovered(status);
  }

  function getDistanceFromHouse() {
    var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
    var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
    var R = 6372.8; // km
    var dLat = lat2 - lat1;
    var dLon = lon2 - lon1;
    var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var distance = Math.round((R * c) * 1000);
    console.log("calculation: ", distance);
    return distance;
}

  const displayAmenityInfoBox = (status, lat, lng, name) => {  
    setInfoBoxCoordinates({
      lat: lat * 1.00005,
      lng: lng
    })
    setAmenityInfo({
      type: "amenity",
      name: name,
      distance: getDistanceFromHouse(lat, lng, predictedHomeInfo.lat, predictedHomeInfo.lng)
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
            {hovered ? <InfoBox lat={infoBoxCoordinates.lat} lng={infoBoxCoordinates.lng} info={houseInfo}  /> : undefined}
            {amenityHovered ? <InfoBox lat={infoBoxCoordinates.lat} lng={infoBoxCoordinates.lng} info={amenityInfo} /> : undefined}
            {/* {hovered ? <InfoBox lat={43.257980} lng={-79.917010} /> : undefined} */}
            {/* { hovered ? <Marker lat={43.257980} lng={-79.917010} name="test" color="red" toggleHover={toggleHover} type="predictedHouse"/> : undefined} */}
          </GoogleMapReact>
      </div>
  );
};



export default Map;

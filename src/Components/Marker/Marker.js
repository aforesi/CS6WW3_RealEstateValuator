 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, { useState} from "react";
 
 const Marker = (props) => {
    const { color, name, type, lat, lng, displayInfoBox, houseInfo, displayAmenityInfoBox} = props;
    const [width, setWidth] = useState('18px');
    const [height, setHeight] = useState('18px');

    var markerStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: width,
      height: height,
      backgroundColor: color,
      border: '2px solid black',
      borderRadius: '100%',
      userSelect: 'none',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer'
    }
   
    const mouseEnter = () => {
      setWidth('30px');
      setHeight('30px');
      if (type === "amenity") {
        displayAmenityInfoBox(true, lat, lng, name);
      } else if (type === 'proximalHouse') {
        displayInfoBox(true, lat, lng, name, houseInfo.bedrooms, parseInt(houseInfo.fullBathrooms) + parseInt(houseInfo.halfBathrooms), houseInfo.livableSquareFeet, "proximalHouse", houseInfo.salePrice);
      } else {
        displayInfoBox(true, lat, lng, name, houseInfo.bedrooms, parseInt(houseInfo.fullBathrooms) + parseInt(houseInfo.halfBathrooms), houseInfo.livableSquareFeet, "predictedHouse", houseInfo.calculatedValue);
      }
      
    }

    const mouseLeave = () => {
      setWidth('18px');
      setHeight('18px');
      if (type === "amenity") {
        displayAmenityInfoBox(false);
      } else {
        displayInfoBox(false);
      }
    }

    return (
      <div>
        <div style={markerStyle}
          title={name}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        />
      </div>
    );
  };

  export default Marker;
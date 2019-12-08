
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, { useState} from "react";
//  import "./InfoBox.css";
 
 



 const InfoBox = (props) => {
   const {lat, lng, info} = props;

    var infoBoxStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '200px',
      height: '150px',
      backgroundColor: '#f1f2a2',
      border: '2px solid #000000',
      borderRadius: '5%',
      userSelect: 'none',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer'
    }

    if (info.type == "house") {
      return (
        <div style={infoBoxStyle}>
          <p>{info.address}</p>
          <p>Bedrooms: {info.bedrooms}</p>
          <p>Bathrooms: {info.bathrooms}</p>
          <p>Square ft.: {info.squareFt}</p>
        </div>
      );
    } else {
      return (
        <div style={infoBoxStyle}>
          <p>{info.name}</p>
        </div>
      );   
    }
  };

  export default InfoBox;
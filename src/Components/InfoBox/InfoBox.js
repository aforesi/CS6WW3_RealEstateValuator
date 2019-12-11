
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React from "react";
 import CurrencyFormat from 'react-currency-format';

 const InfoBox = (props) => {
   const {info} = props;

   var infoBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200px',
    height: '50px',
    backgroundColor: '#f1f2a2',
    border: '4px solid #000000',
    borderRadius: '10%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer'
  }

   if (info.type === "amenity") {
      infoBoxStyle.height = '70px';
      infoBoxStyle.backgroundColor = '#f1f2a2';
      infoBoxStyle.borderRadius = '8px';
   } else if (info.type === "proximalHouse") {
      infoBoxStyle.height = '180px';
      infoBoxStyle.backgroundColor = 'lightblue';
      infoBoxStyle.borderRadius = '10%';
   } else {
      infoBoxStyle.height = '150px';
      infoBoxStyle.backgroundColor = 'lightgreen';
      infoBoxStyle.borderRadius = '10%';
   }

    if (info.type === "proximalHouse") {
      return (
        <div style={infoBoxStyle}>
          <h6>{info.address}</h6>
          <p>Bedrooms: {info.bedrooms}</p>
          <p>Bathrooms: {info.bathrooms}</p>
          <p>Square ft.: {info.squareFt}</p>
          <p>Last sale price: <CurrencyFormat value={info.price} displayType={'text'} thousandSeparator={true} prefix={' $'} /></p>
          <p>Last sale date: {info.lastSaleDate.slice(0, 10)}</p>
        </div>
      );
    } else if (info.type === "predictedHouse") {
      return (
        <div style={infoBoxStyle}>
          <h6>{info.address}</h6>
          <p>Bedrooms: {info.bedrooms}</p>
          <p>Bathrooms: {info.bathrooms}</p>
          <p>Square ft.: {info.squareFt}</p>
          <p>Predicted Value: <CurrencyFormat value={info.price} displayType={'text'} thousandSeparator={true} prefix={' $'} /></p>
        </div>
      );
    } else {
      return (
        <div style={infoBoxStyle}>
          <h6>{info.name}</h6>
          <p>Distance: {info.distance} meters</p>
        </div>
      );   
    }
  };

  export default InfoBox;
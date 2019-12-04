
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React from "react";
 import "./Marker.css";
 
 
 const Marker = (props: any) => {
    const { color, name} = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;
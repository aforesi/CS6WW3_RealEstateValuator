
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React from "react";
 import "./Loading.css";


 const Loading = (props) => {
    return (
    //   <div className="dialog">{ <i className="fa fa-refresh fa-spin"></i> }</div>
    <div className='popup'>  
        <div className="popup\_inner">  
            <h1><i className="fa fa-refresh fa-spin"></i></h1>
        </div>    
    </div>
    );
  };

  export default Loading; 
import React from "react";
import "./Layout.css";
import ToolBar from "../ToolBar/ToolBar";

const Layoput = props => {
  return (
    <div>
      <ToolBar />
      <main className="Content">{props.children}</main>
    </div>
  );
};

export default Layoput;

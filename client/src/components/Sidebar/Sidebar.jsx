import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  let item = props.item;
const handleEvent = (e)=>{
  e.preventDefault();
}
  return (
    <div className="sidebar" onClick={handleEvent}>
      {item.map((element, index) => {
        return (
          <Link to={item[index].pathname} key={index}>
            <i className={item[index].icon?item[index].icon:""}></i> {item[index].name}
          </Link>
        );
      })}
    </div>
  );
}

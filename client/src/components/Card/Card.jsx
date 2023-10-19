import React from "react";
import "./Card.css";

export default function Card(props) {
  const cardItem = props.cardItem;

  return (
    <div className="card-container">
      {cardItem.map((element, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-content">
              <h2 className="card-title">{element.cardTitle}</h2>
              <span className="card-icon"><i className={element.cardIcon}></i></span>
            </div>
            {/* <hr/> */}
            <h5 className="card-count">{element.total}</h5>
          </div>
        );
      })}
    </div>
  );
}

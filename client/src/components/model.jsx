import React from "react";
import "./Modal/Modal.css";

export default function model() {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Modal title</h1>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "2rem" }}>Some text in the Modal..</p>
        </div>
        <div className="modal-footer">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="close">Close</button>&nbsp;&nbsp;
            <button type="button" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

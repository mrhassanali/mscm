import React from "react";
import Modal from 'react-modal';
import "./Modal.css";

export default function ModalComp(props) {
  const { isOpen, onClose, children,title } = props;

  Modal.defaultStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.75)"
    },
    content: {
      position: "absolute",
      top: "40px",
      left: "40px",
      right: "40px",
      bottom: "40px",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "0" // Remove the default padding by setting it to 0
    }
  };
  
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary">
            Close
          </button>
        </div>

        <div className="modal-body">{children}</div>

{/* <div className="modal-footer">
<button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
<button type="button" className="btn btn-primary">Save changes</button>
</div> */}
      </Modal>
    </div>
  );
}

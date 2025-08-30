import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Done(): React.JSX.Element {
  return (
    <div className="done-message">
      <FontAwesomeIcon icon={faCheckCircle} className="done-icon" />
      <p className="done-text">Build complete! Your project is ready 🚀</p>
    </div>
  );
}

export default Done;

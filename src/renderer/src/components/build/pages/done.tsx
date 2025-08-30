import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import '../../styles/buildCss/done.css'

function Done(): React.JSX.Element {
  return (
    <div className="done-message">
      <FontAwesomeIcon icon={faCheckCircle} className="done-icon" color="#4ade80" />
      <p className="done-text">Build complete! Your project is ready 🚀</p>
    </div>
  );
}

export default Done;

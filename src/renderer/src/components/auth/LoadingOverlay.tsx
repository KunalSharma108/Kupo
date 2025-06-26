import React from 'react';
import '../styles/auth.css'

const LoadingOverlay = (): React.JSX.Element => {
  return (
    <div className="overlay">
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingOverlay;

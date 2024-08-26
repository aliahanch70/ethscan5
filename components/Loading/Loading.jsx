// components/LoadingIndicator.tsx

import React from 'react';
import './Loading.css'; // Import the CSS for the animation

const Loading = () => {
  return (
    <div className="loading-indicator">
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
      <div className="dot dot4"></div>
      <div className="dot dot5"></div>
      <div className="dot dot6"></div>
    </div>
  );
};

export default Loading;

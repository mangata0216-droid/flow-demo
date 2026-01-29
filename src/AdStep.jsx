import React, { useState } from 'react';
import './StepCommon.css';

const AdStep = ({ step }) => {
  const [showImage, setShowImage] = useState(false);

  const handleClaim = () => {
    // 显示固定图片，不再跳转
    setShowImage(true);
  };

  if (showImage) {
    return (
      <div className="ad-full-image-container">
        <img 
          src="/image/story-intro-stepaddv.png" 
          alt="领取成功" 
          className="ad-full-image"
        />
      </div>
    );
  }

  return (
    <div
      className={`step-container ad-landing-page ${step?.backgroundImage ? 'step-container--has-bg' : ''}`}
      style={
        step?.backgroundImage
          ? { backgroundImage: `url(${step.backgroundImage})` }
          : undefined
      }
    >
      <div className="ad-footer">
        <button className="claim-button" onClick={handleClaim}>
          {step.buttonText}
        </button>
      </div>
    </div>
  );
};

export default AdStep;
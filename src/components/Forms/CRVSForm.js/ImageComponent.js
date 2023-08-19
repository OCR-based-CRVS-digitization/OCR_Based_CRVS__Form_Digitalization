import React from 'react';
import myImage from './1.1.jpg'; // Import your image

function ImageComponent() {
  return (
    <div className="image-container">
      <img src={myImage} alt="My Form" className="img-fluid" />
    </div>
  );
}

export default ImageComponent;

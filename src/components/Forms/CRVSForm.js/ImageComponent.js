import React from 'react';

function ImageComponent(props) {
  console.log(props.imageURL);
  return (
    <div className="image-container">
      <img src={props.imageURL} alt="My Form" className="img-fluid" />
    </div>
  );
}

export default ImageComponent;

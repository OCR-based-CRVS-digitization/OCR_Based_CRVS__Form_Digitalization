import React, { useState } from 'react';
import './buttonGroup.css';

const ButtonGroup = (props) => {
  const [clickedButtons, setClickedButtons] = useState(props.initial || []);
  //console.log(props.batch);

  const handleClick = (buttonName) => {
    // Check if the button is already clicked
    if (clickedButtons.includes(buttonName)) {
      // If clicked, remove it from the list (toggle off)
      setClickedButtons(clickedButtons.filter((btn) => btn !== buttonName));
    } else {
      // If not clicked, add it to the list (toggle on)
      setClickedButtons([...clickedButtons, buttonName]);
    }
  };

  const buttonStyles = (buttonName) => {
    // Determine the button's style based on the number of clicked buttons
    if(!clickedButtons.includes(buttonName)){
        return 'btn btn-light btn-sm btn-bordered';
    }
    else if (clickedButtons.length === 1 && clickedButtons.includes(buttonName)) {
      return 'btn btn-success btn-sm btn-bordered'; // Green for one selected button
    } else if (clickedButtons.length >= 2) {
      return 'btn btn-danger btn-sm btn-bordered'; // Red for two or more selected buttons
  };
}

  return (
        <div class="input-group">
      {props.batch.map((buttonName) => {
        return (
          <button
            key={buttonName}
            className={buttonStyles(buttonName)}
            onClick={() => handleClick(buttonName)}
          >
            {buttonName}
          </button>
        );
      })}
      </div>
  );
};

export default ButtonGroup;

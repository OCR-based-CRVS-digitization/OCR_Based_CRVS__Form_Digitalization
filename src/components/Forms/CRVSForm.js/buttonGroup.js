import React, { useEffect, useState } from 'react';
import './buttonGroup.css';

const ButtonGroup = (props) => {
  const [clickedButtons, setClickedButtons] = useState(props.initial || []);
  //console.log(props.batch);


  useEffect(() => {
    // console.log(clickedButtons);
    if (clickedButtons.length === 1) {
      props.onButtonSelect(clickedButtons[0]);
    }
  }, [clickedButtons]);

  const handleButtonGroupClick = (buttonName) => {
    setClickedButtons((prevClickedButtons) => {
      if (prevClickedButtons.includes(buttonName)) {
        // If clicked, remove it from the list (toggle off)
        return prevClickedButtons.filter((btn) => btn !== buttonName);
      } else {
        // If not clicked, add it to the list (toggle on)
        return [...prevClickedButtons, buttonName];
      }
    });
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
    }
  };

  return (
      <div className="input-group">
        {props.batch.map((buttonName) => {
          return (
            <button
              key={buttonName}
              className={buttonStyles(buttonName)}
              type="button"
              onClick={() => handleButtonGroupClick(buttonName)}
            >
              {buttonName}
            </button>
          );
        })}
      </div>
  );
};

export default ButtonGroup;

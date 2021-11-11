import React, { useState } from 'react';
import '../scss/cafecard.scss';

const CafeCard = (props) => {
    const { name, address } = props;
    const [isShown, setIsShown] = useState(false);

    return (
      <div 
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} 
        className="cafecard"
        style={{ cursor: 'pointer'}}
        title={name}
        id = "cafeMarker"
      >
        {isShown && (
          <div id='cafetext'>
            <h1>{name}</h1>
            <h4>{address[0]}</h4>
            <h4>{address[1]}</h4>
          </div>
        )}
      </div>
    );
  };

export default CafeCard;
import React, { useState } from 'react';
import '../scss/cafecard.scss';

const CafeCard = (props) => {
    const { name } = props;
    const [isShown, setIsShown] = useState(false);

    return (
      <div 
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} 
        className="cafecard"
        style={{ cursor: 'pointer'}}
        title={name}
      >
        {isShown && (
          <div id='cafetext'>
            CAFE NAME + ADDRESS
          </div>
        )}
      </div>
    );
  };

export default CafeCard;
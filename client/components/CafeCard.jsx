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
      >
        {isShown && (
          <div id='cafetext'>
            <h1>{name}</h1>
            {/* <h4>{address}</h4> */}
          </div>
        )}
      </div>
    );
  };

export default CafeCard;
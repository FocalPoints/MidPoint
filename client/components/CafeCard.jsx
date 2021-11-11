import React, { useState } from 'react';
import '../scss/cafecard.scss';

const CafeCard = (props) => {
    const { name, address, photo } = props;
    const [isShown, setIsShown] = useState(false);
  console.log('PHOTO',photo)
    console.log('CAFE ADDRESS',address);

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
          <div className='cafetext' style={{backgroundImage:`url(${photo})`}} >
            <h1 className='cardShop'>{name}</h1>
            <div className='addressBlock'>
            <h4 className='cardAddress'>{address[0]}</h4>
            <h4 className='cardAddress'>{address[1]}</h4>
            </div>
          </div>
        )}
      </div>
    );
  };

export default CafeCard;
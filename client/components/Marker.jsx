import React from 'react';
import '../scss/marker.scss';

const Marker = (props) => {
    const { name, id } = props;
    return (
      <div className="marker"
        style={{cursor: 'pointer'}}
        name = {name}
        id = {id}
      />
    );
  };

  export default Marker;
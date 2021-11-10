import React, { useState, useEffect } from 'react';


const ScheduleModal = ({showModal, friend}) => {
  console.log(showModal)
  return (showModal ? 
    <div className ="scheduleDisplay">
      <div className ="scheduleDisplayHeading">
        <p>Schedule {friend}</p>
      </div>
    </div>
    : null
  );
}

export default ScheduleModal;
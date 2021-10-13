import React from 'react';
import DayListItem from './DayListItem';

const DayList = props => {
  const { days, dayState, setDay } = props;
  const dayListItems = days.map(day => <DayListItem 
    key={day.id} 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === dayState}
    setDay={setDay}
    />);

  return (
    <ul>
      {dayListItems}
    </ul>
  )
}

export default DayList;
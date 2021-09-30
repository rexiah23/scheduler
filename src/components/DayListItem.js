import React from "react";
import classnames from 'classnames/bind';
import './DayListItem.scss';

function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected" : props.selected, 
    "day-list__item--full" : props.spots === 0
  })
  
  const formatSpots = event => {
    if (props.spots === 0) {
      return "no spots remaining";
    }

    if (props.spots === 1) {
      return "1 spot remaining";
    }

    if (props.spots === 2) {
      return "2 spots remaining";
    }

    return props.spots
  }

  const remainingSpots = formatSpots();

  return (
    <li className={dayClass} onClick={()=>props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{remainingSpots}</h3>
    </li>
  );
}

export default DayListItem;
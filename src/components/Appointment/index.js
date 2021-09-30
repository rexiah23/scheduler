import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './styles.scss';

const Appointment = props => {
  const { id, time, interview } = props;
  const body = interview ? <Show 
  student={interview.student} 
  interviewer={interview.interviewer}/> : <Empty /> 
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {body}
    </article>
  );
}

export default Appointment;
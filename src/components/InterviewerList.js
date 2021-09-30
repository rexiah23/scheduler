import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';

const interviewerList = props => {
  const { interviewers, value, onChange } = props;
  
  const interviewListItems = interviewers.map(interview => {
    return <InterviewerListItem 
      key={interview.id}
      name={interview.name}
      avatar={interview.avatar}
      selected={interview.id === value}
      onChange={event => onChange(interview.id)}
    />
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewListItems}
      </ul>
    </section>
  );
}

export default interviewerList; 
import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import './styles.scss';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY"; 
const SHOW = "SHOW"; 
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const Appointment = props => {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY); 

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id,interview)
    .then(() => transition(SHOW, true))
    .catch(error => {
      transition(ERROR_SAVE, true);
    })
      
  }

  const cancel = (id) => {
    transition(DELETING, true)
    cancelInterview(id)
    .then(() => transition(EMPTY, true))
    .catch(error => {
      transition(ERROR_DELETE, true);
    })
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty 
      onAdd={() => transition('CREATE')}/>}
      {mode === SHOW && <Show 
      student={interview.student} 
      interviewer={interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
      />
      }
      {mode === CREATE && <Form 
        interviewers = {interviewers}
        onCancel={() => back()}
        onSave={save}
      />}
    {mode === SAVING && <Status message={'Saving New Appointment'}/>}
    {mode === CONFIRM && <Confirm 
      message={'Are you sure you would like to delete?'} 
      onConfirm={() => cancel(id)}
      onCancel={() => back()}
      /> }
    {mode === DELETING && <Status message={'Deleting'} />}
    {mode === EDIT && <Form 
        interviewers = {interviewers}
        onCancel={() => back()}
        onSave={save}
        interviewer={interview.interviewer}
        name={interview.student}
      />}
    {mode === ERROR_SAVE && <Error message={'Failed to save'} onClose={() => back()}/>}
    {mode === ERROR_DELETE && <Error message={'Failed to delete'}  onClose={() => back()}/>}

    </article>
  );
}

export default Appointment;
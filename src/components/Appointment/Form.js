import React, { useState } from 'react'; 
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = props => {
  const { name, interviewers, interviewer, onSave, onCancel } = props;

  const [nameState, setName] = useState(name || '');
  const [interviewerState, setInterviewer] = useState(interviewer || null);

  const reset = event => {
    setName("");
    setInterviewer(null);
  }

  const cancel = event => {
    reset();
    onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={nameState}
          onChange={event => setName(event.target.value)} 
        />
      </form>
      <InterviewerList interviewers={interviewers} value={interviewerState} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => onSave(nameState, interviewerState)}>Save</Button>
      </section>
    </section>
  </main>
  )
}

export default Form;
import React, { useState } from 'react'; 
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = props => {
  const { name, interviewers, interviewer, onSave, onCancel } = props;

  const [nameState, setName] = useState(name || '');
  const [interviewerState, setInterviewer] = useState(interviewer ? interviewer.id : null);
  const [error, setError] = useState("");

  const reset = event => {
    setName("");
    setInterviewer(null);
  }

  const cancel = event => {
    reset();
    onCancel()
  }

  console.log(interviewerState)
  function validate() {
    if (nameState === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewerState) {
      setError("Please select an interviewer by clicking on the icon");
      return;
    }

    setError(''); 
    onSave(nameState, interviewerState); 
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
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList interviewers={interviewers} value={interviewerState} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  )
}

export default Form;
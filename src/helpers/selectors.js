export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayState => dayState.name === day);
  const appointmentObjs = dayObj && dayObj.length !== 0 ? dayObj.appointments.map(el => state.appointments[el]) : [];
  return appointmentObjs;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  console.log("state")
  const { id, name, avatar } = state.interviewers[interview.interviewer];
  const student = interview.student; 

  return {
    student, 
    interviewer: {
      id,
      name, 
      avatar
    }
  }
}

export function getInterviewersForDay(state, day) {
  const today = state.days.find(el => el.name === day); 
  const interviewers = today && today.length !== 0 ? today.interviewers.map(el => state.interviewers[el]) : [];
  return interviewers;
}
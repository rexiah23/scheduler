export function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  const appointmentIds = state.days.filter(day_ => day_.name === day);
  const appointmentObjs = appointmentIds.length !== 0 ? appointmentIds[0].appointments.map(el => state.appointments[el]) : [];
  return appointmentObjs;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

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
  const today = state.days.filter(el => el.name === day); 
  const interviewers = today.length !== 0 ? today[0].interviewers.map(el => state.interviewers[el]) : [];
  return interviewers;
}
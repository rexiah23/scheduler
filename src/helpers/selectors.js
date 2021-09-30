export function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  const appointmentIds = state.days.filter(day_ => day_.name === day);
  const appointmentObjs = appointmentIds.length !== 0 ? appointmentIds[0].appointments.map(el => state.appointments[el]) : [];
  return appointmentObjs;
}
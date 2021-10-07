import { useState, useEffect } from "react";
import axios from 'axios'; 

const useApplicationData = () => {
    
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('api/interviewers')
  ]).then(all => {
    const days = all[0].data;
    const appointments = all[1].data;
    const interviewers = all[2].data;
    setState(prev => {
      return {
        ...prev, 
        days, 
        appointments,
        interviewers
      }
    })
  })
  }, []);

  const bookInterview = (id, interview) => {
    const copy = {...interview}; 
    const appointment = {
      ...state.appointments[id],
      interview: copy
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];
    const dayId = days.filter(el => el.name === state.day)[0].id
    days[dayId -1].spots --; 

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState(prev => {
      return {
        ...prev, 
        appointments,
        days
      }
    }))
  }

  const setDay = day => setState(prev => {
    return {
      ...prev, 
      day
    }
  })

  const cancelInterview = id => {
    const copy = {...state}; 
    copy.appointments[id].interview = null; 
    const dayId = copy.days.filter(el => el.name === state.day)[0].id; 
    copy.days[dayId -1].spots ++; 
    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState(copy))
  }

  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList"; 
import Appointment from "components/Appointment/index";
import { selectUserByName, getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  })
  
  useEffect(() => {
    Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments')
  ]).then(all => {
    const days = all[0].data;
    const appointments = all[1].data;
    setState(prev => {
      return {
        ...prev, 
        days, 
        appointments
      }
    })
  })
}, []);

  const setDay = day => setState(prev => {
    return {
      ...prev, 
      day
    }
  })
  
  const appointmentsList = getAppointmentsForDay(state, state.day).map(appointment => {
    console.log("ADADA", appointment)
    return (
      <Appointment 
        key={appointment.id}
        {...appointment} 
      />
    )    
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day_={state.day} setDay={setDay}/>

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

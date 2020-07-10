import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useApplicationData() {
	const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
	});
	
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));

	const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => { 
      setAppointments(appointments);
    })

	}
	
	const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setAppointments(appointments));
	}

	useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState(prev => {
        return ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      });
    });
  }, [state.day, state.appointments]);
	
  return { state, setDay, bookInterview, cancelInterview };
}
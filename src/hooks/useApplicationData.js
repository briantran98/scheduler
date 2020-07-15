import { useEffect, useReducer } from 'react'
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPOINTMENT = "SET_APPOINTMENT";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_SPOTS = "SET_SPOTS";

axios.defaults.baseURL = "http://localhost:8001";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.value}
    case SET_APPOINTMENT:
      return {...state, appointments: action.value}
    case SET_APPLICATION_DATA:
      return {...state, days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data}
    case SET_SPOTS: {
      return {...state, days: action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, {
    day:'Monday',
    days: [],
    appointments: {}
  })

  const setDay = day => dispatch({type: SET_DAY, value: day});
  const setAppointments = appointments => dispatch({type: SET_APPOINTMENT, value: appointments});
  const setSpots = days => dispatch({type: SET_SPOTS, value: days});

  const createAppointmentsElement = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return appointments
  }

	const bookInterview = (id, interview) => {
    const appointments = createAppointmentsElement(id, interview)
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
    .then(() => {
      setAppointments(appointments)
      if (!state.appointments[id].interview ) { 
        const newSpots = state.days.map(e => e.name === state.day ? {...e, spots: e.spots - 1} : {...e});
        setSpots(newSpots)
      }
    })
	}
	
	const cancelInterview = (id) => {
    const newSpots = state.days.map(e => e.name === state.day ? {...e, spots: e.spots + 1} : {...e});
    const appointments = createAppointmentsElement(id)
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setAppointments(appointments)
      setSpots(newSpots)
    });
	}

	useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, value: all});
    });
  }, []);
	
  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
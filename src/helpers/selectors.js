export function getAppointmentsForDay(state, day) {
	const currentDay = state.days.filter(date => date.name === day);
	const appointments = currentDay[0] ? 
	currentDay[0].appointments.map((appointment) => { return (state.appointments[appointment]) })
	: []
	return appointments;
};

export function getInterview(state, interview) {
	const obj = interview ?
	{
		interviewer: {...state.interviewers[interview.interviewer]},
		student: interview.student
	} 
	: null
	return obj;
}

export function getInterviewersForDay(state, day) {
	const currentDay = state.days.filter(date => date.name === day);
	const interviewers = currentDay[0] ? 
	currentDay[0].interviewers.map((appointment) => { return (state.interviewers[appointment]) })
	: []
	return interviewers;
};
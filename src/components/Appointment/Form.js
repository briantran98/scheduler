import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");

	const reset = () => {
		setName('')
		setInterviewer(null)
	}

	const cancel = () => {
		props.onCancel(reset());
	}
	const validate = () => {
		if(name === "") {
			setError('Student name cannot be blank');
			return;
		}
		props.onSave(name, interviewer);
	}

	return(
		<main className="appointment__card appointment__card--create">
		  <section className="appointment__card-left">
		    <form onSubmit={event => event.preventDefault()} autoComplete="off">
		      <input
					  data-testid="student-name-input"
		        className="appointment__create-input text--semi-bold"
		        value={name}
		        type="text"
		        placeholder="Enter Student Name"
		        onChange={(e) =>  setName(e.target.value)}
		      />
		    </form>
				<section className="appointment__validation">{error}</section>
		    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(e) => setInterviewer(e)} />
		  </section>
		  <section className="appointment__card-right">
		    <section className="appointment__actions">
		      <Button onClick={cancel} danger>Cancel</Button>
		      <Button onClick={validate} confirm>Save</Button>
		    </section>
		  </section>
		</main>
		)
}


// Form takes 
/*
name:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function
*/
import React from 'react';
import './styles.scss';
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import {useVisualMode} from '../../hooks/useVisualMode'

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';

export default props => {
    const {time, interview, interviewers, bookInterview} = props;
    const { mode, transition, back } = useVisualMode(
        interview ? SHOW : EMPTY
      );

    const save = (name, interviewer) => {
        const interview = {
            student: name,
            interviewer
        };
    }
    console.log(mode);
    return (
        <article className='appointment'>
            <Header time={time}/>
            {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)}/>}
            {mode === SHOW && (
              <Show
                student={interview.student}
                interviewer={interview.interviewer}
              />
            )}
            {mode === CREATE && (
              <Form 
                interviewers={interviewers}
                onSave={props.onSave}
                onCancel={(e) => back()}
                save={save()}
              />
            )}
            {mode === SAVING && <Status message={"Saving"}/>}
            {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty onAdd={props.onAdd} />} */}
        </article>
    );
};
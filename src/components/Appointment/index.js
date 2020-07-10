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
const DELETING = 'DELETING';

export default props => {
    const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;
    const { mode, transition, back } = useVisualMode(
        interview ? SHOW : EMPTY
      );

    const save = (name, interviewer) => {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING)
        bookInterview(id, interview)
        .then(() => {
            transition(SHOW);
        });
    }

    const cancel = () => {
        transition(DELETING)
        cancelInterview(id)
        .then(() => {
            transition(EMPTY);
        });
    }

    return (
        <article className='appointment'>
            <Header time={time}/>
            {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)}/>}
            {mode === SHOW && (
              <Show
                student={interview.student}
                interviewer={interview.interviewer}
                onEdit={props.onEdit}
                onDelete={cancel}
              />
            )}
            {mode === CREATE && (
              <Form 
                interviewers={interviewers}
                onSave={save}
                onCancel={e => back()}
              />
            )}
            {mode === SAVING && <Status message={"Saving"}/>}
            {mode === DELETING && <Status message={"Deleting"}/>}
            {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty onAdd={props.onAdd} />} */}
        </article>
    );
};
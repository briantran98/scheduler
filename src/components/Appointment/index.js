import React from 'react';
import './styles.scss';
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'
import {useVisualMode} from '../../hooks/useVisualMode'

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


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
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }

    const cancel = () => {
        transition(DELETING, true)
        cancelInterview(id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE));
    }


    return (
        <article className='appointment'>
            <Header time={time}/>
            {mode === EMPTY && <Empty onAdd={e => transition(CREATE)}/>}
            {mode === SHOW && (
              <Show
                student={interview.student}
                interviewer={interview.interviewer}
                onEdit={e => {
                    return transition(EDIT)
                }}
                onDelete={e => transition(CONFIRM)}
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
            {mode === CONFIRM && (
              <Confirm 
                message={'Are you sure you want to delete?'}
                onCancel={e => back()}
                onConfirm={cancel}
              />
            )}
            {mode === EDIT && (
              <Form
                name={interview.student}
                interviewer={interview.interviewer.id}
                interviewers={interviewers}
                onSave={save}
                onCancel={e => back()}
              />
            )}
            {mode === ERROR_SAVE && <Error message={'Could not save appointment'} onClose={() => back()}/>}
            {mode === ERROR_DELETE && <Error message={'Could not delete appointment'} onClose={() => back()}/>}
        </article>
    );
};
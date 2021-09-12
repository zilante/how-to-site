import React from 'react';
import Button from '../../Button/index';
import styles from './index.module.css';


const AnswerEditor = ({ onChange, onSubmit, body, submit_button_text, cols }) => (
    <div className={styles.editor}>
        <textarea cols={cols} rows="10" onChange={onChange}>
            {body}
        </textarea>

        <Button onClick={onSubmit}>
            {submit_button_text}
        </Button>
    </div>
);

export default AnswerEditor;
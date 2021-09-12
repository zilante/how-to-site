import React from 'react';
import Button from '../../../Button/index';
import styles from './index.module.css';


const QuestionEditor = ({ onChangeTitle, onChangeBody, onSubmit, title, body, submit_button_text,
                          cols }) => (
    <div className={styles.editor}>
        <textarea cols={cols} rows="1" onChange={onChangeTitle}>
            {title}
        </textarea>

        <textarea cols={cols} rows="10" onChange={onChangeBody}>
            {body}
        </textarea>

        <Button onClick={onSubmit}>
            {submit_button_text}
        </Button>
    </div>
);

export default QuestionEditor;
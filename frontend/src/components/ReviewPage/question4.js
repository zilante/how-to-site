import React from 'react';
import styles from './index.module.css';

function ReviewPage4() {
    return (
    <div>
        <h1>Как быстро копировать и вставлять текст?</h1>

        <div className={styles.review}>
            <p>Какие для этого используются горяие клавиши?</p>
            <p className={styles.author}>Ivan Ivanov 30.09.20 12:20</p>
            <hr />
            <h2>1 answer</h2>
            <p>Ctrl+C, Ctrl+V</p>
            <p className={styles.author}>Salavat Idrisov 01.10.20 13:43</p>
            <hr />
        </div>
    </div>
    )
}

export default ReviewPage4
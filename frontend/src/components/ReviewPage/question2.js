import React from 'react';
import styles from './index.module.css';

function ReviewPage2() {
    return (
    <div>
        <h1>Как запустить react-app?</h1>

        <div className={styles.review}>
            <p>Какую команду надо ввести, чтобы запустить react-app?</p>
            <p className={styles.author}>Ivan Ivanov 30.09.20 12:20</p>
            <hr />
            <h2>1 answer</h2>
            <p>npm start or yarn start</p>
            <p className={styles.author}>Salavat Idrisov 01.10.20 13:43</p>
            <hr />
        </div>
    </div>
    )
}

export default ReviewPage2
import React from 'react';
import styles from './index.module.css';

function ReviewPage3() {
    return (
    <div>
        <h1>Как вычислить площадь прямоугольника?</h1>

        <div className={styles.review}>
            <p>Даны стороны a и b, требуется вычислить площадь.</p>
            <p className={styles.author}>Ivan Ivanov 30.09.20 12:20</p>
            <hr />
            <h2>1 answer</h2>
            <p>a * b</p>
            <p className={styles.author}>Salavat Idrisov 01.10.20 13:43</p>
            <hr />
        </div>
    </div>
    )
}

export default ReviewPage3
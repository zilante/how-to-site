import React from 'react';
import styles from './index.module.css';

function ReviewPage6() {
    return (
    <div>
        <h1>Как сменить директорию в командной строке bash?</h1>

        <div className={styles.review}>
            <p>Какую команду нужно использовать,
                            чтобы сменить директорию?</p>
            <p className={styles.author}>Ivan Ivanov 30.09.20 12:20</p>
            <hr />
            <h2>1 answer</h2>
            <p>cd</p>
            <p className={styles.author}>Salavat Idrisov 01.10.20 13:43</p>
            <hr />
        </div>
    </div>
    )
}

export default ReviewPage6
import React from 'react';
import styles from './index.module.css';

function ReviewPage1() {
    return (
    <div>
        <h1>Как варить макароны</h1>

        <div className={styles.review}>
            <p>Кто-нибудь знает как варить макароны?</p>
            <p className={styles.author}>Ivan Ivanov 30.09.20 12:20</p>
            <hr />
            <h2>1 answer</h2>
            <p>Проварить в воде, пока макароны не станут мягкими</p>
            <p className={styles.author}>Salavat Idrisov 01.10.20 13:43</p>
            <hr />
        </div>
    </div>
    )
}

export default ReviewPage1
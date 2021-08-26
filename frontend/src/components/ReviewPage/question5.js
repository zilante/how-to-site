import React from 'react';
import styles from './index.module.css';

function ReviewPage5() {
    return (
    <div>
        <h1>Как завязать галстук?</h1>

        <div className={styles.review}>
            <p>Никогда не пользовался галстуком. Решил попробовать,
                            но не знаю, как его завязывать. Кто-нибудь может
                             помочь?</p>
            <p className={styles.author}>Ivan Ivanov 30.09.20 12:20</p>
            <hr />
            <h2>0 answers</h2>
        </div>
    </div>
    )
}

export default ReviewPage5
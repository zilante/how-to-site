import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

function QuestionsPage() {
    return (
        <div>
        <h1>Questions</h1>
    
        <div className={styles.questions}> 
                <div className={styles.question}>
                    <p>1 answer</p>
                    <div className={styles.content}>
                        <Link to="/question_review/1">
                            Как варить макароны
                        </Link>
                        <p>
                           Кто-нибудь знает как варить макароны?
                        </p>
                    </div>
                </div>

                <div className={styles.question}>
                    <p>1 answer</p>
                    <div className={styles.content}>
                        <Link to="/question_review/2">
                            Как запустить react-app?
                        </Link>
                        <p>
                           Какую команду надо ввести, чтобы запустить react-app?
                        </p>
                    </div>
                </div>
    
                <div className={styles.question}>
                    <p>1 answer</p>
                    <div className={styles.content}>
                        <Link to="/question_review/3">
                            Как вычислить площадь прямоугольника?
                        </Link>
                        <p>
                           Даны стороны a и b, требуется вычислить площадь.
                        </p>
                    </div>
                </div>
    
                <div className={styles.question}>
                    <p>1 answer</p>
                    <div className={styles.content}>
                        <Link to="/question_review/4">
                            Как быстро копировать и вставлять текст?
                        </Link>
                        <p>
                           Какие для этого используются горяие клавиши?
                        </p>
                    </div>
                </div>
    
                <div className={styles.question}>
                    <p>0 answers</p>
                    <div className={styles.content}>
                        <Link to="/question_review/5">
                            Как завязать галстук?
                        </Link>
                        <p>
                           Никогда не пользовался галстуком. Решил попробовать,
                            но не знаю, как его завязывать. Кто-нибудь может
                             помочь?
                        </p>
                    </div>
                </div>
    
                <div className={styles.question}>
                    <p>1 answer</p>
                    <div className={styles.content}>
                        <Link to="/question_review/6">
                            Как сменить директорию в командной строке bash?
                        </Link>
                        <p>
                           Какую команду нужно использовать,
                            чтобы сменить директорию?
                        </p>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default QuestionsPage
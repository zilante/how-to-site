import React from 'react';
import { useHistory } from "react-router-dom";
import styles from './index.module.css'
import Button from '../Button'

function Start() {
    const history = useHistory();

    function logIn() {
        history.push("/auth/login");
    }

    function signUp() {
        history.push("/auth/register");
    }

    return (
        <div>
            <h1>Welcome to the How-to site!</h1>
            <div className={styles.buttons}>
            <Button onClick={logIn}>Log in</Button>
            <Button onClick={signUp}>Sign up</Button>
            </div>
        </div>
    )
}

export default Start
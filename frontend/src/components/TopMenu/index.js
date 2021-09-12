import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import styles from './index.module.css';
import Button from '../Button';
import Input from '../Input';
import Logo from "./img/logo.svg";
import Loupe from "./img/loupe.svg";

import { logoutAction } from '../../actions/user_actions';

function TopMenu() {
    const history = useHistory();
    const dispatch = useDispatch();

    function logIn() {
        history.push("/auth/login");
    }

    function search() {
        history.push("/questions");
    }

    function logOut() {
        const dispatchCaller = logoutAction();
        dispatchCaller(dispatch);
        history.push("/");
    }

    return (
        <div className={styles.topmenu}>
            <img src={Logo} alt="logo" className={styles.logo} />
            <img src={Loupe} alt="loupe" className={styles.loupe} />
            <Input type="search" name="q" placeholder="Поиск по сайту"
                className={styles.searchbox} /> 
            <Button onClick={search} className={styles.search_submit}>Search</Button>
            <Button onClick={logIn}>log in</Button>
            <Button onClick={logOut}>log out</Button>
        </div>
    );
}

export default TopMenu;
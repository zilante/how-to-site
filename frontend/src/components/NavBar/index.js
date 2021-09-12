import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

class NavBar extends React.Component {
    render() {
        return (
            <div className={styles.navbar}>
                    <Link to="/">How to</Link>
                    <Link to="/">Home</Link>
                    <Link to="/questions">Questions</Link>
            </div>
        );
    }
}

export default NavBar;
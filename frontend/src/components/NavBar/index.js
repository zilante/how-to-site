import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

// import Button from '../Button'

class NavBar extends React.Component {
    render() {
        return (
                <div className={styles.navbar}>
                        <Link to="/">How to</Link>
                        <Link to="/">Home</Link>
                        <Link to="/questions">Questions</Link>
                        {/* <Link to="/">Log out</Link> */}
                        {/* <div>
                            <Button onClick={this.onToLogOut}>Log out</Button>
                        </div> */}
                </div>
        );
    }

    // onToLogOut = (event) => {
    //     event.preventDefault();
    //     userService.logout()
    // }
}

export default NavBar
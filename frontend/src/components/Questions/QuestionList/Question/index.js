import React, { Component } from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const { id, title, body } = this.props;

        return(
            <div className={styles.question}>
                <div className={styles.content}>
                    <Link to={`/question/${id}`}>
                            {title}
                    </Link>
                    <p>
                            {body}
                    </p>
                </div>
            </div>
        );
    }
}

export default Question;
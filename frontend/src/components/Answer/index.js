import React, { Component } from 'react';
import styles from './index.module.css';

class Answer extends Component {
    render() {
        const { body, created, author } = this.props;

        return(
                <div>

                    <div>
                        <p>
                            {body}
                        </p>

                        <p className={styles.author}>
                            {author}, {created}
                        </p>
                    </div>
                </div>
        );
    }
}

export default Answer;
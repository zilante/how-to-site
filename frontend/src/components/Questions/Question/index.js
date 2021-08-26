import React, { Component } from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        return(
                <div className={styles.question}>
                    {/* <p>
                        {this.props.question.answerCount} answers
                    </p> */}

                    <div className={styles.content}>
                        <Link to={`/question_review/${this.props.question.questionId}`}>
                              {this.props.question.title}
                        </Link>
                        <p>
                              {this.props.question.body}
                        </p>
                    </div>
                </div>
        );
    }
}

export default Question;
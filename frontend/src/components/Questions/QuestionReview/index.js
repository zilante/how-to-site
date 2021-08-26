import React, { Component } from 'react';
import QuestionService from '../../../questionService';
import styles from './index.module.css';
import Button from '../../Button/index';

class QuestionReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: null,
            isLoading: false
        };
    }

    loadQuestion() {
        this.setState({
            isLoading: true
        });

        let promise =
         QuestionService.loadQuestion(this.props.match.params.questionId);

        if(!promise) {
            return;
        }

        return promise.then(response => {
            this.setState({
                question: response
            });

            this.setState({
                isLoading: false
            });
        }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadQuestion();
    }

    render() {
        if(this.state.isLoading) {
            return <h1>Loading...</h1>
        }

        return(
            <div>
                <h1>
                    {this.state.question.questionTitle}
                </h1>

                <div className={styles.review}>
                    <p>
                        {this.state.question.questionBody}
                    </p>

                    <p className={styles.author}>
                        {this.state.question.createdBy.email}
                    </p>

                    <hr> </hr>
                    <h2>0 answers</h2>

                    <form className={styles.wrapper}>
                    <h2>Your answer</h2>
                    <textarea cols="70" rows="10" className={styles.answer}
                                name="answer">
                                    Your answer
                    </textarea>

                    <Button>Post your answer</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuestionReview;
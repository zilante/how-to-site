import React, { Component } from 'react';
import QuestionService from '../../../questionService';
import AnswerService from '../../../answerService';
import Answer from '../../Answer';
import styles from './index.module.css';
import Button from '../../Button/index';

function isCorrectAnswerBody(body) {
    if(body.length === 0) {
        return false;
    }

    return true;
}

class QuestionReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            body: '',
            created: null,
            author: '',
            answers: [],

            my_answer: '',
            error: '',

            isLoading: false,
        };
    }

    getQuestion() {
        this.setState({
            isLoading: true
        });

        let promise =
         QuestionService.getQuestion(this.props.match.params.id);

        if(!promise) {
            return;
        }

        return promise.then(response => {
            this.setState({
                id: response.question.id,
                title: response.question.title,
                body: response.question.body,
                created: response.question.created,
                author: response.question.username,
                answers: response.answers,

                isLoading: false,
            });
        }).catch(error => {
            this.setState({
                isLoading: false,
                error: error,
            });
        });
    }

    componentDidMount() {
        this.getQuestion();
    }

    onChangeMyAnswer = (event) => {
        const value = event.target.value;
        this.setState({
            my_answer: value,         
        });
    }

    onAnswer = (event) => {
        event.preventDefault();

        console.log('entering onAnswer')
        const { id, my_answer } = this.state;

        if (!isCorrectAnswerBody(my_answer)) {
            console.log('in onAnswer: not correct answer body detected');

            this.setState({
                error: 'Write the answer!',
            });
        
            return;
        }

        AnswerService.createAnswer(id, {body: my_answer})
        .then(() => {
            this.getQuestion();
            this.props.history.push(`/question/${id}`);
        }).catch(error => {
            this.setState({
                error: error.message,
            });
        });
    };

    render() {
        const {title, body, created, author, answers, isLoading, error} =
            this.state;

        if(isLoading) {
            return <h1>Loading...</h1>
        }

        const answerViews = [];
        answers.forEach((answer) => {
            answerViews.push(<Answer id={answer.id} body={answer.body} created={answer.created}
                                     author={answer.username}/>)           
        });

        return(
            <div>
                <h1>
                    {title}
                </h1>

                <div className={styles.review}>
                    <p>
                        {body}
                    </p>

                    <p className={styles.author}>
                        {author}, {created}
                    </p>

                    {/* <hr> </hr> */}
                    {/* <h2>0 answers</h2> */}

                    <div className={styles.answers}>
                         {answerViews}        
                    </div>

                    <form className={styles.wrapper}>
                    <h2>Your answer</h2>
                    <p>{error}</p>
                    <textarea cols="70" rows="10" className={styles.answer}
                              onChange={this.onChangeMyAnswer} name="answer">
                                    Your answer
                    </textarea>

                    <Button onClick={this.onAnswer}>Post your answer</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuestionReview;
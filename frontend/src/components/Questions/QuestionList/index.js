import React, { Component } from 'react';
import QuestionService from '../../../questionService';
import Question from '../Question';
import {Link} from 'react-router-dom';
import styles from './index.module.css';
import Button from '../../Button';

class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoading: false
        };
    }

    loadQuestionList() {
        this.setState({
            isLoading: true
        });

        let promise = QuestionService.getAllQuestions();

        if(!promise) {
            return;
        }

        return promise.then(response => {
            const questions = this.state.questions.slice();

            this.setState({
                // questions: questions.concat(response.content),
                questions: questions.concat(response.questions),
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
        this.loadQuestionList();
    }

    onAskQuestion = () => {
        this.props.history.push("/question/new");
    }

    render() {
        if(this.state.isLoading) {
            return <h1>Questions</h1>
        }

        const questionViews = [];
        this.state.questions.forEach((question, questionIndex) => {
            questionViews.push(<Question question={question}/>)           
        });

        return (
            <div>
                <h1>Questions</h1>

                <Button className={styles.ask_question}
                        onClick={this.onAskQuestion}>Ask question</Button>

                <div className={styles.questions}>
                    {questionViews}        
                </div>

            </div>
        );
    }
}

export default QuestionList;
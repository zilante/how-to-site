import React, { Component } from 'react';
import QuestionService from '../../../questionService';
import Question from './Question';
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
        this.props.history.push("/create_question");
    };

    render() {
        const {isLoading, questions,} = this.state;

        if(isLoading) {
            return <h1>Loading...</h1>
        }

        const questionViews = [];
        questions.forEach((question, questionIndex) => {
            questionViews.push(<Question id={question.id} title={question.title}
                                         body={question.body}/>)           
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
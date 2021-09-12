import React, { Component } from 'react';
import { getQuestionAction, editQuestionAction, deleteQuestionAction,
         createAnswerAction, deleteAnswerAction, editAnswerAction }
    from "../../../actions/question_actions";
import Answer from '../../Answer';
import Question from './Question';
import NewAnswer from '../../Answer/NewAnswer';
import styles from './index.module.css';

import {connect} from "react-redux";

function QuestionReviewContent(props) {
    const { user, question, answers, editQuestion, deleteQuestion,
            createAnswer, actionError } = props;
    const username = user ? user.username : '';

    return (
        <div className={styles.content}>
            <Question
                username={username}

                id={question.id}
                title={question.title}
                body={question.body}
                created={question.created}
                author={question.username}

                editQuestion={editQuestion}
                deleteQuestion={deleteQuestion}
                actionError={actionError}
            />

            <hr />

            <div>
                {answers}        
            </div>

            <NewAnswer
                question_id={question.id}
                createAnswer={createAnswer}
                actionError={actionError}
                username={username}
            />  
        </div>
    );
}

class QuestionReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
        const { match, getQuestion } = this.props;
        console.log('calling getQuestion in componentDidMount');

        this.setState({
            isLoading: true,
        });

        let promise =  getQuestion(match.params.id);

        if(!promise) {
            return;
        }

        return promise.then(() => {
            this.setState({
                isLoading: false,
            });
        }).catch(error => {
            this.setState({
                isLoading: false,
                error: error,
            });
        });
    }

    render() {
        const { isLoading } = this.state;
        const { user, question, answers, actionError, editQuestion, deleteQuestion,
                createAnswer, deleteAnswer, editAnswer } = this.props;

        if (isLoading) {
            return (<h1>Loading...</h1>);
        }

        const answerViews = [];
        answers.forEach((answer) => {
            answerViews.push(<Answer id={answer.id} question_id={question.id} actionError={actionError}
                                     body={answer.body} created={answer.created}
                                     author={answer.username} user={user}
                                     deleteAnswer={deleteAnswer}
                                     editAnswer={editAnswer}/>);        
        });

        return(
            <div>
                {question && (
                    <QuestionReviewContent
                        user={user}
                        question={question}
                        answers={answerViews}
                        editQuestion={editQuestion}
                        deleteQuestion={deleteQuestion}
                        createAnswer={createAnswer}
                        actionError={actionError}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user,
      question: state.questionReducer.question,
      answers: state.questionReducer.answers,
      actionError: state.questionReducer.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getQuestion: actionDispatch(dispatch, getQuestionAction),
      editQuestion: actionDispatch(dispatch, editQuestionAction),
      deleteQuestion: actionDispatch(dispatch, deleteQuestionAction),
      createAnswer: actionDispatch(dispatch, createAnswerAction),
      deleteAnswer: actionDispatch(dispatch, deleteAnswerAction),
      editAnswer: actionDispatch(dispatch, editAnswerAction),
    };
};

function actionDispatch(dispatch, action) {
    return (...args) => {
        return new Promise((resolve) => {
            const dispatchCaller = action(...args);
            dispatchCaller(dispatch).then(() => {resolve();});
        });
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionReview);
import React, { Component } from 'react';
import { createQuestionAction } from '../../../actions/question_actions';
import styles from './index.module.css';  
import Button from '../../Button';
import Input from '../../Input';

import {connect} from "react-redux";

function isCorrectQuestionTitle(title) {
    return title.length > 0;
}

class NewQuestion extends Component {
    state = {
        title: '',
        body: '',
        errorText: '',
    };

    handleSubmit = (event) => {
        const { title, body } = this.state;
        const { history, createQuestion, user, actionError } = this.props;

        event.preventDefault();
        console.log('in handleSubmit');

        if (!isCorrectQuestionTitle(title)) {
            console.log('in handleSubmit: not correct quesion title detected');

            this.setState({
                errorText: 'Give the title to your question!',
            });
            return;
        }

        if (!user) {
            this.setState({
                errorText: 'Log in firstly!',
            });
            return;
        }


        const questionData = {
            title: title,
            body: body,
        };

        createQuestion(questionData).then(() => {
            if (actionError) {
                this.setState({
                    errorText: actionError,
                });
                return;
            }

            this.setState({
                errorText: '',
                title: '',
                body: '',
            });
            history.push('/questions');
        });
    };

    onChangeTitle = (event) => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };

    onChangeBody = (event) => {
        const value = event.target.value;
        this.setState({
            body: value,       
        });
    };

    render() {
        return(
            <div>
                <h1>Ask a question</h1>
                <p>{this.state.errorText}</p>

                <form className={styles.form}>
                    <h2>Title</h2>
                    <Input className={styles.title} name="title" type="text"
                           onChange={this.onChangeTitle}
                           placeholder="Question title"/>
                    <h2>Body</h2>
                    <textarea cols="100" rows="20" className={styles.body}
                              onChange={this.onChangeBody}>
                        Your question
                    </textarea>
                    <div>
                    <Button onClick={this.handleSubmit}>Submit a question</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user,
      actionError: state.questionReducer.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      createQuestion: createQuestionDispatch(dispatch),
    };
};

function createQuestionDispatch(dispatch) {
    return (...args) => {
        return new Promise((resolve) => { 
            const dispatchCaller = createQuestionAction(...args);
            dispatchCaller(dispatch).then(() => {resolve();});
        });
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
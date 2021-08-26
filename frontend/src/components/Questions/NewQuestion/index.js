import React, { Component } from 'react';
import QuestionService from '../../../questionService';
import styles from './index.module.css';  
import Button from '../../Button'
import Input from '../../Input'

import {connect} from "react-redux";

function isCorrectQuestionTitle(title) {
    if(title.length === 0) {
        return false;
    }

    return true;
}

function isCorrectQuestionBody(body) {
    if(body.length === 0) {
        return false;
    }

    return true;
}

class NewQuestion extends Component {
    state = {
        questionTitle: '',
        questionBody: '',
        errorText: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit');

        if (!isCorrectQuestionTitle(this.state.questionTitle)) {
            console.log('in handleSubmit: not correct quesion title detected');

            this.setState({
                errorText: 'Введите заголовок вопроса!'
              });
        
              return
        }

        if (!isCorrectQuestionBody(this.state.questionBody)) {
            this.setState({
                errorText: 'Введите вопрос!'
              });
        
              return
        }

        const token = this.props.user;
        if (!token) {
            console.log('in handleSubmit: not authorized');

            this.setState({
                errorText: 'Залогиньтесь!'
              });
        
            return
        }

        const questionData = {
            questionTitle: this.state.questionTitle,
            questionBody: this.state.questionBody
        };

        QuestionService.createQuestion(questionData, token)
        .then(response => {
            this.props.history.push("/questions");
        }).catch(error => {
            if(error.status === 401) {
                this.setState({
                    errorText: 'Сперва залогиньтесь!'
                  });
            } else {
                this.setState({
                    errorText: 'Произошла неизвестная ошибка...'
                  });   
            }
        });
    }

    onChangeTitle = (event) => {
        const value = event.target.value;
        this.setState({
            questionTitle: value   
        });
    }

    onChangeBody = (event) => {
        const value = event.target.value;
        this.setState({
            questionBody: value            
        });
    }

    render() {
        return(
            <div>
                <h1>Ask a question</h1>
                <p>{this.state.errorText}</p>

                <form className={styles.wrapper}>
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
      user: state.userReducer.user
    }
};

export default connect(mapStateToProps, null)(NewQuestion);
// export default NewQuestion;
import React, { Component } from 'react';
import QuestionService from '../../../questionService';
import styles from './index.module.css';  
import Button from '../../Button'
import Input from '../../Input'

// import {connect} from "react-redux";

function isCorrectQuestionTitle(title) {
    if(title.length === 0) {
        return false;
    }

    return true;
}

// function isCorrectQuestionBody(body) {
//     if(body.length === 0) {
//         return false;
//     }

//     return true;
// }

class NewQuestion extends Component {
    state = {
        title: '',
        body: '',
        errorText: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit');

        if (!isCorrectQuestionTitle(this.state.title)) {
            console.log('in handleSubmit: not correct quesion title detected');

            this.setState({
                errorText: 'Give the title to your question!'
              });
        
              return
        }


        const questionData = {
            title: this.state.title,
            body: this.state.body
        };

        QuestionService.createQuestion(questionData) //, token)
        // .then(response => {
        .then(() => {
            this.props.history.push("/questions");
        }).catch(error => {
            this.setState({
                errorText: error.message
                });
        });
    }

    onChangeTitle = (event) => {
        const value = event.target.value;
        this.setState({
            title: value   
        });
    }

    onChangeBody = (event) => {
        const value = event.target.value;
        this.setState({
            body: value            
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

// const mapStateToProps = (state) => {
//     return {
//       user: state.userReducer.user
//     }
// };

// export default connect(mapStateToProps, null)(NewQuestion);
export default NewQuestion;
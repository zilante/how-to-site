import React from 'react';
import Button from '../../Button';
import styles from './index.module.css';

function isCorrectAnswer(body) {
    return body.length > 0;
}

class NewAnswer extends React.Component {
    state = {
      error: '',
      answer: '',
    };

    onChange = (event) => {
        const value = event.target.value;
        this.setState({
            answer: value,         
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log('entering onSubmit');
        const { question_id, createAnswer, actionError, username } = this.props;
        const { answer } = this.state;

        if (!isCorrectAnswer(answer)) {
            console.log('in onSubmit: not correct answer body detected');

            this.setState({
                error: 'Write the answer!',
            });
        
            return;
        }

        if (!username) {
            console.log('in onSubmit: not logged in');

            this.setState({
                error: 'Log in firstly!',
            });
        
            return;
        }

        createAnswer(question_id, {body: answer}).then(() => {
            if (actionError) {
                this.setState({
                    error: actionError,
                });
    
                return;
            }

            this.setState({
                error: '',
                answer: '',
            });
        });
    };

    render() {
        const { error } = this.state;

        return (
            <form className={styles.wrapper}>
                <h2>Your answer</h2>
                <p> {error} </p>
                <textarea cols="70" rows="10" className={styles.answer}
                          onChange={this.onChange} name="answer">
                    Your answer
                </textarea>

                <Button onClick={this.onSubmit}>
                    Post your answer
                </Button>
            </form>
        );
    }
}

export default NewAnswer;
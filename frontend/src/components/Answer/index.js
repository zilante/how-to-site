import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../Button/index';
import AnswerEditor from './AnswerEditor';

class Answer extends Component {
    state = {
      is_editing: false,
      edited_body: '',
      error: '',
    };

    onEdit = (event) => {
        event.preventDefault();
        console.log('entering onEdit');

        const { body } = this.props;

        this.setState({
            is_editing: true,
            edited_body: body,
        });
    };

    onChangeEdited = (event) => {
        event.preventDefault();

        this.setState({
            edited_body: event.target.value,
        });
    };

    onSubmitEdited = (event) => {
        event.preventDefault();

        const { id, question_id, editAnswer, actionError } = this.props;
        const { edited_body } = this.state;

        if (!edited_body) {
            this.setState({
                error: 'Write the answer!',
            });

            return;
        }

        editAnswer(id, question_id, { body: edited_body, }).then(() => {
            if (actionError) {
                this.setState({
                    error: actionError,
                });
    
                return;
            }
    
            this.setState({
                error: '',
                is_editing: false,
                edited_body: '',
            });
        });
    };

    onDelete = (event) => {
        const { id, question_id, deleteAnswer, actionError } = this.props;

        event.preventDefault();
        console.log('entering onDelete');

        deleteAnswer(id, question_id).then(() => {
            if (actionError) {
                this.setState({
                    error: actionError,
                });
            }
        });
    };

    render() {
        const { is_editing, error } = this.state;
        const { body, created, author, user } = this.props;
        const username = user ? user.username : '';

        return(
            <div>
                <p>
                    {body}
                </p>

                <p className={styles.author}>
                    {author}, {created}
                </p>

                <p>{error}</p>

                {username === author && (
                    <div className={styles.buttons}>
                        <Button onClick={this.onDelete} className={styles.delete_button}>
                            Delete
                        </Button>
                        <Button onClick={this.onEdit} className={styles.edit_button}>
                            Edit
                        </Button>
                    </div>
                )}

                {username === author && is_editing && (
                    <AnswerEditor
                        onChange={this.onChangeEdited}
                        onSubmit={this.onSubmitEdited}
                        body={body}
                        submit_button_text="Change answer"
                        cols="100"
                    />
                )}
            </div>
        );
    }
}

export default Answer;
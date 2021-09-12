import React from 'react';
import { withRouter } from "react-router";
import Button from '../../../Button';
import QuestionEditor from '../QuestionEditor';
import styles from './index.module.css';

class Question extends React.Component {
    state = {
      error: '',
      is_editing: false,
      edited_title: '',
      edited_body: '',
    };

    onEdit = (event) => {
        event.preventDefault();
        console.log('entering onEdit');

        const { title, body } = this.props;

        this.setState({
            is_editing: true,
            edited_title: title,
            edited_body: body,
        });
    };

    onChangeEditedTitle = (event) => {
        event.preventDefault();

        this.setState({
            edited_title: event.target.value,
        });
    };

    onChangeEditedBody = (event) => {
        event.preventDefault();

        this.setState({
            edited_body: event.target.value,
        });
    };

    onSubmitEdited = (event) => {
        event.preventDefault();

        const { id, editQuestion, actionError } = this.props;
        const { edited_title, edited_body } = this.state;

        if (!edited_title) {
            this.setState({
                error: 'Give the title to your question!',
            });

            return;
        }

        editQuestion(id, { title: edited_title, body: edited_body }).then(() => {
            if (actionError) {
                this.setState({
                    error: actionError,
                });
    
                return;
            }
    
            this.setState({
                error: '',
                is_editing: false,
                edited_title: '',
                edited_body: '',
            });
        });
    };


    onDelete = (event) => {
        event.preventDefault();
        console.log('entering onDelete');

        const { id, deleteQuestion, actionError, history } = this.props;

        deleteQuestion(id).then(() => {
            if (actionError) {
                this.setState({
                    error: actionError,
                });
    
                return;
            }

            history.push('/questions');
        });
    };

    render() {
        const { is_editing, error, edited_title, edited_body } = this.state;
        const { username, title, body, created, author } = this.props;

        return(
            <div>
                <h1> {title} </h1>
                <p> {body} </p>

                <p className={styles.author}>
                    {author}, {created}
                </p>

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

                <p> {error} </p>

                {username === author && is_editing && (
                    <QuestionEditor
                        onChangeTitle={this.onChangeEditedTitle}
                        onChangeBody={this.onChangeEditedBody}
                        onSubmit={this.onSubmitEdited}
                        title={edited_title}
                        body={edited_body}
                        submit_button_text="Change question"
                        cols="100"
                    />
                )}
            </div>
        );
    }
}

export default withRouter(Question);
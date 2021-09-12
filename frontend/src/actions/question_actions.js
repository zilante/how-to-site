import questionService from '../questionService';
import answerService from '../answerService';

export function getQuestionAction(id) {
  return (dispatch) => {
    return questionService.getQuestion(id)
      .then((response) => {
        dispatch({ type: 'GET_QUESTION_SUCCESS', payload: response });
      })
      .catch((error) => {
        dispatch({ type: 'GET_QUESTION_FAILURE', payload: error.message });
      });
  };
}

export function createQuestionAction(questionData) {
  return (dispatch) => {
    return questionService.createQuestion(questionData)
      .then(() => {
        dispatch({ type: 'CREATE_QUESTION_SUCCESS' });
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_QUESTION_FAILURE', payload: error.message });
      });
  };
}

export function editQuestionAction(id, questionData) {
  return (dispatch) => {
    return questionService.updateQuestion(id, questionData)
      .then(() => {
        const dispatchCaller = getQuestionAction(id);
        dispatchCaller(dispatch);
      })
      .catch((error) => {
        dispatch({ type: 'EDIT_QUESTION_FAILURE', payload: error.message });
      });
  };
}

export function deleteQuestionAction(id) {
  return (dispatch) => {
    return questionService.deleteQuestion(id)
      .then(() => {
        dispatch({ type: 'DELETE_QUESTION_SUCCESS', payload: ''});
      })
      .catch((error) => {
        dispatch({ type: 'DELETE_QUESTION_FAILURE', payload: error.message });
      });
  };
}

export function createAnswerAction(id, answerData) {
  return (dispatch) => {
    return answerService.createAnswer(id, answerData)
      .then(() => {
        const dispatchCaller = getQuestionAction(id);
        dispatchCaller(dispatch);
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_ANSWER_FAILURE', payload: error.message });
      });
  };
}

export function deleteAnswerAction(answer_id, question_id) {
  return (dispatch) => {
    return answerService.deleteAnswer(answer_id)
      .then(() => {
        const dispatchCaller = getQuestionAction(question_id);
        dispatchCaller(dispatch);
      })
      .catch((error) => {
        dispatch({ type: 'DELETE_ANSWER_FAILURE', payload: error.message });
      });
  };
}

export function editAnswerAction(answer_id, question_id, answerData) {
  return (dispatch) => {
    return answerService.editAnswer(answer_id, answerData)
      .then(() => {
        const dispatchCaller = getQuestionAction(question_id);
        dispatchCaller(dispatch);
      })
      .catch((error) => {
        dispatch({ type: 'EDIT_ANSWER_FAILURE', payload: error.message });
      });
  };
}
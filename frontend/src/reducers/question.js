const initialState = {
    error: '',
    question: null,
    answers: [],
  };
  
  const questionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_QUESTION_SUCCESS':
        return {
          ...state,
          error: null,
          question: action.payload.question,
          answers: action.payload.answers,
        };
      case 'GET_QUESTION_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'CREATE_QUESTION_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE_QUESTION_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'EDIT_QUESTION_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'CREATE_ANSWER_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE_ANSWER_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'EDIT_ANSWER_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export default questionReducer;
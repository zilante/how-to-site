import http from '../utils/http';

const QuestionService = {
  getAllQuestions() {
    return http('/questions', 'GET');
  },
  createQuestion(questionData) {
    return http('/create_question', 'POST', questionData);
  },
  getQuestion(id) {
    return http('/question/' + id, 'GET');
  },
  deleteQuestion(id) {
    return http('/' + id + '/delete_question', 'POST');
  },
  updateQuestion(id, questionData) {
    return http('/' + id + '/update_question', 'POST', questionData);
  },
};

export default QuestionService;
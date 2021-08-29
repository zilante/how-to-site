import http from '../utils/http'

const QuestionService = {
  getAllQuestions() {
    return http('/questions', 'GET')
  },
  createQuestion(questionData) { // , token) {
    return http('/create_question', 'POST', questionData) // , token) 
  },
  getQuestion(id) {
    return http('/question/' + id, 'GET');
  },
};

export default QuestionService;
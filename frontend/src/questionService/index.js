import http from '../utils/http'

const QuestionService = {
  getAllQuestions() {
    return http('/questions', 'GET')
  },
  createQuestion(questionData, token) {
    return http('api/questions', 'POST', questionData, token) 
  },
  loadQuestion(questionId) {
    return http('api/questions/' + questionId, 'GET');
  }
};

export default QuestionService;
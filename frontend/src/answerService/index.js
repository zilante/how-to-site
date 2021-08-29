import http from '../utils/http';

const AnswerService = {
  createAnswer(id, answerData) {
    return http('/' + id + '/create_answer', 'POST', answerData);
  },
};

export default AnswerService;
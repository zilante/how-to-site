import http from '../utils/http';

const AnswerService = {
  createAnswer(id, answerData) {
    return http('/' + id + '/create_answer', 'POST', answerData);
  },
  deleteAnswer(id) {
    return http('/' + id + '/delete_answer', 'POST');
  },
  editAnswer(id, answerData) {
    return http('/' + id + '/update_answer', 'POST', answerData);
  },
};

export default AnswerService;
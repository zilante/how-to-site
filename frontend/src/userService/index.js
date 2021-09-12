import http from '../utils/http';

const UserService = {
  signup(name, surname, username, password) {
    return http('/auth/register', 'POST', {name, surname, username, password});
  },
  login(username, password) {
    return http('/auth/login', 'POST', {username, password});
  },
  logout() {
    return http('/auth/logout', 'GET');
  },
  currentUser() {
    return http('/auth/current_user', 'GET');
  },
};

export default UserService;
import http from '../utils/http'

const UserService = {
  signup(name, surname, username, password) {
    return http('/auth/register', 'POST', {name, surname, username, password})
  },
  login(username, password) {
    return http('/auth/login', 'POST', {username, password})
  },
  logout() {
    return http('/auth/logout', 'GET')
  },
  currentUser(token) {
    return http('/api/auth/currentUser', 'GET', {}, token)
  }
};

export default UserService;
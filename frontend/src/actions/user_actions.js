import userService from '../userService';

function fetchStart() {
  return {
    type: 'USER_FETCHING',
  };
}

function fetchFail(payload) {
  return {
    type: 'USER_FAIL',
    payload: payload,
  };
}

function fetchAuthSuccess(payload) {
  return {
    type: 'AUTH_SUCCESS',
    payload: payload,
  };
}

function fetchLogoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS',
  };
}

export function currentUserAction() {
  return dispatch => {
    dispatch(fetchStart());

    return userService.currentUser()
      .then((data) => {
        dispatch(fetchAuthSuccess(data.user));
      })
      .catch((error) => {
        dispatch(fetchFail(error.message));
      });
  };
}

export function loginAction(username, password) {
  console.log('in loginAction');

  return dispatch => {
    dispatch(fetchStart());

    return userService.login(username, password)
      .then((data) => {
        dispatch(fetchAuthSuccess(data.user));
      })
      .catch((error) => {
        console.log('catching error in login action');
        dispatch(fetchFail(error.message));
      });
  };
}

export const signupAction = (name, surname, username, password) => {
  console.log('in signupAction');

  return dispatch => {
    dispatch(fetchStart());

    return userService.signup(name, surname, username, password).then((data) => {
      dispatch(fetchAuthSuccess(data));
    })
      .catch((error) => {
        console.log('catching error in signUp action');
        dispatch(fetchFail(error.message));
      });
  };
}

export function logoutAction() {
  console.log('in logoutAction');

  return dispatch => {
    dispatch(fetchStart());

    return userService.logout().then(() => {
      dispatch(fetchLogoutSuccess());
    })
      .catch((error) => {
        dispatch(fetchFail(error));
      });
  };
}

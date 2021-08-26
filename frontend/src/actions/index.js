import userService from '../userService'

function fetchStart() {
  return {
    type: 'USER_FETCHING'
  }
}

function fetchFail(payload) {
  return {
    type: 'USER_FAIL',
    payload
  }
}

function fetchSuccess(payload) {
  return {
    type: 'USER_SUCCESS',
    payload
  }
}

export function currentUserAction() {
  return dispatch => {
    dispatch(fetchStart());

    return userService.currentUser().then((data) => {
      dispatch(fetchSuccess(data.accessToken))
    })
      .catch((error) => {
        dispatch(fetchFail(error))
      })
  }
}

export function loginAction(username, password) {
  console.log('in loginAction');

  return dispatch => {
    dispatch(fetchStart());

    return userService.login(username, password).then((data) => {
      dispatch(fetchSuccess(data.accessToken))

      console.log('0')
    })
      .catch((error) => {
        console.log('catching error in login action');

        dispatch(fetchFail(error.message));
      })
  }
}

export const signupAction = (name, surname, username, password) => {
  console.log('in signupAction');

  return dispatch => {
    dispatch(fetchStart());

    return userService.signup(name, surname, username, password).then((data) => {
      dispatch(fetchSuccess(data));
    })
      .catch((error) => {
        console.log('catching error in signUp action');

        dispatch(fetchFail(error.message));
      })
  }
}

export function logoutAction() {
  return dispatch => {
    dispatch(fetchStart());

    return userService.logout().then((data) => {
      dispatch(fetchSuccess(null))
    })
      .catch((error) => {
        dispatch(fetchFail(error))
      })
  }
}

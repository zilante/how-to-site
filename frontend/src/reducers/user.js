const initialState = {
    isLoading: false,
    error: null,
    user: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_FETCHING':
        return {
          ...state,
          error: null,
          isFetching: true
        };
      case 'USER_FAIL':
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };
      case 'AUTH_SUCCESS':
        return {
          ...state,
          isFetching: false,
          error: null,
          user: action.payload,
        };
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          isFetching: false,
          error: null,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
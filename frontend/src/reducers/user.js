const initialState = {
    isLoading: false,
    error: false,
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
          error: action.payload
        };
      case 'USER_SUCCESS':
        return {
          ...state,
          isFetching: false,
          error: null,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer
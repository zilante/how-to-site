import { combineReducers } from 'redux';

import userReducer from './user';
import questionReducer from './question';

const rootReducer = combineReducers({
  userReducer,
  questionReducer,
});

export default rootReducer;
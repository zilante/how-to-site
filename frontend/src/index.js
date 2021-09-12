import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux';
import configureStore  from './store/createStore';
import { currentUserAction } from "./actions/user_actions";

const store = configureStore();
const dispatchCaller = currentUserAction();
dispatchCaller(store.dispatch);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

store.subscribe(() =>
   console.log(store.getState())
);
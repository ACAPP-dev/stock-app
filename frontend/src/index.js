import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import companyReducer from './reducers/companyReducer'
import dailyReducer from './reducers/dailyReducer'
import userReducer from './reducers/userReducer'
import watchlistReducer from './reducers/watchlistReducer'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const appReducer = combineReducers({
  companies: companyReducer,
  daily: dailyReducer,
  user: userReducer,
  watchlists: watchlistReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') { state = undefined}
  return appReducer(state, action)
}

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

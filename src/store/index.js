import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tasks from './tasks';

const store = createStore(
  combineReducers({
    tasks,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

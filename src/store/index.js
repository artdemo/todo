import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './tasks';

const store = createStore(
  combineReducers({
    taskReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

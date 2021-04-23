import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './tasks';
import categoryReducer from './categories';

const store = createStore(
  combineReducers({
    taskReducer,
    categoryReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

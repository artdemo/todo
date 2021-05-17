import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './tasks';
import categoryReducer from './categories';
import defaultCategoryIdReducer from './defaultCategoryId';

const store = createStore(
  combineReducers({
    taskReducer,
    categoryReducer,
    defaultCategoryIdReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

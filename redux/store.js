import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

const store = configureStore();

export default store;
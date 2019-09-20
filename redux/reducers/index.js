import { generalReducers, optionsReducers } from './general';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    generalReducers,
    optionsReducers
});

export default rootReducer;
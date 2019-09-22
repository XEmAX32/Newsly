import * as types from '../actions/types';
import categories from '../../constants/categories'

const { 
    GET_NEWS,
    SET_CATEGORY,
    SEARCH_NEWS,
    SET_NIGHTMODE
} = types;


//valori da visualizzare inizializzati altrimenti torna undefined
const initialState = {
    generalReducers: {
        news:{},
        category: categories[0].keyword
    },
    optionsReducers: {
        nightmode: false,
    }
}

const generalReducers = function (state = initialState.generalReducers, action) {
    switch(action.type) {
        case SEARCH_NEWS:
        case GET_NEWS:
            return Object.assign({}, state, {
                news: action.news
            });
        case SET_CATEGORY:
            return Object.assign({}, state, {
                category: action.category
            })
        default:
            return state;
    }
}

const optionsReducers = function (state = initialState.optionsReducers, action) {
    switch(action.type) {
        case SET_NIGHTMODE:
            return Object.assign({}, state, {
                nightmode: action.nightmode
            })
        default:
            return state;
    }
}

export { generalReducers, optionsReducers }
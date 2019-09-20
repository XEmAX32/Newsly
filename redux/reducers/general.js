import * as types from '../actions/types';

const { 
    GET_NEWS,
    SET_CATEGORY,
    SEARCH_NEWS,
    SET_COUNTRY,
    SET_NIGHTMODE
} = types;


//valori da visualizzare inizializzati altrimenti torna undefined
const initialState = {
    generalReducers: {
        news:{},
    },
    optionsReducers: {
        country: {
            name: 'Italy',
            flag: '🇮🇹'
        },
        nightmode: false
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
        case SET_COUNTRY:
                console.log('newstate', Object.assign({}, state, {
                    country: action.country
                }))
            return Object.assign({}, state, {
                country: action.country
            })
        case SET_NIGHTMODE:
            return Object.assign({}, state, {
                nightmode: action.nightmode
            })
        default:
            return state;
    }
}

export { generalReducers, optionsReducers }
import * as types from './types';
import axios from 'axios';

const key = '2e6b9900b30140e59173218adc843249';
var cancelSearch;

//sort: key:value (value asc/desc)
function getNews(category, country) {
    return function(dispatch) {
        return fetch('https://newsapi.org/v2/top-headlines?country='+country+'&category='+category+'&sortBy=publishedAt&apiKey='+key, {
            method: 'GET',
        }).then((response) => {
            response.json().then(res => {
                dispatch({
                    type: types.GET_NEWS,
                    news: res
                })
            });
        });
    }
}

function setCategory(category) {
    return {
        type: types.SET_CATEGORY,
        category
    }
}

function searchNews(query) {
    if(cancelSearch) {
        cancelSearch.cancel();
    }

    cancelSearch = axios.CancelToken.source()

    return function(dispatch) {
        return axios.get('https://newsapi.org/v2/everything?q='+query+'&sortBy=publishedAt&excludeDomains="Stackoverflow.com"&apiKey='+key, {cancelToken: cancelSearch.token})
        .then((response) => {
            dispatch({
                type: types.GET_NEWS,
                news: response.data
            })
        })
        .catch(err => console.log(err));
    }
}

function setNightmode(mode) {
    return {
        type: types.SET_NIGHTMODE,
        nightmode: mode
    }
}

export { 
    setNightmode,
    getNews, 
    setCategory, 
    searchNews, 
}
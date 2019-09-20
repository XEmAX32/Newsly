import { SQLite } from 'expo-sqlite';
import store from '../redux/store';
import ActionCreators from '../redux/actions';
import { name, version } from './config';

var db;
const debug = true;

/**
 * Prints error messages
 * @param {string} message 
 */
function errorCallback(message) {
    console.log('SQLite Error: ', message);
}

/**
 * Prints success messages if debug mode is on else fires callback
 * @param {string} callback 
 */
function successCallback(callback = null) {
    if(debug)
        console.log('SQLite success');
    if(callback instanceof Function)
        callback()
}

function openDB() {
    console.log('opening db')
    db = SQLite.openDatabase(name,version);
    const state = store.getState();
    //console.log('state',state)
    db.transaction(tx => {
//       tx.executeSql('DROP TABLE options')
        tx.executeSql('CREATE TABLE IF NOT EXISTS articles(id TEXT PRIMARY KEY NOT NULL, title TEXT, author TEXT, content TEXT, url TEXT, websiteName TEXT, urlToImage TEXT);', [], successCallback, errorCallback);
        tx.executeSql('CREATE TABLE IF NOT EXISTS options(country_name TEXT, country_flag TEXT, night_mode INTEGER);', [], successCallback, errorCallback);
        tx.executeSql('SELECT * FROM options;', [], (_, { rows: { _array } }) => {

            store.dispatch(ActionCreators.setCategory({ flag: _array.country_flag, country: _array.country_name }))
        }, errorCallback);
    }, errorCallback, successCallback);
}

function closeDB() {
    console.log('closing db')
    db.transaction(tx => {
        const options = store.getState().optionsReducers;
        //console.log('closedb',options.country.name, options.country.flag, Number(options.nightmode))
        tx.executeSql('DELETE FROM options;');
        tx.executeSql('INSERT INTO options (country_name, country_flag, night_mode) VALUES (?,?,?);', [options.country.name, options.country.flag, Number(options.nightmode)], successCallback, errorCallback);
       //tx.executeSql('INSERT INTO articles (id, title, author, content, url, websiteName, urlToImage) VALUES (?, ?, ?, ?, ?, ?, ?);', [id, title, author, content, url, websiteName, urlToImage], successCallback, errorCallback);

    }, errorCallback, successCallback)
    /*
    if(db) {
        db.close(successCallback, errorCallback);
    } else {
        errorCallback('Database not existing');
    }*/

}

/**
 * save an article in the db
 * @param {string} title
 * @param {string} author 
 * @param {string} content 
 * @param {string} link 
 * @param {string} websiteName 
 * @param {string} imageLink 
 */
function saveArticle(id, title, author, content, url, websiteName, urlToImage) {

    db.transaction(tx => {
//        tx.executeSql('INSERT INTO articles (title, author, content, url, websiteName, urlToImage) VALUES ("ciao", "ciao", "ciao", "ciao", "ciao", "ciao");', [], successCallback, (err) => console.log('exec',err));
        
        tx.executeSql('INSERT INTO articles (id, title, author, content, url, websiteName, urlToImage) VALUES (?, ?, ?, ?, ?, ?, ?);', [id, title, author, content, url, websiteName, urlToImage], successCallback, errorCallback);
    }, errorCallback, successCallback);
}

/**
 * remove an article from db
 * @param {number} id 
 */
function removeArticle(id) {
    db.transaction(tx => {
        tx.executeSql('DELETE FROM articles WHERE id=?;', [id], successCallback, errorCallback);
    }, errorCallback, successCallback);
}

/**
 * get saved articles from db
 * @param {function} callback 
 */
function getArticles(callback) {

    db.transaction(tx => {
        tx.executeSql('SELECT * FROM articles;', [], (_, { rows: { _array } }) => {

            if(callback instanceof Function)
                callback(_array);
        }, errorCallback);
    }, errorCallback, successCallback);
    
}

export { 
    openDB,
    closeDB,
    saveArticle,
    removeArticle,
    getArticles
}
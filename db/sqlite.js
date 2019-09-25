import { SQLite } from 'expo-sqlite';
import store from '../redux/store';
import ActionCreators from '../redux/actions';
import { name, version } from './config';
import * as Crypto from 'expo-crypto';

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
    db = SQLite.openDatabase(name,version);

    db.transaction(tx => {
//        tx.executeSql('DROP TABLE articles')
        tx.executeSql('CREATE TABLE IF NOT EXISTS articles(id TEXT PRIMARY KEY NOT NULL, title TEXT, author TEXT, content TEXT, url TEXT, websiteName TEXT, urlToImage TEXT, publishedAt TEXT, category TEXT);', [], successCallback, errorCallback);
        tx.executeSql('CREATE TABLE IF NOT EXISTS options(country_name TEXT, country_flag TEXT, night_mode INTEGER);', [], successCallback, errorCallback);
    }, errorCallback, successCallback);
}

function closeDB() {
    
    if(db) {
        db.close(successCallback, errorCallback);
    } else {
        errorCallback('Database not existing');
    }

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
async function saveArticle(description, title, author, content, url, websiteName, urlToImage, publishedAt, category) {
    const id = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        url
    );

    db.transaction(tx => {
//        tx.executeSql('INSERT INTO articles (title, author, content, url, websiteName, urlToImage) VALUES ("ciao", "ciao", "ciao", "ciao", "ciao", "ciao");', [], successCallback, (err) => console.log('exec',err));
        tx.executeSql('SELECT * FROM articles WHERE id=?;', [id], (_, { rows: { _array } }) => {
            if(_array.length > 0)
                tx.executeSql('DELETE FROM articles WHERE id=?', [id], successCallback, errorCallback);
            else
                tx.executeSql('INSERT INTO articles (id, title, author, content, url, websiteName, urlToImage, publishedAt, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [id, title, author, content, url, websiteName, urlToImage, publishedAt, category], successCallback, errorCallback);

        }, errorCallback);
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

async function isSaved(url) {
    const id = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        url
    );

    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql('SELECT * FROM articles WHERE id=?;', [id], (_, { rows: { _array } }) => {
            if(_array.length > 0)
                resolve(true)
            else 
                resolve(false)
        }, () => {
            errorCallback(); 
            reject()
        });
    }, errorCallback, successCallback));
}

export { 
    openDB,
    closeDB,
    saveArticle,
    removeArticle,
    isSaved,
    getArticles
}
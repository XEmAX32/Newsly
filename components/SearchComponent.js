import React, { useState } from 'react';
import { 
    TouchableOpacity,
    TextInput,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux';

function SearchComponent({searchNews, style, getNews}) {

    const search = (query) => {
        if(query.length > 0)
            searchNews(query)
        else 
            getNews('general')
    }

    return (
        <View style={[styles.container, style]}>
            <TextInput 
                style={styles.textInput} 
                onChange={(e) => search(e.nativeEvent.text)}
                placeholder="Search news..."
            />
            <Feather
                name={'search'}
                size={26}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 25,
        margin: 10,
        padding: 5,
        shadowOffset:{  width: 0,  height: 10,  },
		shadowRadius: 10,
		shadowColor: '#000',
        shadowOpacity: .3,
        elevation: 4,
    },
    textInput: {
        flex:1,
        backgroundColor: '#fff',
        paddingLeft: 20,
        width: '100%'
    },
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}  

export default connect(null, mapDispatchToProps)(SearchComponent)
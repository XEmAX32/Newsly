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
import { Colors, Fonts } from '../constants/Theme';

function SearchComponent({category, searchNews, style, getNews, refreshWorker}) {

    const search = (query) => {
        if(query.length > 0)
            searchNews(query, refreshWorker)
        else 
            getNews(category, 'IT', refreshWorker)
    }

    return (
        <View style={[styles.container, style]}>
            <Feather
                name={'search'}
                size={26}
                color={Colors.grey}
            />
            <TextInput 
                style={styles.textInput} 
                onChange={(e) => search(e.nativeEvent.text)}
                placeholder="Search news..."
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 15,
        margin: 10,
        padding: 5,
        shadowOffset:{  width: 0,  height: 5,  },
		shadowColor: '#000',
        shadowOpacity: .2,
        elevation: 4,
    },
    textInput: {
        flex:1,
        color: Colors.grey,
        backgroundColor: '#fff',
        fontFamily: Fonts.regular
    },
})

const mapStateToProps = (state) => {
    return {
      category: state.generalReducers.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}  

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
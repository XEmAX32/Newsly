import React, { useState, useEffect } from 'react';

import {  
    View,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { saveArticle, isSaved } from '../db/sqlite';
import { onScroll } from 'react-native-redash';
import { Colors, Fonts } from '../constants/Theme';
import timeSince from '../utils/timeSince';

const { Value, interpolate, Extrapolate } = Animated;

const y = new Value(0);

const HEADER_MIN_HEIGHT = 200;
const HEADER_MAX_HEIGHT = 400;

const headerHeight = interpolate(y,
{
    inputRange: [ 0, ( HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT ) ],
    outputRange: [ HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT ],
    extrapolateRight: Extrapolate.CLAMP,
});

export default function ArticleScreen({navigation, }) {
    const { description, publishedAt, category, urlToImage, title, author, content, url, source } = navigation.state.params.item;
    const [saved, setSaved] = useState(true);

    useEffect(() => {
        isSaved(url).then(res => {
            setSaved(res)
        })
    }, [])

    const save = () => {
        saveArticle(description, title, author, content, url, source.name, urlToImage, publishedAt, category);
        setSaved(!saved)
    }

    return (
        <View style={ styles.container }>
            <Animated.ScrollView
                contentContainerStyle = {styles.scrollView}
                scrollEventThrottle = {16}
                onScroll={onScroll({y})}
            >
                <View style={styles.content}>
                {category && <Text style={styles.category}>{category.toUpperCase()}</Text>}
                <Text style={styles.title}>{title}</Text>
                <View style={styles.timeSinceContainer}>
                    <MaterialCommunityIcons 
                        name={'clock-outline'}
                        size={20}
                        color={Colors.grey}
                    />
                    <Text style={styles.timeSince}>{timeSince(new Date(publishedAt))+' ago'}</Text>
                </View>
                <Text style={styles.author}>{author}</Text>
                <Text>{content ? content.substring(0,content.indexOf("[+")) : description}</Text>
                <Text style={styles.readMore} onPress={() => WebBrowser.openBrowserAsync(url)}>Read more</Text>
                </View>
            </Animated.ScrollView>
            <Animated.View style={[styles.animatedHeader, {height: headerHeight}]}>
                <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: urlToImage}}>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={styles.headerBtn}>
                                <Ionicons   
                                    name={'ios-arrow-back'}
                                    size={30}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={save} style={styles.headerBtn}>
                            <MaterialCommunityIcons   
                                name={saved ? 'bookmark' : 'bookmark-outline'}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Animated.View>
        </View>
    )
}

ArticleScreen.navigationOptions = {
    header: null,
    tabBarVisible: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingTop: HEADER_MAX_HEIGHT, 
        paddingBottom: 20
    },
    animatedHeader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBtn: {
        backgroundColor: '#FFF',
        height: 40,
        width: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    content: {
        padding: 20,
        fontFamily: Fonts.regular
    },
    headerButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    category: {
        color: Colors.yellow,
        fontSize: 15,
        fontFamily: Fonts.medium
    },
    readMore: {
        color: Colors.yellow,
        fontFamily: Fonts.medium
    },
    title: {
        fontFamily: Fonts.medium,
        fontSize:15
    },
    author: {
        fontFamily: Fonts.medium
    },
    timeSince: {
        marginLeft: 10, 
        color: Colors.grey
    },
    timeSinceContainer: {
        marginVertical: 10, 
        flexDirection: 'row', 
        alignItems: 'center'
    }
})
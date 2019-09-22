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
import Colors from '../constants/Colors';
/*
const {width, height} = Dimensions.get('window');

const MAX_HEADER_HEIGHT = 300;
const MIN_HEADER_HEIGHT = 100;

const { Value, interpolate, Extrapolate } = Animated;

const y = new Value(0);

export default function ArticleScreen({navigation}) {
    const { urlToImage, title, author, content, url, source } = navigation.state.params.item;
    const [saved, setSaved] = useState(navigation.state.params.item.saved);



<TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                    <View style={styles.backBtn}>
                        <Ionicons   
                            name={'ios-arrow-back'}
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
<View style={styles.imageInnerContainer}>
                    <Text numberOfLines={3} style={[styles.imageText, {marginBottom: 10}]}>{title}</Text>
                    <Text style={styles.imageText}>{author}</Text>
                </View>


    const headerHeight = interpolate(y, {
        inputRange: [-MAX_HEADER_HEIGHT, 0],
        outputRange: [4, 1],
        extrapolateRight: Extrapolate.CLAMP,
    })

    return (
        <View style={styles.container}>
            <Animated.ScrollView 
                onScroll={onScroll({y})}
                style={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                stickyHeaderIndices={[1]}
            >
                <Text>{content}</Text>
                <Button onPress={() => WebBrowser.openBrowserAsync(url)} title={source.name} />
            </Animated.ScrollView>
            <Animated.View 
                style={[styles.header, {height: headerHeight}]}
            >
                <ImageBackground style={[styles.image]} source={{uri: urlToImage}}>
                
                    
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
    header: {
        ...StyleSheet.absoluteFillObject,
        height: MAX_HEADER_HEIGHT
    },
    contentContainer: {  
        flex:1,
        marginTop: MIN_HEADER_HEIGHT
    },
    image: {
        height: MAX_HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    }
})*/
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
        saveArticle(title, author, content, url, source.name, urlToImage, publishedAt);
        setSaved(!saved)
    }

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = Math.floor(seconds / 31536000);
      
        if (interval > 1) {
          return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
        <View style={ styles.container }>
            <Animated.ScrollView
                contentContainerStyle = {{ paddingTop: HEADER_MAX_HEIGHT }}
                scrollEventThrottle = {16}
                onScroll={onScroll({y})}
                style={styles.content}
            >
                {category && <Text style={styles.category}>{category.toUpperCase()}</Text>}
                <Text style={styles.title}>{title}</Text>
                <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons 
                        name={'clock-outline'}
                        size={20}
                        color={Colors.grey}
                    />
                    <Text style={{marginLeft: 10, color: Colors.grey}}>{timeSince(new Date(publishedAt))+' ago'}</Text>
                </View>
                <Text style={styles.author}>{author}</Text>
                <Text>{content.substring(0,content.indexOf("[+"))}</Text>
                <Text style={styles.readMore} onPress={() => WebBrowser.openBrowserAsync(url)}>Read more</Text>
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
                        <TouchableOpacity onPress={save}>
                            <View style={styles.headerBtn}>
                                <MaterialCommunityIcons   
                                    name={saved ? 'bookmark' : 'bookmark-outline'}
                                    size={30}
                                />
                            </View>
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
    animatedHeader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
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
        borderRadius: 10
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
        fontWeight: "600"
    },
    readMore: {
        color: Colors.yellow,
        fontWeight: '500'
    },
    title: {
        fontWeight: 'bold',
        fontSize:15
    },
    author: {
        fontWeight: 'bold'
    }
})
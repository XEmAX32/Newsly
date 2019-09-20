import React, { useState } from 'react';

import {  
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { saveArticle } from '../db/sqlite';

const {width, height} = Dimensions.get('window');

export default function ArticleScreen({navigation}) {
    const { urlToImage, title, author, content, url, source } = navigation.state.params.item;
    const [saved, setSaved] = useState(navigation.state.params.item.saved);


/*
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
*/

    return (
        <View>
            <ImageBackground style={styles.image} source={{uri: urlToImage}}>
            
                
            </ImageBackground>
            <View style={styles.contentContainer}>
                <Text>{content}</Text>
                <Button onPress={() => WebBrowser.openBrowserAsync(url)} title={source.name} />
            </View>
        </View>
    )
}

ArticleScreen.navigationOptions = {
    header: null,
    tabBarVisible: false
  };

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height/1.5
    },
    contentContainer: {   
        borderTopRightRadius: 5     
    }
})
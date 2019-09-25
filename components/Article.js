import React, { Fragment } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout, Fonts, Colors } from '../constants/Theme';
import timeSince from '../utils/timeSince';

const { width } = Layout.window;

export default function Article({publishedAt, author, title, image, onPressCallback}) {        
    return (
        <TouchableOpacity style={styles.container} onPress={onPressCallback}>
            <Image style={styles.image} source={{uri: image}}/>
            <View style={styles.centralContainer}>
                <Text numberOfLines={2} style={styles.title} ellipsizeMode="tail">{title}</Text>
                {author != null && <Text style={styles.author}>{author}</Text>}
                <View style={styles.timeSinceContainer}>
                    <MaterialCommunityIcons 
                        name={'clock-outline'}
                        size={20}
                        color={Colors.grey}
                    />
                    <Text style={styles.timeSince}>{timeSince(new Date(publishedAt))+' ago'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        padding: 10,
    },
    image: {
        width: width/5,
        height: width/3.5,
        borderRadius: 10
    },
    title: {
        width: width/1.5,
        fontFamily: Fonts.medium
    },
    centralContainer: {
        paddingHorizontal: 15,
        justifyContent: 'flex-start'
    },
    author: {
        fontFamily: Fonts.regular
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
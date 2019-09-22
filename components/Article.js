import React, { Fragment } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Layout from '../constants/Layout';

const { width, height } = Layout.window;

export default function Article({author, title, image, onPressCallback}) {
    return (
        <Fragment>
            <TouchableOpacity style={styles.container} onPress={onPressCallback}>
                <Image style={styles.image} source={{uri: image}}/>
                <View style={styles.centralContainer}>
                    <Text numberOfLines={2} style={styles.title} ellipsizeMode="tail">{title}</Text>
                    <Text style={styles.author}>{author}</Text>
                </View>
            </TouchableOpacity>
        </Fragment>
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
        fontWeight: 'bold'
    },
    centralContainer: {
        flexDirection: 'column',
        padding: 15
    },
})
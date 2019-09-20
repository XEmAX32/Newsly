import React, { Fragment } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Dash from 'react-native-dash';

const { height, width } = Dimensions.get('window');

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
            <View style={{alignItems:'center'}}>
                <Dash 
                    style={styles.dash}
                    dashColor="#eceded"
                    dashThickness={1.5}
                />
            </View>
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
    dash: {
        width:width/1.2, 
        height:1,
        marginVertical: 20
    }
})
import React from 'react';

import { 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Colors, Layout, Fonts } from '../constants/Theme';

const { width } = Layout.window;

export default function CategoryView({name,illustration, onPress}){
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.touchable}
        >
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchable: {
        backgroundColor: Colors.yellow,
        marginRight: 20,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    container: {
        flexDirection: 'column',
        borderRadius: 15,
        width: width/1.5,
        justifyContent:'flex-end',
        height: width/3,
        backgroundColor: Colors.yellow,
        marginRight: 50,
    },
    text: {
        color: '#000',
        fontSize: 15,
        fontFamily: Fonts.medium
    },
    image: {
        alignSelf: 'flex-end',
        transform: [{scale: 1}],
    }
})
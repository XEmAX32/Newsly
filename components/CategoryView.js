import React from 'react';

import { 
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const { width } = Layout.window;

export default function CategoryView({name,illustration, onPress}){
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View 
                style={styles.container}
            >   
                <Image style={styles.image} source={illustration} />
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};
//                <Text style={styles.text}>{name}</Text>

const styles = StyleSheet.create({
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
        color: Colors.blue,
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingBottom: 10
    },
    image: {
        alignSelf: 'flex-end',
        transform: [{scale: 1}],
    }
})
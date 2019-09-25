import React from 'react';
import { 
    Image, 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import { Layout, Fonts, Colors } from '../constants/Theme';

export default ListEmpty = (text) => (
    <View style={styles.container}>
        <Image 
        source={require('../assets/illustrations/listEmpty.png')}
        style={{width: Layout.window.width/1.5,height: Layout.window.height/3}}
        resizeMode="contain"
        />
        <Text style={styles.text}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    text: {
        fontFamily: Fonts.regular,
        fontSize: 20,
        color: Colors.yellow
    },
    container: {
        alignItems: 'center', 
        justifyContent: 'center',
    }
})
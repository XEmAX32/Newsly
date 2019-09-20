import React from 'react';

import { 
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CategoryView({name,illustration}){
    return (
        <TouchableOpacity
        >
            <View 
                style={styles.container}
            >   
                <Image height={2} width={2} style={{transform: [{scale: .7}]}} source={illustration} />
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
        height: width/3,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: '#fecd45',
        marginRight: 30,
    },
    text: {
        marginBottom: 10,
        marginRight: 10
    }
})
import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import Article from '../components/Article';
import { getArticles } from '../db/sqlite';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ArchiveScreen({navigation}) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getArticles((results) => {
      setNews(results)
    });
  }, []);

  const _renderItem = ({item}) => (
    <Article title={item.title} image={item.urlToImage} onPressCallback={() => navigation.navigate('Article', { item: {saved: true, source:{name: item.websiteName}, ...item}})} />
  );

  const _keyExtractor = (item, index) => ''+index;

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          //hitSlop={{top:10,bottom:10,right:10,left:10}}
        >
          <Ionicons
            name={'ios-arrow-back'}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text>Archive</Text>
        </View>
      </View>

      {news && <FlatList
        data={news}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />}
    </View>
  );
}

ArchiveScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fecd45',
    height: 150,
    width: width,
    padding:20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex:1,
    alignItems: 'center'
  },
})
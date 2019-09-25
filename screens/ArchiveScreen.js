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
import { Colors, Layout, Fonts } from '../constants/Theme';
import ItemSeparator from '../components/ItemSeparator';
import ListEmpty from '../components/ListEmpty';

const { width } = Layout.window;

export default function ArchiveScreen({navigation}) {
  const [news, setNews] = useState([]);

  useEffect(() => { 
    getArticles((results) => {
      setNews(results)
    });
    
    const willFocus = navigation.addListener(
      'willFocus',
      () => {
        getArticles((results) => {
          setNews(results)
        });
      }
    )

    return () => willFocus.remove()
  }, []);



  const _renderItem = ({item}) => (
    <Article publishedAt={item.publishedAt} author={item.author} title={item.title} image={item.urlToImage} onPressCallback={() => navigation.navigate('Article', { item: {saved: true, source:{name: item.websiteName}, ...item}})} />
  );

  const _keyExtractor = (item, index) => ''+index;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          hitSlop={{top:20,bottom:20,right:20,left:20}}
        >
          <Ionicons
            name={'ios-arrow-back'}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Archive</Text>
        </View>
      </View>

      <FlatList
        data={news}
        extraData={news.length}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        ItemSeparatorComponent={ItemSeparator}
        style={{flex:1, marginBottom: 20}}
        ListEmptyComponent={() => ListEmpty('There are no saved news')}
      />
    </View>
  );
}

ArchiveScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.yellow,
    height: 150,
    width: width,
    padding:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleContainer: {
    flex:1,
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 20
  }
})
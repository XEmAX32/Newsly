import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList
} from 'react-native';
import CategoryView from '../components/CategoryView';
import SearchComponent from '../components/SearchComponent';
import Article from '../components/Article';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux';

import categories from '../data/categories'

const {height,width} = Dimensions.get('window');

function HomeScreen({news, getNews, navigation}) {


  useEffect(() => {
    getNews('general')
  }, [])

  const [category, setCategory] = useState(categories[0].keyword);

  const refreshPage = (keyword) => {
    setCategory(keyword);
  };

  const _keyExtractor = (item, index) => ''+index;

  const _renderItem = ({item}) => (
    <Article author={item.author} title={item.title} image={item.urlToImage} onPressCallback={() => navigation.navigate('Article', {item: {...item, saved:false}})} />
  );

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerbarContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Archive')}
            >
              <Ionicons
                name={'md-bookmark'}
                size={30}
              />
            </TouchableOpacity>
            <Text>Today's news</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons
                name={'ios-settings'}
                size={30}
              />
            </TouchableOpacity>
        </View>
        <SearchComponent style={styles.searchComponent} />
      </View>
      <View>
        <ScrollView
            style={styles.scrollView}
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, i) => <CategoryView key={i} illustration={category.illustration} name={category.name} onPress={() => refreshPage(category.keyword)}/>)}
        </ScrollView>
        {news.articles !== undefined ? <FlatList
          data={news.articles}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          contentContainerStyle={styles.flatList}
        /> : null}
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  scrollViewContent: {
    marginTop: 60,
    paddingLeft: 20,
    height: 200
  },
  search: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  header: {
    backgroundColor: '#fecd45',
    height: 150,
    width: width,
    padding:20,
    paddingTop: 50,
    zIndex:2,
  },
  headerbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchComponent: {
    top: 40
  },
  flatList: {
    paddingTop: 50,
    zIndex: -1
  }
});

const mapStateToProps = (state) => {
  return {
    news: state.generalReducers.news
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
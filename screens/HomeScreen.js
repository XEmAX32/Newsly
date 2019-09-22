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
import Menu, { MenuItem } from 'react-native-material-menu';
import emojiFlags from 'emoji-flags';
import colors from '../constants/Colors';
import ItemSeparator from '../components/ItemSeparator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux';

import categories from '../constants/categories'
import Layout from '../constants/Layout';

const { width } = Layout.window;

function HomeScreen({news, getNews, navigation, category, setCategory}) {
  const [country, setCountry] = useState({
    name: 'Italy',
    flag: '🇮🇹',
    code: 'IT',
})
  
  useEffect(() => {
    getNews(category, country.code)
  }, [country.code, category])

  const _keyExtractor = (item, index) => ''+index;

  const _renderItem = ({item}) => (
    <Article author={item.author} title={item.title} image={item.urlToImage} onPressCallback={() => navigation.navigate('Article', {item: {...item, saved:false, category }})} />
  );

  const hideMenu = () => {
    this._menu.hide();
  };
 
  const showMenu = () => {
    this._menu.show();
  };
  
  const _renderLanguageOption = ({item}) => (
    <MenuItem onPress={(data, emoji = item.emoji, name = item.name, code = item.code) => {hideMenu();setCountry({flag: emoji, name, code})}} key={item.unicode}>{item.emoji+""+item.name}</MenuItem>  
  );

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerbarContainer}>
          <Menu
            ref={ref => {
              this._menu = ref;
            }}
            animationDuration={100}
            button={<Text style={{fontSize:30}} onPress={showMenu}>{country.flag}</Text>}
          >
            <FlatList 
              style={{height: 200}} 
              data={emojiFlags.data}
              keyExtractor={_keyExtractor}
              renderItem={_renderLanguageOption}
            />
          </Menu>
          <Text style={styles.title}>Today's news</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Archive')}
          >
            <Ionicons
              name={'md-bookmark'}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <SearchComponent style={styles.searchComponent} />
      </View>
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((el, i) => <CategoryView key={i} illustration={el.illustration} name={el.name} onPress={() => setCategory(el.keyword)}/>)}
        </ScrollView>
        {news.articles !== undefined ? <FlatList
          data={news.articles}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={ItemSeparator}
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
    backgroundColor: colors.yellow,
    height: 150,
    width: width,
    padding:20,
    paddingTop: 50,
    zIndex:2,
  },
  headerbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchComponent: {
    top: 40
  },
  flatList: {
    paddingBottom: 450
  },
  content: {
    marginTop: 30
  },
  title: {
    fontWeight: '500'
  }
});

const mapStateToProps = (state) => {
  return {
    news: state.generalReducers.news,
    country: state.optionsReducers.country,
    category: state.generalReducers.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
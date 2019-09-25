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
import { Colors, Layout, Fonts } from '../constants/Theme';
import ItemSeparator from '../components/ItemSeparator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux';
import ListEmpty from '../components/ListEmpty'
import categories from '../constants/categories'

const { width } = Layout.window;

const ListHeader = (setCategory) => (
  <ScrollView
    horizontal
    contentContainerStyle={styles.scrollViewContent}
    showsHorizontalScrollIndicator={false}
  >
    {categories.map((el, i) => <CategoryView key={i} illustration={el.illustration} name={el.name} onPress={() => setCategory(el.keyword)}/>)}
  </ScrollView>
)

function HomeScreen({news, getNews, navigation, category, setCategory}) {
  const [country, setCountry] = useState({
    name: 'Italy',
    flag: '🇮🇹',
    code: 'IT',
  })
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getNews(category, country.code, refreshWorker)
  }, [country.code, category])


  const renderArticle = ({item}) => (
    <Article publishedAt={item.publishedAt} author={item.author} title={item.title} image={item.urlToImage} onPressCallback={() => navigation.navigate('Article', {item: {...item, saved:false, category }})} />
  );

  const keyExtractor = (item, index) => ''+index

  const hideMenu = () => {
    this._menu.hide();
  };
 
  const showMenu = () => {
    this._menu.show();
  };
  
  const refreshWorker = (state) => {
    setRefreshing(state)
  }

  const renderLanguageOption = ({item}) => (
    <MenuItem textStyle={{fontFamily: Fonts.regular}} onPress={(data, emoji = item.emoji, name = item.name, code = item.code) => {hideMenu();setCountry({flag: emoji, name, code})}} key={item.unicode}>{item.emoji+""+item.name}</MenuItem>  
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
              keyExtractor={keyExtractor}
              renderItem={renderLanguageOption}
            />
          </Menu>
          <Text style={styles.title}>Today's news</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Archive')}
            hitSlop={{top:20,bottom:20,right:20,left:20}}
          >
            <Ionicons
              name={'md-bookmark'}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <SearchComponent style={styles.searchComponent} refreshWorker={refreshWorker}/>
      </View>
      <View style={styles.content}>
        <FlatList
          data={news.articles}
          keyExtractor={keyExtractor}
          renderItem={renderArticle}
          refreshing={refreshing}
          onRefresh={() => {
            getNews(category, country.code, refreshWorker)
          }}
          contentContainerStyle={{paddingTop: 20, paddingBottom:150}} 
          //necessario probabilmente per l'header vero e proprio
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={() => ListHeader(setCategory)}
          ListEmptyComponent={() => ListEmpty('There are no news')}
        />
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
    paddingLeft: 20,
    paddingVertical: 30,
    height: 100
  },
  search: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  header: {
    backgroundColor: Colors.yellow,
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
    top: 25
  },
  content: {
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 20
  },
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
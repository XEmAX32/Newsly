import React from 'react';
import { 
  View,
  StyleSheet,
  Dimensions,
  Text,
  Switch,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu, { MenuItem } from 'react-native-material-menu';
import emojiFlags from 'emoji-flags';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux';
import Layout from '../constants/Layout';

const { width } = Layout.window;


function SettingsScreen({navigation, setCountry, country}) {
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

  const _keyExtractor = (item, index) => ''+index;

  const _renderItem = ({item}) => (
    <MenuItem onPress={(data, emoji = item.emoji, name = item.name, code = item.code) => {hideMenu();setCountry({flag: emoji, name, code})}} key={item.unicode}>{item.emoji+""+item.name}</MenuItem>  
  );

  return (
    <View style={styles.container}>
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
          <Text>Settings</Text>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsSection}>
          <Text>Select country</Text>
          <Menu
            ref={ref => {
              this._menu = ref;
            }}
            animationDuration={100}
            button={<Text onPress={this.showMenu}>{country.flag}</Text>}
          >
            <FlatList 
              style={{height: 200}} 
              data={emojiFlags.data}
              keyExtractor={_keyExtractor}
              renderItem={_renderItem}
              contentContainerStyle={styles.flatList}
            />
          </Menu>
        </View>
        <View style={styles.separator}/>
        <View style={styles.optionsSection}>
          <Text>Night mode</Text>
          <Switch 
            trackColor={{true: '#fecd45', false: '#000'}}
          />
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <Text>Hi! My name is Emanuele Sacco</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center'
  },
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
  optionsContainer: {
    backgroundColor: '#ededed',
    width: width/1.2,
    padding: 20,
    borderRadius: 10,
    marginTop: 20
  },
  optionsSection: {
    flex:0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  separator: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: width/1.2 - 40,
    marginVertical: 10
  }
})

SettingsScreen.navigationOptions = {
  header:null
};

const mapStateToProps = (state) => {
  return {
    country: state.optionsReducers.country
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
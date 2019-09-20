import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ArticleScreen from '../screens/ArticleScreen';

const stackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Article: ArticleScreen,
    Archive: ArchiveScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default stackNavigator;

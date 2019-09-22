import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import ArticleScreen from '../screens/ArticleScreen';

const stackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Article: ArticleScreen,
    Archive: ArchiveScreen,
  },
  {
    initialRouteName: 'Home'
  }
);

export default stackNavigator;

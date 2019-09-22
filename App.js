import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { Provider } from 'react-redux'
import { store } from './redux'

import { AppearanceProvider } from 'react-native-appearance';
import AppNavigator from './navigation/AppNavigator';

import { openDB, closeDB } from './db/sqlite';
/*
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    openDB()
    return () => {
      console.log('cleanup')
      closeDB();
    }
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}*/

export default class App extends React.Component {

  state = {
    loading: true
  }

  componentWillUnmount() {
    closeDB();
  }

  render() {
    if(this.state.loading == false)
      openDB();

    if (this.state.loading == true) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => {this.setState({loading:false})}}
        />
      );
    } else {
      return (
        <AppearanceProvider>
          <Provider store={store}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </Provider>
        </AppearanceProvider>
      );
    }
  }

}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/illustrations/general.png"),
      require("./assets/illustrations/business.png"),
      require("./assets/illustrations/enterteinment.png"),
      require("./assets/illustrations/science.png"),
      require("./assets/illustrations/sport.png"),
      require("./assets/illustrations/technology.png"),
      require("./assets/illustrations/health.png"),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

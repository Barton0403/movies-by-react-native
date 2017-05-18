'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Navigator
} from 'react-native';
import Index from './scenes/Comment';

class App extends Component {

  constructor() {
    super();
    this._renderScene = this._renderScene.bind(this);
  }

  _renderScene(route, navigator) {
    if (route.component) {
      let RouteComponent = route.component;
      return (
        <RouteComponent
          navigator={navigator}
          {...route}
        />
      );
    }

    return (
      <View style={styles.sceneContainer}>
        <Text>No Component</Text>
      </View>
    );
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          component: Index
        }}
        configureScene={(route) => {
          if (route.configureScene) {
            return route.configureScene;
          } else {
            return Navigator.SceneConfigs.FloatFromRight;
          }
        }}
        renderScene={this._renderScene}
      />
    );
  }

}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});

module.exports = connect()(App);

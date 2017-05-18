'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
const Parse = require('parse/react-native');

class Test extends Component {

  constructor() {
    super();
    this.state = {
      res: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => this.request()}
        >Test Pares Code Cloud</Text>
        <Text>{this.state.res}</Text>
      </View>
    );
  }

  request() {
    const Movie = new Parse.Object.extend('Movie');
    new Parse.Query(Movie).find({
      success: list => {
        this.setState({ res: list[0].get('title') });
      },
      error: error => console.error(error)
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

module.exports = Test;

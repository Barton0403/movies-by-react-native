'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  PixelRatio
} from 'react-native';
import moviesColor from '../common/moviesColor';
import moviesStyles from '../common/moviesStyles';
import Header from '../common/Header';

class Comment extends Component {

  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="评论"
          leftItem={{
            icon: 'back',
            onPress: () => this.props.navigator.pop()
          }}
          rightItem={{
            title: '发送',
            onPress: () => null
          }}
          style={{ backgroundColor: '#8E5CD4' }}
        />
        <View style={styles.content}>
          <TextInput
            style={[moviesStyles.content, styles.input]}
            multiline
            placeholder="你觉得这部电影怎么样..."
            autoFocus
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <View style={styles.section}>
          <View style={styles.inline}>
            <Image source={require('./imgs/smile-icon.png')} />
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: moviesColor.bgColor
  },
  content: {
    height: 150,
    backgroundColor: 'white',
    padding: 10
  },
  input: {
    flex: 1,
    color: '#030303'
  },
  section: {
    height: 48,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: moviesColor.line
  },
  inline: {
    flex: 1,
    marginHorizontal: 10,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: moviesColor.line,
    alignItems: 'center',
    flexDirection: 'row',
  }
});

module.exports = Comment;

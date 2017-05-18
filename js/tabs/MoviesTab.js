'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Swiper from 'react-native-swiper';
import MovieList from './MovieList';

const SCREEN_WIDTH = Dimensions.get('window').width;
const dot = <View style={{backgroundColor:'white', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;
const activeDot = <View style={{backgroundColor: '#8E5CD4', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;
const dotTexts = [
  'Reveal the plugins folder, open Content Generator Sketch1',
  'Reveal the plugins folder, open Content Generator Sketch2',
  'Reveal the plugins folder, open Content Generator Sketch3'
];

class MoviesTab extends Component {

  constructor() {
    super();
    this._renderSwiper = this._renderSwiper.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="电影"
          style={{ backgroundColor: '#8E5CD4' }}
        />
        <MovieList
          navigator={this.props.navigator}
          renderHeader={this._renderSwiper}
        />
      </View>
    );
  }

  _renderSwiper() {
    let imgStyle = { width: SCREEN_WIDTH, height:  Math.max(SCREEN_WIDTH * 210 / 420, 200) };

    return (
      <Swiper
        style={styles.wrapper}
        renderPagination={this._renderPagination}
        height={200}>
        <View style={styles.slide1}>
          <Image
            source={require('./imgs/slide1.jpg')}
            style={imgStyle}
          />
        </View>
        <View style={styles.slide2}>
          <Image
            source={require('./imgs/slide1.jpg')}
            style={imgStyle}
          />
        </View>
        <View style={styles.slide3}>
          <Image
            source={require('./imgs/slide1.jpg')}
            style={imgStyle}
          />
        </View>
      </Swiper>
    );
  }

  _renderPagination(index, total, context) {
    let dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(
        i === index ?
          React.cloneElement(activeDot, { key: i }) :
          React.cloneElement(dot, { key: i })
      );
    }

    return (
      <View style={styles.pagination}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}>{dotTexts[index]}</Text>
        </View>
        <View style={ styles.dots }>
          {dots}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F8'
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(42, 39, 42, 0.58)',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  dots: {
    flexDirection: 'row'
  }
});

module.exports = connect()(MoviesTab);

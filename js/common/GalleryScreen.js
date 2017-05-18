'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import Header from './Header';
import Swiper from 'react-native-swiper';
const dot = <View style={{backgroundColor:'white', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;
const activeDot = <View style={{backgroundColor: '#8E5CD4', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />;

const SCREEN_WIDTH = Dimensions.get('window').width;

class GalleryScreen extends Component {

  render() {
    const { selectedIndex, imgs } = this.props;
    let imgList = [];

    imgs.forEach((img, i) => {
      imgList.push(this.renderImg(img, i));
    });

    return (
      <View style={{flex: 1}}>
        <Header
          style={styles.header}
          leftItem={{
            icon: 'close',
            onPress: () => this.props.navigator.pop()
          }}
        />
        <Swiper
          style={styles.wrapper}
          dot={dot}
          activeDot={activeDot}
          loop={false}
          index={selectedIndex}>
          {imgList}
        </Swiper>
      </View>
    );
  }

  renderImg(img, i) {
    let imgSize = {
      width: SCREEN_WIDTH - 20,
      height: img.height * SCREEN_WIDTH / img.width
    };

    return (
      <View key={i} style={styles.slide}>
        <Image
          source={{uri: img.uri}}
          style={imgSize}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = GalleryScreen;

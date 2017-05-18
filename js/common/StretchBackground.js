'use strict';

import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import resolveAssetSource from 'resolveAssetSource';
import Header from './Header';

const SCREEN_WIDTH = Dimensions.get('window').width;

class StretchBackground extends Component {

  render() {
    return (
      <View style={styles.container}>
        {this.renderBackgroud()}
        {this.renderContent()}
      </View>
    );
  }

  renderBackgroud() {
    const { anim, backgroundImg, length } = this.props;

    const translateY = anim.interpolate({
      inputRange: [0, length],
      outputRange: [0, -length / 2],
      extrapolateRight: 'clamp'
    });

    // 获取图片宽度
    const source = resolveAssetSource(backgroundImg);
    const { width } = source;
    // 设置初始放大倍数
    let initialScale = Math.max(SCREEN_WIDTH / width, 1);
    const scale = anim.interpolate({
      inputRange: [-length, 0],
      outputRange: [2, initialScale],
      extrapolate: 'clamp'
    });

    const transforms = { transform: [{ translateY }, { scale }] };

    return (
      <Animated.Image
        source={this.props.backgroundImg}
        style={transforms}
      />
    );
  }

  renderContent() {
    const { anim, length, children } = this.props;

    const opacity = anim.interpolate({
      inputRange: [0, length - 40],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const translateY = anim.interpolate({
      inputRange: [0, length],
      outputRange: [0, -(length / 2)],
      extrapolate: 'clamp',
    });
    const transforms = { opacity, transform: [{translateY}] };

    return (
      <Animated.View style={[styles.contentContainer, transforms]}>
        {children}
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    top: Header.height,
    right: 0,
    backgroundColor: 'transparent',
  },
});

module.exports = StretchBackground;

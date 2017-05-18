'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

class ItemWrapperIOS extends Component {

  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, image, onPress} = item;

    // 图标还是文字
    if (title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else {
      if (icon) {
        switch (icon) {
          case 'close':
            content = <Image source={require('./imgs/close-icon.png')} />;
            break;
          default:
            content = <Image source={require('./imgs/back-icon.png')} />;
            break;
        }
      } else {
        content = <Image source={image} />;
      }
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}

class HeaderIOS extends Component {

  render() {
    const {leftItem, title, rightItem} = this.props;

    // 是否用子元素代替
    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText, {color: '#fff'}]}>
          {title}
        </Text>
      : this.props.children;

    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color="#fff" item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS color="#fff" item={rightItem} />
        </View>
      </View>
    );
  }

}

class HeaderAndroid extends Component {

  render() {
    return (
      <View />
    );
  }

}

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 17,
    color: 'white',
  },
});

const Header = Platform.OS === 'ios' ? HeaderIOS : HeaderAndroid;
Header.height = HEADER_HEIGHT;

module.exports = Header;

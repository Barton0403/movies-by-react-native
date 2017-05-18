'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio
} from 'react-native';
import moviesStyles from './moviesStyles';
import moviesColor from './moviesColor';

class CommentItem extends Component {

  render() {
    const { isHeader, isBottom, comment, toReply, style } = this.props;
    let containerStyle, bottomStyle;

    if (isHeader) {
      containerStyle = {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: moviesColor.line
      };
      bottomStyle = { borderBottomWidth: 0 };
    } else if (isBottom) {
      bottomStyle = { borderBottomWidth: 0 };
    }

    return (
      <View style={[styles.container, containerStyle, style]}>
        <View style={styles.title}>
          <Image source={{uri: comment.imgURL}} style={[{width: 36, height: 36}, styles.img]} />
          <Text style={moviesStyles.content}>{comment.userName}</Text>
          <View style={{flex: 1}} />
        </View>
        <View style={styles.content}>
          <Text style={[moviesStyles.content, {color: '#030303'}]}>{comment.content}</Text>
          {
            toReply &&
            <View style={styles.toReply}>
              <Text style={[moviesStyles.subtitle]}>回复{toReply.userName}</Text>
              <Text style={[moviesStyles.subtitle, {marginTop: 5}]}>{toReply.content}</Text>
            </View>
          }
        </View>
        <View style={[styles.bottom, bottomStyle]}>
          <Text style={moviesStyles.subtitle}>{comment.time}</Text>
          <View style={{flex: 1}} />
          <Image source={require('./imgs/zan-icon.png')} />
          <Text style={[moviesStyles.subtitle, {marginHorizontal: 5}]}>{comment.zan || '赞'}</Text>
          <Image source={require('./imgs/comment-icon.png')} />
          <Text style={[moviesStyles.subtitle, {marginLeft: 5}]}>{comment.commentNumber || '回复'}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderColor: moviesColor.line
  },
  img: {
    borderRadius: 18,
    marginRight: 10
  },
  title: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  toReply: {
    backgroundColor: '#E8E8ED',
    padding: 10,
    marginTop: 10
  },
  content: {
    paddingLeft: 56,
    paddingRight: 10
  },
  bottom: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 56,
    paddingRight: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: moviesColor.line
  }
});

module.exports = CommentItem;

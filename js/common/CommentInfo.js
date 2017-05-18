'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  PixelRatio,
  Animated
} from 'react-native';
import CommentItem from './CommentItem';
import Header from './Header';
import moviesColor from './moviesColor';

class CommentInfo extends Component {

  constructor() {
    super();
    this._renderHeader = this._renderHeader.bind(this);
    this._renderComment = this._renderComment.bind(this);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  render() {
    const { title, comment, navigator } = this.props;
    const { ds } = this.state;

    return (
      <View style={{flex: 1}}>
        <Header
          title={title}
          leftItem={{
            icon: 'back',
            onPress: () => navigator.pop()
          }}
          style={{ backgroundColor: '#8E5CD4' }}
        />
        { comment.replys && comment.replys.length !== 0 ?
          <ListView
            style={{backgroundColor: moviesColor.bgColor}}
            dataSource={ds.cloneWithRows(comment.replys)}
            renderRow={this._renderComment}
            renderHeader={this._renderHeader}
          /> :
          (
            <View style={styles.container}>
              {this._renderHeader()}
              <View style={styles.hideBox} />
            </View>
          )
        }
      </View>
    );
  }

  _renderHeader() {
    return (
      <View>
        <CommentItem
          isHeader
          comment={this.props.comment}
          style={{backgroundColor: 'white'}}
        />
        <Animated.View style={styles.box} />
      </View>
    );
  }

  _renderComment(row, sID, rowID) {
    return (
      <CommentItem
        isBottom={rowID === this.props.comment.replys.length - 1 + ''}
        comment={row}
        toReply={row.toReply}
        style={{backgroundColor: moviesColor.bgColor}}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: moviesColor.bgColor
  },
  box: {
    position: 'absolute',
    bottom: -5,
    left: 23,
    width: 10,
    height: 10,
    backgroundColor: moviesColor.bgColor,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: moviesColor.line,
    transform: [{rotate: '45deg'}]
  },
  hideBox: {
    height: 10,
    backgroundColor: moviesColor.bgColor
  }
});

module.exports = CommentInfo;

'use strict';

import React, { Component } from 'react';
import {
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import CommentItem from './CommentItem';
import CommentInfo from './CommentInfo';

class CommentList extends Component {

  constructor() {
    super();
    this._renderComment = this._renderComment.bind(this);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.ds.cloneWithRows(this.props.comments)}
        renderRow={this._renderComment}
      />
    );
  }

  _renderComment(row, sID, rowID) {

    return (
      <TouchableHighlight onPress={() => this.props.navigator.push({
        component: CommentInfo,
        title: this.props.movieTitle + '——评论',
        comment: row
      })}>
        <View>
          <CommentItem
            isBottom={rowID === this.props.comments.length - 1 + ''}
            comment={row}
            style={{backgroundColor: 'white'}}
          />
        </View>
      </TouchableHighlight>
    );
  }

}

module.exports = CommentList;

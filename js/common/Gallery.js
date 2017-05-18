'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  Image,
  PixelRatio,
  TouchableWithoutFeedback
} from 'react-native';
import NavigatorSceneConfigs from 'NavigatorSceneConfigs';
import GalleryScreen from './GalleryScreen';

class Gallery extends Component {

  constructor() {
    super();
    this._renderImg = this._renderImg.bind(this);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <ListView
          style={styles.listView}
          contentContainerStyle={styles.content}
          dataSource={this.state.ds.cloneWithRows(this.props.imgs)}
          renderRow={this._renderImg}
          horizontal
        />
      </View>
    );
  }

  _renderImg(img, sID, rowID) {
    let imgSize = { height: 120, width: img.width * 120 / img.height };

    return (
      <TouchableWithoutFeedback onPress={() => this.showUserGalleryScreen(parseInt(rowID, 10))}>
        <Image
          source={{uri: img.uri}}
          style={[imgSize, styles.img]}
        />
      </TouchableWithoutFeedback>
    );
  }

  showUserGalleryScreen(id) {
    this.props.navigator.push({
      component: GalleryScreen,
      configureScene: NavigatorSceneConfigs.FloatFromBottom,
      imgs: this.props.imgs,
      selectedIndex: id
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 5
  },
  img: {
    marginHorizontal: 5,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#000'
  }
});

module.exports = Gallery;

'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated
} from 'react-native';
import StretchBackground from './StretchBackground';
import moviesStyles from '../common/moviesStyles';

// 滚动视图内头部高度
const EMPTY_HEADER_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;

class UserPage extends Component {

  constructor(props) {
    super(props);
    this._handleScroll = this._handleScroll.bind(this);
  }

  render() {
    const {
      backgroundImg,
      children,
      renderHeader,
      renderBottom,
      contentInset,
      anim,
      user
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StretchBackground
            length={EMPTY_HEADER_HEIGHT}
            anim={anim}
            backgroundImg={backgroundImg}
          >
            <View style={styles.stretchContent}>
              <Image
                source={{uri: user.imgURL}}
                style={[{width: 116, height: 116}, styles.userImg]}
              />
              <View style={styles.userInfo}>
                <Text style={[moviesStyles.title, { backgroundColor: 'transparent', color: '#fff' }]}>{user.name}</Text>
                <Image source={user.sex === 'male' ? require('./imgs/male-icon.png') : require('./imgs/female-icon.png')} style={{ marginLeft: 10  }} />
              </View>
            </View>
          </StretchBackground>
        </View>
        {renderHeader && renderHeader()}
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentInset={contentInset}
          onScroll={this._handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {this.renderEmptyHeader()}
          {children}
        </ScrollView>
        {renderBottom && renderBottom()}
      </View>
    );
  }

  // scroll内透明顶部
  renderEmptyHeader() {


    // <Image
    //   source={{uri: user.imgURL}}
    //   style={[{width: 116, height: 116}, styles.userImg]}
    // />
    // <View style={styles.userInfo}>
    //   <Text style={[moviesStyles.title, { backgroundColor: 'transparent', color: '#fff' }]}>{user.name}</Text>
    //   <Icon name="mars" size={17} color="#4A4A4A" style={{ backgroundColor: 'transparent', marginLeft: 10  }} />
    // </View>

    return (
      <Animated.View style={{height: EMPTY_HEADER_HEIGHT}} />
    );
  }

  _handleScroll(e) {
    this.props.anim.setValue(e.nativeEvent.contentOffset.y);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  userImg: {
    borderRadius: 58,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10
  },
  userInfo: {
    flexDirection: 'row'
  },
  stretchContent: {
    height: EMPTY_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

UserPage.emptyHeaderHeight = EMPTY_HEADER_HEIGHT;
module.exports = UserPage;

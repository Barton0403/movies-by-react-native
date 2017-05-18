'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PixelRatio,
  Animated
} from 'react-native';
import UserPage from '../common/UserPage';
import Header from '../common/Header';
import moviesStyles from '../common/moviesStyles';

const styles = StyleSheet.create({
  headerBackgound: {
    backgroundColor: '#8e5cd4',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Header.height
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  userImg: {
    borderRadius: 15,
    margin: 0,
    marginRight: 5
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#c1c4d6',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#c1c4d6'
  },
  notification: {
    height: 20,
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#FE3824'
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  content: {
    backgroundColor: '#f4f4f8'
  },
  rightElement: {
    width: 68,
    alignItems: 'center'
  }
});

const TEST_USER = {
  name: '小浩',
  imgURL: 'http://v1.qzone.cc/avatar/201406/22/21/22/53a6d87949d4b465.jpg%21200x200.jpg',
  desc: '喜欢看电影',
  sex: 'male'
};
const TEST_DATA = [
  {
    title: '我的通知',
    image: require('./imgs/notify-icon.png'),
    rightElement: (
      <View style={styles.notification}>
        <Text style={[moviesStyles.content, { color: '#fff' }]}>99+</Text>
      </View>
    ),
    isTop: true
  },{
    title: '我的评论',
    image: require('./imgs/my-comment-icon.png'),
    rightElement: (
      <Text style={[moviesStyles.content]}>20</Text>
    )
  },{
    title: '我的电影收藏',
    image: require('./imgs/star-icon.png'),
    rightElement: (
      <Text style={[moviesStyles.content]}>10</Text>
    ),
    isBottom: true
  },{
    title: '意见反馈',
    image: require('./imgs/suggestion-icon.png'),
    isTop: true
  },{
    title: '关于我们',
    image: require('./imgs/about-icon.png'),
    isBottom: true
  }
];

class ListItem extends Component {

  render() {
    const { title, image, rightElement, isTop, isBottom } = this.props;
    let rowContainerStyles = {}, rowRightStyles = {};

    if (isTop) {
      rowContainerStyles = {
        borderTopWidth: 1 / PixelRatio.get(),
        marginTop: 10
      };
    }

    if (isBottom) {
      rowContainerStyles = {
        ...rowContainerStyles,
        borderBottomWidth: 1 / PixelRatio.get()
      };
      rowRightStyles = {
        borderBottomWidth: 0
      };
    }

    return (
      <View style={[styles.rowContainer, rowContainerStyles]}>
        <View style={styles.icon}>
          <Image source={image} />
        </View>
        <View style={[styles.rowRight, rowRightStyles]}>
          <Text style={[moviesStyles.title, { flex: 1 }]}>{title}</Text>
          {rightElement &&
            <View style={styles.rightElement}>
              {rightElement}
            </View>
          }
        </View>
      </View>
    );
  }

}

class UserTab extends Component {

  constructor(props) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this.state = {
      anim: new Animated.Value(0)
    };
  }

  render() {
    let content = [];
    TEST_DATA.forEach((data, i) => {
      content.push(
        <ListItem
          key={i}
          title={data.title}
          image={data.image}
          rightElement={data.rightElement}
          isTop={data.isTop}
          isBottom={data.isBottom}
        />
      );
    });

    return (
      <UserPage
        backgroundImg={require('./imgs/user_info_header-background.png')}
        contentInset={{bottom: 49}}
        renderHeader={this._renderHeader}
        anim={this.state.anim}
        user={TEST_USER}
      >
        <View style={styles.content}>
          {content}
        </View>
      </UserPage>
    );
  }

  _renderHeader() {
    return (
      <View>
        {this.renderHeaderBackground()}
        <Header
          rightItem={{
            image: require('./imgs/setting-icon.png'),
            onPress: () => null,
          }}
        >
          {this.renderHeaderTitle()}
        </Header>
      </View>
    );
  }

  // 真实头部标题
  renderHeaderTitle() {
    // 透明度渐变
    let length = UserPage.emptyHeaderHeight;
    const opacity = this.state.anim.interpolate({
      inputRange: [(length / 2) - 40, length],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const transform = { opacity };

    return (
      <Animated.View style={[styles.headerTitleContainer, transform]}>
        <Image
          source={{uri: TEST_USER.imgURL}}
          style={[
            {width: 30, height: 30},
            styles.userImg,
          ]}
        />
        <Text style={styles.userName}>{TEST_USER.name}</Text>
      </Animated.View>
    );
  }

  renderHeaderBackground() {
    // 透明度渐变
    let length = UserPage.emptyHeaderHeight;
    const opacity = this.state.anim.interpolate({
      inputRange: [(length / 2) - 40, length],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const transform = { opacity };

    return (
      <Animated.View style={[styles.headerBackgound, transform]} />
    );
  }

}

module.exports = UserTab;

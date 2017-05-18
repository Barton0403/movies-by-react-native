'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  PixelRatio,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Header from '../common/Header';
import moviesStyles from '../common/moviesStyles';
import moviesColor from '../common/moviesColor';
import Gallery from '../common/Gallery';
import CommentList from '../common/CommentList';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TEST_DATA = {
  title: '变形金刚',
  bill: require('./imgs/slide1.jpg'),
  description: '  19世纪初：\n    北极圈内：Archibald Witwicky船长(维特维奇家族的先祖)在一次灾难中随着巨大的冰块落入深渊，落到了埋藏在冰层之下的一个机器人手掌上。船长醒来后发现机器人的眼睛正注视着他。而这台机器人正是很久以前离开塞伯坦，前往地球寻找火种源(All Spark)的威震天(Megatron)！',
  releaseTime: '2008年8月',
  type: '动作 科幻 冒险',
  adress: '欧美 日本',
  grade: 7.8,
  rankingOffice: 2,
  wkOffice: 10900,
  sumOffice: 31700,
};
const TEST_IMGS = [
  {uri: 'http://www.sfs-cn.com/node3/ypjs/node2542/node2547/images/139169.jpg', width: '1200', height: '800'},
  {uri: 'http://d.hiphotos.baidu.com/zhidao/pic/item/0eb30f2442a7d933e3ba6f11ad4bd11373f00145.jpg', width: '763', height: '371'},
  {uri: 'http://imgssrc.baidu.com/forum/pic/item/0c536628698d667871f05d00.jpg', width: '563', height: '371'},
  {uri: 'http://www.2828dy.com/pic/juqingtp/2016-9/20169215204630302.jpg', width: '525', height: '371'}
];
const TEST_COMMENT = [
  {
    userName: 'Jack Cole',
    imgURL: 'http://tupian.qqjay.com/tou3/2016/0605/c9b4c7a335579d5a9a923aec2e36b373.jpg',
    content: 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.',
    time: '4天前',
    zan: 100,
    commentNumber: 29,
    replys: []
  },{
    userName: 'Jack Cole',
    imgURL: 'http://tupian.qqjay.com/tou3/2016/0605/c9b4c7a335579d5a9a923aec2e36b373.jpg',
    content: 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.',
    time: '4天前',
    zan: 100,
    commentNumber: 29,
    replys: [
      {
        userName: 'Jack Cole',
        imgURL: 'http://tupian.qqjay.com/tou3/2016/0605/c9b4c7a335579d5a9a923aec2e36b373.jpg',
        content: 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.',
        time: '4天前'
      }
    ]
  },{
    userName: 'Jack Cole',
    imgURL: 'http://tupian.qqjay.com/tou3/2016/0605/c9b4c7a335579d5a9a923aec2e36b373.jpg',
    content: 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.',
    time: '4天前',
    zan: 100,
    commentNumber: 29,
    replys: [
      {
        userName: 'Jack Cole',
        imgURL: 'http://tupian.qqjay.com/tou3/2016/0605/c9b4c7a335579d5a9a923aec2e36b373.jpg',
        content: 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.',
        time: '4天前'
      },{
        userName: 'Jack Cole',
        imgURL: 'http://tupian.qqjay.com/tou3/2016/0605/c9b4c7a335579d5a9a923aec2e36b373.jpg',
        content: 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.',
        time: '4天前',
        toReply: {
          userName: 'Jack Cole',
          content: 'Vestibulum rutrum quam vitae'
        }
      },{
        userName: 'Jack Cole',
        imgURL: 'http://tupian.qqjay.com/tou3/2016/0605/c9b4c7a335579d5a9a923aec2e36b373.jpg',
        content: 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.',
        time: '4天前',
      }
    ]
  }
];

class DescriptionCar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cutText: props.text.length > 100,
      isOpen: false,
      text: props.text.length > 100 ? props.text.substr(0, 100) + '...' : props.text
    };
  }

  render() {
    return (
      <View style={styles.car}>
        <Text style={moviesStyles.description}>
          {this.state.text}
        </Text>
        {this.state.cutText && this.renderBottom()}
      </View>
    );
  }

  renderBottom() {
    const { isOpen } = this.state;

    return (
      <View style={styles.carBottom}>
        <TouchableOpacity onPress={() => this.toggleCar()}>
          <Image source={isOpen ? require('./imgs/up-icon.png') : require('./imgs/down-icon.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  toggleCar() {
    const { isOpen } = this.state;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (isOpen) {
      this.setState({text: this.props.text.substr(0, 100) + '...', isOpen: false});
    } else {
      this.setState({text: this.props.text, isOpen: true});
    }
  }

}

class Movie extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={TEST_DATA.title}
          leftItem={{
            icon: 'back',
            onPress: () => this.props.navigator.pop()
          }}
          rightItem={{
            title: '收藏'
          }}
          style={{ backgroundColor: '#8E5CD4' }}
        />
        <ScrollView>
          <Image
            source={TEST_DATA.bill}
            style={{ width: SCREEN_WIDTH, height:  Math.max(SCREEN_WIDTH * 210 / 420, 200) }}
          />
          <DescriptionCar text={TEST_DATA.description} />
          {this.renderMovieInfo()}
          {this.renderMovieBoxOffice()}
          <Gallery
            style={styles.Gallery}
            imgs={TEST_IMGS}
            navigator={this.props.navigator}
          />
          <View style={[styles.titleRow, {marginTop: 10}]}>
            <Text style={[moviesStyles.title2, {marginHorizontal: 10}]}>评论</Text>
            <View style={{flex: 1}} />
            <TouchableHighlight onPress={() => null} style={[moviesStyles.button, {backgroundColor: moviesColor.yellow}]}>
              <Text style={[moviesStyles.title2, {color: 'white'}]}>写评论</Text>
            </TouchableHighlight>
          </View>
          <CommentList movieTitle={TEST_DATA.title} comments={TEST_COMMENT} navigator={this.props.navigator}/>
          <View style={{borderBottomWidth: 1 / PixelRatio.get(), borderColor: moviesColor.line}} />
        </ScrollView>
      </View>
    );
  }

  renderMovieInfo() {
    let infoList = [];
    let infos = [
      {label: '上映时间', text: TEST_DATA.releaseTime},
      {label: '类型', text: TEST_DATA.type},
      {label: '地区', text: TEST_DATA.adress}
    ];
    infos.forEach((info, i) => {
      infoList.push(
        <View key={i} style={styles.infoListItem}>
          <View style={styles.infoListItemLabel}>
            <Text style={moviesStyles.title2}>{info.label}</Text>
          </View>
          <Text style={moviesStyles.content}>{info.text}</Text>
        </View>
      );
    });

    return (
      <View style={styles.movieInfo}>
        <View style={{flex: 1}}>
          {infoList}
        </View>
        <View>
          <View style={styles.movieGrade}>
            <Text style={moviesStyles.bigNumber}>{TEST_DATA.grade}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderMovieBoxOffice() {
    let infoList = [];
    let infos = [
      { title: '票房排名', text: TEST_DATA.rankingOffice},
      { title: '周末票房(万元)', text: TEST_DATA.wkOffice},
      { title: '累计票房(万元)', text: TEST_DATA.sumOffice}
    ];

    infos.forEach((info, i) => {
      infoList.push(
        <View style={styles.boxOfficeItem} key={i}>
          <Text style={[moviesStyles.bigNumber, {fontSize: 24}]}>{info.text}</Text>
          <Text style={moviesStyles.description}>{info.title}</Text>
        </View>
      );
    });

    return (
      <View style={styles.boxOffice}>
        <View style={styles.titleRow}>
          <Text style={[moviesStyles.title2, {marginHorizontal: 10}]}>票房</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {infoList}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: moviesColor.bgColor,
  },
  car: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    overflow: 'hidden',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: moviesColor.line
  },
  carBottom: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  infoListItem: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoListItemLabel: {
    height: 48,
    width: 60,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  movieInfo: {
    height: 144,
    flexDirection: 'row',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: moviesColor.line,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  movieGrade: {
    borderColor: moviesColor.line,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 53,
    width: 106,
    height: 106,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  boxOffice: {
    height: 173,
    backgroundColor: 'white',
    marginTop: 10
  },
  titleRow: {
    flexDirection: 'row',
    height: 48,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: moviesColor.line,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10
  },
  boxOfficeItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Gallery: {
    height: 176,
    borderColor: moviesColor.line,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    marginTop: 10
  }
});

module.exports = Movie;

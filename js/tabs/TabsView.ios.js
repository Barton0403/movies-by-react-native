'use strict';

import React, { Component } from 'react';
import {
  TabBarIOS
} from 'react-native';
import { connect } from 'react-redux';
import MoviesTab from './MoviesTab';
import UserTab from './UserTab';

class TabsView extends Component {

  constructor() {
    super();
    this.state = {
      tab: 'movie'
    };
  }

  render() {
    const { tab } = this.state;

    return (
      <TabBarIOS
        tintColor="#8e5cd4"
        unselectedTintColor="#989dbb"
        barTintColor="#f4f4f8">
        <TabBarIOS.Item
          title="电影"
          selected={tab === 'movie'}
          onPress={() => this.selectTab('movie')}
          icon={require('./imgs/movie-icon.png')}
          selectedIcon={require('./imgs/movie-icon-active.png')}>
          <MoviesTab navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="个人"
          selected={tab === 'user'}
          onPress={() => this.selectTab('user')}
          icon={require('./imgs/user-icon.png')}
          selectedIcon={require('./imgs/user-icon-active.png')}>
          <UserTab navigator={this.props.navigator} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

  selectTab(tab) {
    this.setState({tab});
  }

}

module.exports = connect()(TabsView);

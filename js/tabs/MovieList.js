'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  PixelRatio,
  TouchableHighlight
} from 'react-native';
import Parse from 'parse/react-native';
import moviesStyles from '../common/moviesStyles';
import Movie from '../scenes/Movie';

class MovieList extends Component {

  constructor() {
    super();
    this._renderRow = this._renderRow.bind(this);
    this._renderSearch = this._renderSearch.bind(this);
    this.state = {
      isLoading: true,
      movies: [],
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentDidMount() {
    let MovieParse = new Parse.Object.extend('Movie');
    new Parse.Query(MovieParse).find({
      success: list => {
        this.setState({ movies: list, isLoading: false });
      },
      error: error => console.error(error)
    });
  }

  render() {
    const { isLoading, ds, movies } = this.state;

    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.container}>
        <ListView
          style={{backgroundColor: '#e0e1ea'}}
          dataSource={ds.cloneWithRows(movies)}
          renderRow={this._renderRow}
          renderHeader={this.props.renderHeader}
          renderFooter={this._renderFooterLine}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          contentInset={{top: 0, bottom: 49}}
        />
      </View>
    );
  }

  _renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <Text style={{color: '#c1c4d6', marginLeft: 5}}>搜索</Text>
        </View>
      </View>
    );
  }

  _renderFooterLine() {
    return <View style={styles.intervalLine} />;
  }

  _renderRow(row, sID, rowID) {
    let rowRightStyles;

    // 顶部和底部特殊样式
    if (rowID === this.state.movies.length - 1 + '') {
      rowRightStyles = { borderBottomWidth: 0 };
    }

    // ISODate时间转换为Date对象
    let date = new Date(row.get('releaseDate'));

    return (
      <TouchableHighlight onPress={() => this.props.navigator.push({
        component: Movie
      })}>
        <View style={[styles.rowContainer]}>
          <Image
            source={{ uri: row.get('imgURL') }}
            style={[{width: 106, height: 122}, styles.img]}
          />
          <View style={[styles.rowRight,rowRightStyles]}>
            <Text style={[moviesStyles.title, { marginBottom: 0 }]}>{row.get('name')}</Text>
            <Text style={[moviesStyles.description, { flex: 1, marginVertical: 10 }]}>
              {row.get('description').substr(0, 70)}...
            </Text>
            <Text style={[moviesStyles.subtitle, { margin: 0  }]}>{`${date.getFullYear()}年${date.getMonth()}月`}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  searchContainer: {
    backgroundColor: '#e0e1ea',
    height: 40,
    padding: 5,
  },
  search: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    height: 142,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10
  },
  img: {
    marginRight: 10,
  },
  rowRight: {
    flex: 1,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#c1c4d6',
  },
  intervalLine: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#c1c4d6'
  },
});

module.exports = connect()(MovieList);

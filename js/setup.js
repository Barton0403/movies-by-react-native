'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
var Parse = require('parse/react-native');
const serverURL = 'http://localhost:1337';

function setup(): ReactClass<{}> {

  // // 初始化parse，使用parse/react-native SDK
  Parse.initialize('movies');
  Parse.serverURL = `${serverURL}/parse`;


  class Root extends Component {

    constructor() {
      super();
      this.state = {
        store: configureStore()
      };
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }

  }

  return Root;

}

module.exports = setup;

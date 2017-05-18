import { combineReducers } from 'redux';

function test(state = {test: 1}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

module.exports = combineReducers({test});

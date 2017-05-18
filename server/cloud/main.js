'use strict';
/* global Parse */

Parse.Cloud.define('hello', function(req, res) {
  res.success('hi');
});

'use strict';

import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import path from 'path';

const SERVER_PORT = process.env.PORT || 1337;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'movies';
const MASTER_KEY = process.env.MASTER_KEY || 'master';
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH;

const app = express();

// 加入ParseServer
app.use('/parse', new ParseServer({
  databaseURI: DATABASE_URI,
  cloud: path.resolve(__dirname, 'cloud/main.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
}));

// 开发模式启动ParseDashboard
if (IS_DEVELOPMENT) {
  let users;
  if (DASHBOARD_AUTH) {
    var [user, pass] = DASHBOARD_AUTH.split(':');
    users = [{user, pass}];
    console.log(users);
  }
  app.use(
    '/dashboard',
    ParseDashboard({
      apps: [{
        serverURL: '/parse',
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: 'movies',
      }],
      users,
    }, IS_DEVELOPMENT),
  );
}

// 测试server开启
app.get('/', function(req, res) {
  res.status(200).send('Server is start');
});

app.listen(SERVER_PORT, () => console.log(
  `Server is now running on http://localhost:${SERVER_PORT}`
));

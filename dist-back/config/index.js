'use strict';

var path = require('path');

const _ = require('lodash');

let config = {
  viewDir: path.join(__dirname, '..', 'views'),
  staticDir: path.join(__dirname, '..', '/assets')
};

{
  const prodConfig = {
    port: 3000,
    cache: 'memory',
    baseUrl: 'http://localhost/yii-php/basic/web/index.php'
  };
  config = _.extend(config, prodConfig);
}

module.exports = config;

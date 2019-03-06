const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
// const merge = require('webpack-merge');
const glob = require('glob');
const files = glob.sync('./src/web/views/**/*.entry.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let _entry = {};
let _plugins = [];
for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
    // 添加入口
    let key = RegExp.$1;
    _entry[key] = item;

    // 设置模板文件
    let [dist, template] = key.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `views/${dist}/pages/${template}.html`,
        template: `src/web/views/${dist}/pages/${template}.html`
      })
    );
  }
}

module.exports = {
  entry: _entry,
  output: {
    path: __dirname + '/dist/',
    filename: '[name].html'
  },
  plugins: [
    ..._plugins
  ]
}

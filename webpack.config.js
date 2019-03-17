const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require('webpack-merge');
const glob = require('glob');
const files = glob.sync('./src/web/views/**/*.entry.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlAfterWebpackPlugin = require('./config/HtmlAfterWebpackPlugin');
const { join } = require('path');

let _entry = {};
let _plugins = [];
for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
    // 添加入口
    let entryKey = RegExp.$1;
    _entry[entryKey] = item;

    // 设置模板文件
    let [dist, template] = entryKey.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`, // 相对于 output 中 path 的路径
        template: `src/web/views/${dist}/pages/${template}.html`, // 根据哪个模板输出，路径相当于 webpack.config.js 的路径
        inject: false,
        chunks: [entryKey]
      })
    );
  }
}

let webpackconfig = {
  entry: _entry,
  output: {
    path: join(__dirname, '/dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  // HtmlAfterWebpackPlugin 一定要在 html-webpack-plugin 之后执行，因为需要使用到 html-webpack-plugin 的生命周期
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css'
    }),
    ..._plugins,
    new HtmlAfterWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  }
};

module.exports = merge(webpackconfig, _mergeConfig);

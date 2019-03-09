const CopyPlugin = require('copy-webpack-plugin'); // 减少与html-plugin的冲突，copy文件
const { join } = require('path');
module.exports = {
  plugins: [
    new CopyPlugin([
      {
        from: join(__dirname, '../', 'src/web/views/common/layout.html'),
        to: '../views/common/layout.html' // 相对于 output 中 path 的路径
      }
    ]),
    new CopyPlugin(
      [
        {
          from: join(__dirname, '../', 'src/web/components'),
          to: '../components' // 相对于 output 中 path 的路径
        }
      ],
      {
        copyUnmodified: true, // 调试阶段如果模板没有变化，则不进行copy
        ignore: ['*.js', '*.css']
      }
    )
  ]
};

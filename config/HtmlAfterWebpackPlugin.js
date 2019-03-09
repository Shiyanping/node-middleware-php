/**
 * 在 html-webpack-plugin 之前对要输出的 html 进行操作
 * 在 html 的响应部位添加 js 和 css
 * 在 html-webpack-plugin 的生命周期上做文章
 */

const pluginName = 'HtmlAfterWebpackPlugin'; // 插件的名字
const assetsHelp = data => {
  let js = [];
  let css = [];
  const dir = {
    js: item => `<script class="layload-js" src="${item}"></script>`,
    css: item => `<link class="layload-css" rel="stylesheet" href="${item}"></link>`
  };
  for (let jsitem of data.js) {
    js.push(dir.js(jsitem));
  }
  for (let cssitem of data.css) {
    css.push(dir.css(cssitem));
  }
  return {
    js,
    css
  };
};

class HtmlAfterWebpackPlugin {
  /**
   * 每个 webpack 的 plugin 都有一个 apply 方法
   * @param compiler 表示 webpack 的实例
   */
  apply(compiler) {
    // hooks.run 会在 webpack 的运行阶段就执行
    // compiler.hooks.run.tap(pluginName, compilation => {
    //   console.log('webpack 构建过程开始！');
    // });

    /**
     * 何时拦截最后生成 html 模板
     * 如何找到 swig 文件对应的 js 和 css
     * 使用这个生命周期，一定要在 html-webpack-plugin 之后执行，因为是 html-webpack-plugin 的生命周期
     */
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
        // console.log(htmlPluginData);
        let _html = htmlPluginData.html;
        // console.log(_html);
        const result = assetsHelp(htmlPluginData.assets);
        _html = _html.replace(/pages:/g, '../../common/');
        _html = _html.replace(/components:/g, '../../../components/');
        _html = _html.replace('<!-- injectjs -->', result.js.join(''));
        _html = _html.replace('<!-- injectcss -->', result.css.join(''));
        htmlPluginData.html = _html;
      });
    });
  }
}

module.exports = HtmlAfterWebpackPlugin;

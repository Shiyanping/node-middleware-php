const Index = require('../models/Index');
const cheerio = require('cheerio');

class IndexController {
  constructor() {}
  actionIndex() {
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      // indexModel(); // 测试 500 报错

      const html = await ctx.render('books/pages/list', {
        data: result.data
      });
      // 将 pjax 代理的内容进行局部渲染，pjax 只代理了 id 为 app 的元素
      if (ctx.request.header["x-pjax"]) {
        // 切页
        const $ = cheerio.load(html);
        ctx.body = $('#js-hooks-data').html();
      } else {
        // 直接刷新页面
        ctx.body = html
      }
    };
  }
}

module.exports = IndexController;

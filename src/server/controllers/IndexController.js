const cheerio = require('cheerio');
import { route, GET } from 'awilix-koa';
@route('/index')
class IndexController {
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  @route('/index')
  @GET()
  async actionIndex(ctx, next) {
    const result = await this.indexService.getData();

    const html = await ctx.render('books/pages/list', {
      data: result.data
    });
    // 将 pjax 代理的内容进行局部渲染，pjax 只代理了 id 为 app 的元素
    if (ctx.request.header['x-pjax']) {
      // 切页
      const $ = cheerio.load(html);
      ctx.body = $('#js-hooks-data').html();
    } else {
      // 直接刷新页面
      ctx.body = html;
    }
  }
}

module.exports = IndexController;

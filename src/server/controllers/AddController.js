/**
 * @fileoverview 添加图书控制器
 * @author shiyanping@coohua.com
 */

const { URLSearchParams } = require('url');
const cheerio = require('cheerio');
import { route, GET } from 'awilix-koa';

/**
 * Add控制器 添加图书控制器
 * @class
 */
@route('/add')
class AddController {
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  /**
   * 返回添加图书页面的操作
   */
  @route('/')
  @GET()
  async actionAdd(ctx, next) {
    const html = await ctx.render('books/pages/add');

    if (ctx.request.header['x-pjax']) {
      const $ = cheerio.load(html);
      console.log(html);
      let _result = '';
      $('.pjaxcontent').each(function() {
        _result += $(this).html();
      });
      $('.layload-js').each(function() {
        _result += `<script src="${$(this).attr('src')}"></script>`;
      });
      // $('.layload-css').each(function() {
      //   _result += `<link rel="stylesheet" href="${$(this).attr('href')}"></link>`
      // });
      console.log(_result);
      // 切页
      ctx.body = _result;
    } else {
      // 直接刷新页面
      ctx.body = html;
    }
  }
  @route('/create')
  @GET()
  async actionCreate(ctx, next) {
    const params = new URLSearchParams();
    params.append('Book[name]', '测试1');
    params.append('Book[author]', '测试作者');
    params.append('Book[time]', '2019-09-09');
    params.append('Book[library_id]', 1);
    const result = await this.indexService.addBook({
      params
    });
    ctx.body = result;
  }
  /**
   * 测试数据
   * @return json
   */
  @route('/test')
  @GET
  async actionTest(ctx, next) {
    ctx.body = {
      code: 0,
      message: '测试成功'
    };
  }
}

module.exports = AddController;

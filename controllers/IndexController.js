const Index = require('../models/Index');

class IndexController {
  constructor() {

  }
  actionIndex() {
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      // indexModel(); // 测试 500 报错
      ctx.body = await ctx.render('index', {
        data: result.data
      });
    }
  }
}

module.exports = IndexController;
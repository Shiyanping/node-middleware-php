// 路由注册中心
const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const AddController = require('./AddController');
const indexController = new IndexController();
const addController = new AddController();
module.exports = app => {
  app.use(
    router(_ => {
      _.get('/', indexController.actionIndex());
      _.get('/add', addController.actionAdd());
      _.get('/create', addController.actionCreate());
      _.get('/test', addController.actionTest());
    })
  );
};

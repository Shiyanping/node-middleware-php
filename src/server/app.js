// 测试将import 编译成 commonjs的规范
// import koa from 'koa';
const Koa = require('koa');
const app = new Koa();
// 指定 koa 静态资源
const serve = require('koa-static');
// koa 模板
const render = require('koa-swig');
// 将 yield 按照 async 和 await 进行处理
const co = require('co');
const errorHandle = require('./middlewares/errorHandler');
// 错误日志
const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'logs/error.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
// 配置
const config = require('./config');
import { asClass, asValue, Lifetime, createContainer } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

// 重写 context 上的 render 方法，对应的就是 ctx.render
app.context.render = co.wrap(
  render({
    // ...your setting
    root: config.viewDir,
    autoescape: true,
    cache: config.cache, // disable, set to false
    ext: 'html',
    writeBody: false,
    varControls: ['[[', ']]']
  })
);

// 指定静态资源的目录
app.use(serve(config.staticDir));

// 容错机制
// errorHandle.error(app, logger);

// 首先创造一个容器
const container = createContainer();
// 将所有的 services 注入到容器里面去
container.loadModules([__dirname + '/service/*.js'], {
  formatName: 'camelCase',
  registerOptions: {
    lifetime: Lifetime.SCOPED
  }
});
app.use(scopePerRequest(container));

// 自动装载路由
app.use(loadControllers('./controllers/*.js'), {
  cwd: __dirname
});

app.listen(config.port, () => {
  console.log('服务启动成功');
});

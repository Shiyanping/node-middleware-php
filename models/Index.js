/**
 * @fileoverview 实现 Index 的数据模型
 * @author shiyanping@coohua.com
 */

const SafeRequest = require('../utils/request');

/**
 * Index类 获取后台关于图书相关的数据类
 * @class
 */

class Index {
  /**
   * @constructor
   * @param {Object} app Koa 的执行上下文
   */
  constructor(app) {}
  /**
   * 获取后台全部图书的数据方法
   * @example
   * return new Promise
   * getData()
   */
  getData() {
    const safeRequest = new SafeRequest('?r=book/index');
    return safeRequest.request();
  }
  /**
   * 把用户传入的书名全部加入到php接口中
   * @param {*} options 配置项
   * @example
   * return new Promise
   * addBook(options)
   */
  addBook(options) {
    const safeRequest = new SafeRequest('?r=book/create');
    return safeRequest.request({
      method: 'POST',
      params: options.params
    });
  }
}

module.exports = Index;

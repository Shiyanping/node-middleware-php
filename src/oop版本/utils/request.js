const fetch = require('node-fetch');
const config = require('../config');

class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseUrl = config.baseUrl;
  }
  request(options = { method: 'GET' }) {
    let getFetch;
    if (options.params) {
      getFetch = fetch(this.baseUrl + this.url, {
        method: options.method,
        body: options.params
      });
    } else {
      getFetch = fetch(this.baseUrl + this.url);
    }

    return new Promise((resolve, reject) => {
      let result = {
        code: 0,
        message: '',
        data: []
      };
      getFetch
        .then(res => res.json())
        .then(json => {
          console.log(json);
          result.data = json;
          resolve(result);
        })
        .catch(error => {
          result.code = 500;
          result.message = '和后端通讯异常';
          reject(result);
        });
    });
  }
}

module.exports = SafeRequest;

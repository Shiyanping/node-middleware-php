console.log('初始化完成');
fetch('/test')
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log('测试数据：', res);
  });

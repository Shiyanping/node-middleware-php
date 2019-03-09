import './add.css';
const add = {
  init() {
    // 组件对应的入口文件
    xtag.create(
      'x-add',
      class extends XTagElement {
        constructor() {
          super();
          console.log('初始化的操作');
          this.datas = {
            user: '石燕平'
          }
        }
        '::template(true)'() {
          return `<form>
          <div class="form-group">
            <label for="exampleInputEmail1">书名</label>
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="书名">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">作者</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="作者">
          </div>
          <button type="button" id="add-btn" class="btn btn-primary">提交</button>
        </form>`;
        }
        'click::event'(e) {
          if(e.target.id == 'add-btn') {
            console.log('发起请求');
          }
        }
      }
    );
  }
};
export default add;

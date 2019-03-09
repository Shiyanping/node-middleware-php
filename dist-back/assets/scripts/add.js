// var app6 = new Vue({
//   el: '#app-6',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

class Create {
  constructor() {
    this.btn = $('#js-btn');
  }
  fn() {
    this.btn.click(throttle(function() {
      console.log(1);
    }, 5000));
  }
}

// const s = new Create()
// s.fn();
export default Create;

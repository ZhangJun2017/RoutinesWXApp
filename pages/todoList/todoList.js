// pages/todoList/todoList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        "text": "待办",
        "pagePath": "pages/todoList/todoList",
        "iconPath": "/img/todoe.png",
        "selectedIconPath": "/img/todof.png"
      },
      {
        "text": "便笺",
        "pagePath": "pages/logs/logs",
        "iconPath": "/img/todoe.png",
        "selectedIconPath": "/img/todof.png"
      },
      {
        "text": "时记",
        "pagePath": "pages/index/index",
        "iconPath": "/img/todoe.png",
        "selectedIconPath": "/img/todof.png"
      }
    ],
    buttons: [{
      text: '取1消'
    }, {
      text: '确1认'
    }],
    todos: [{
      id: 1,
      content: '123',
      animB: '',
      animC: '',
      animD:'',
      selected: ''
    }, {
      id: 2,
      content: '1222223',
      animB: '',
      animC: '',
      animD:'',
      selected: ''
    }, {
      id: 3,
      content: '1嗯哼噶覆盖阿萨德挖了讨论收到货了说的话水电费23',
      animB: '',
      animC: '',
      animD:'',
      selected: ''
    }, ],
  },
  handleTodoClick(target) {
    this.startClickAnimB(target);
    this.startClickAnimC(target);
  },
  handleTodoClickOver(target) {
    this.endClickAnimB(target);
    this.endClickAnimC(target);
  },
  handleTodoOpClick(target) {
    this.startClickAnimD(target)
  },
  handleTodoOpClickOver(target) {
    this.endClickAnimD(target)
  },
  handleTodoOp(target) {
    switch (target.mark.op) {
      case 'done':
        wx.showToast({  
          title: '正在完成todo:'+target.mark.id+' : '+this.data.todos[target.mark.idx].content,
          icon: 'success',  
          duration: 1000  
        });
        break;
      case 'modify':
        wx.showToast({  
          title: '正在修改todo:'+target.mark.id+' : '+this.data.todos[target.mark.idx].content,
          icon: 'success',  
          duration: 1000  
        });
        break;
      case 'remove':
        wx.showToast({  
          title: '正在删除todo:'+target.mark.id+' : '+this.data.todos[target.mark.idx].content,
          icon: 'success',  
          duration: 1000  
        });
        break;
      default:
        break;
    }
  },
  startClickAnimA() {
    this.setData({
      animA: 'animA'
    })
  },
  endClickAnimA() {
    setTimeout(() => {
      this.setData({
        animA: ''
      })
    }, 200);
  },
  startClickAnimB(target) {
    this.setData({
      ['todos[' + target.mark.idx + '].animB']: 'animB'
    })
  },
  endClickAnimB(target) {
    setTimeout(() => {
      this.setData({
        ['todos[' + target.mark.idx + '].animB']: ''
      })
    }, 1000);
  },
  startClickAnimC(target) {
    this.setData({
      ['todos[' + target.mark.idx + '].animC']: 'animC',
      ['todos[' + target.mark.idx + '].selected']: 'selected'
    })
  },
  endClickAnimC(target) {
    setTimeout(() => {
      this.setData({
        ['todos[' + target.mark.idx + '].animC']: '',
        ['todos[' + target.mark.idx + '].selected']: ''
      })
    }, 100);
  },
  startClickAnimD(target) {
    this.setData({
      ['todos[' + target.mark.idx + '].animD']: target.mark.op
    })
  },
  endClickAnimD(target) {
    setTimeout(() => {
      this.setData({
        ['todos[' + target.mark.idx + '].animD']: '',
      })
    }, 50);
  },

  doAddTodo(id, content) {
    var todos = this.data.todos
    todos.push({
      id: id,
      content: content,
      animB: ''
    })
    this.setData({
      todos: todos
    })
  },
  addTodo() {
    wx.showModal({
      title: '提示',
      placeholderText: '请输入待办内容',
      content: '',
      editable: true,
      success(res) {
        if (res.confirm && res.content !== undefined && res.content.trim() !== "") {
          console.log(123)
          getCurrentPages()[0].doAddTodo(222, res.content)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
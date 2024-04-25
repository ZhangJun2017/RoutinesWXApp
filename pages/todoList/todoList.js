// pages/todoList/todoList.js
var util = require('../../utils/util.js')
var onTop = true;
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
      done:false
    }, {
      id: 2,
      content: '1222223',
      done:false
    }, {
      id: 3,
      content: '1嗯哼噶覆盖阿萨德挖了讨论收到货了说的话水电费23',
      done:false
    }, ],
    stats: [{
      animB: '',
      animC: '',
      animD: '',
      selected: ''
    }, {
      animB: '',
      animC: '',
      animD: '',
      selected: ''
    }, {
      animB: '',
      animC: '',
      animD: '',
      selected: ''
    }],
  },
  saveTodo() {
    util.saveTodos(this.data.todos)
  },
  loadTodo() {
    this.setData({
      todos: util.loadTodos()
    })
  },
  restart() {
    wx.exitMiniProgram()
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
    var that = this;
    switch (target.mark.op) {
      case 'done':
        wx.showModal({
          title: '这条已经做完了嘛？',
          content: that.data.todos[target.mark.idx].content,
          confirmText:'是的！',
          cancelText:'还没有',
          success (res) {
            if (res.confirm) {
              that.setData({
                ['todos[' + target.mark.idx + '].done']: true
              })
            }
          }
        })
        break;
      case 'modify':
        wx.showModal({
          title: '修改待办',
          content: that.data.todos[target.mark.idx].content,
          editable:true,
          placeholderText:that.data.todos[target.mark.idx].content,
          success (res) {
            if (res.confirm && res.content !== undefined && res.content.trim() !== "") {
              that.setData({
                ['todos[' + target.mark.idx + '].content']: res.content
              })
            }
          }
        })
        break;
      case 'remove':
        wx.showModal({
          title: '要删除这条待办吗？',
          content: that.data.todos[target.mark.idx].content,
          success (res) {
            if (res.confirm) {
              var todos = that.data.todos;
              todos.splice(target.mark.idx, 1)
              that.setData({
                todos: todos
              })
            }
          }
        })
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
      ['stats[' + target.mark.idx + '].animB']: 'animB'
    })
  },
  endClickAnimB(target) {
    setTimeout(() => {
      this.setData({
        ['stats[' + target.mark.idx + '].animB']: ''
      })
    }, 300);
  },
  startClickAnimC(target) {
    this.setData({
      ['stats[' + target.mark.idx + '].animC']: 'animC',
      ['stats[' + target.mark.idx + '].selected']: 'selected'
    })
  },
  endClickAnimC(target) {
    setTimeout(() => {
      this.setData({
        ['stats[' + target.mark.idx + '].animC']: '',
        ['stats[' + target.mark.idx + '].selected']: ''
      })
    }, 100);
  },
  startClickAnimD(target) {
    this.setData({
      ['stats[' + target.mark.idx + '].animD']: target.mark.op
    })
  },
  endClickAnimD(target) {
    setTimeout(() => {
      this.setData({
        ['stats[' + target.mark.idx + '].animD']: '',
      })
    }, 50);
  },

  doAddTodo(id, content) {
    var todos = this.data.todos
    var stats = this.data.stats
    todos.push({
      id: id,
      content: content,
      done:false
    })
    stats.push({
      animB: '',
      animC: '',
      animD: '',
      selected: ''
    })

    this.setData({
      todos: todos,
      stats: stats
    })
  },
  addTodo() {
    var that = this;
    wx.showModal({
      title: '提示',
      placeholderText: '请输入待办内容',
      content: '',
      editable: true,
      success(res) {
        if (res.confirm && res.content !== undefined && res.content.trim() !== "") {
          that.doAddTodo(222, res.content)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.loadTodo()
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

  },
  onPageScroll(obj){
    if(obj.scrollTop===0){
      onTop=true;
      wx.setNavigationBarColor({
        backgroundColor: '#fbf8ff',
        frontColor: '#000000',
        fail(res){
          console.log(res)
        },
        animation:{
          duration:300,
          timingFunc:'easeOut'
        }
      })
    }else if(onTop){
      onTop=false;
      wx.setNavigationBarColor({
        backgroundColor: '#F3EDF7',
        frontColor: '#000000',
        fail(res){
          console.log(res)
        },
        animation:{
          duration:300,
          timingFunc:'easeOut'
        }
      })
    }
  }
})
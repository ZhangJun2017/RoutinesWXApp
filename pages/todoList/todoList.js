// pages/todoList/todoList.js
var util = require('../../utils/util.js');
var onTop = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animEa: 'input',
    animEb: 'input',
    animEc: 'show',
    showTodoSheet: false,
    generateStatus: 'null',
    hfsheetContent: "",
    hfHeight: 240,
    generatedTodos: [{
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }, {
      "checked": true,
      "name": "测试功能",
      "value": 0
    }],
    selectedTodos: [],
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
        type: 'default',
        className: '',
        text: '智能识别',
        value: 0
      },
      {
        type: 'primary',
        className: '',
        text: '添加',
        value: 1
      }
    ],
    addButtons: [{
        type: 'default',
        className: '',
        text: '智能识别',
        value: 0
      },
      {
        type: 'primary',
        className: '',
        text: '添加',
        value: 1
      }
    ],
    successButtons: [{
        type: 'default',
        className: '',
        text: '返回',
        value: 2
      },
      {
        type: 'primary',
        className: '',
        text: '添加',
        value: 3
      }
    ],
    failedButtons: [{
      type: 'primary',
      className: '',
      text: '返回',
      value: 2
    }],
    todos: [{
      id: 1,
      content: '123',
      done: false
    }, {
      id: 2,
      content: '1222223',
      done: false
    }, {
      id: 3,
      content: '1嗯哼噶覆盖阿萨德挖了讨论收到货了说的话水电费23',
      done: false
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
    }]
  },
  bindinput(e) {
    this.setData({
      hfsheetContent: e.detail.value
    })
  },
  bindchange(e) {
    this.setData({
      selectedTodos: e.detail.value
    })
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
  hfopen() {
    this.setData({
      showTodoSheet: true
    })
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
          confirmText: '是的！',
          cancelText: '还没有',
          success(res) {
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
          editable: true,
          placeholderText: that.data.todos[target.mark.idx].content,
          success(res) {
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
          success(res) {
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
  test() {
    this.hfbtntap({
      detail: {
        index: 1
      }
    })
  },
  requestTodoGenerate(prompt) {
    var that = this
    wx.request({
      url: 'https://little.bushtit.cn/parse',
      data: {
        'msg': encodeURIComponent(this.data.hfsheetContent)
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data && Array.isArray(res.data.todo) && res.data.todo.length != 0 && res.data.todo[0] != 'error') {
            var gene = res.data.todo.map(function (item, index) {
              return {
                name: item,
                value: index,
                checked: true
              }
            })
            that.updateGenerateStatus('success', gene)
            return;
          }
          that.updateGenerateStatus('failed')
        }
      },
      fail(res) {
        that.updateGenerateStatus('failed')
      }
    })
  },
  updateGenerateStatus(to, ext) {
    switch (to) {
      case 'null': {
        this.setData({
          animEb: '',
          animEc: '',
          generatedTodos: [],
          selectedTodos: []
        })
        setTimeout(() => {
          this.setData({
            animEa: 'input'
          })
        }, 200);
        setTimeout(() => {
          this.setData({
            animEb: 'input',
            animEc: 'show',
            generateStatus: 'null',
            buttons: this.data.addButtons
          })
        }, 220);
      }
      break;
    case 'success': {
      this.setData({
        animEb: '',
        animEc: 'show',
        generatedTodos: ext,
        selectedTodos: 'all',
        buttons: this.data.successButtons,
        generateStatus: 'success'
      })
      setTimeout(() => {
        this.setData({
          animEa: 'result'
        })
      }, 200);
      setTimeout(() => {
        this.setData({
          animEb: 'result'
        })
      }, 220);
      break;
    }
    case 'failed': {
      this.setData({
        generateStatus: 'failed',
        buttons: this.data.failedButtons,
        animEc: 'show'
      })
      break;
    }
    case 'pending': {
      this.setData({
        animEb: '',
        animEc: '',
        generateStatus: 'pending'
      })
      setTimeout(() => {
        this.setData({
          animEa: 'loading'
        })
      }, 200);
      setTimeout(() => {
        this.setData({
          animEb: 'loading'
        })
      }, 220);
      break;
    }
    default: {}
    }
  },
  hfbtntap(e) {
    if (e.detail.item.value == 0) {
      this.updateGenerateStatus('pending')
      this.requestTodoGenerate(this.data.hfsheetContent)
    } else if (e.detail.item.value == 1) {
      this.doAddTodo(util.uuid(), this.data.hfsheetContent)
      this.hfclose()
    } else if (e.detail.item.value == 2) {
      this.updateGenerateStatus('null')
    } else if (e.detail.item.value == 3) {
      this.doAddTodos(this.data.generatedTodos, this.data.selectedTodos)
      this.hfclose()
    }
  },
  hfclose() {
    this.setData({
      showTodoSheet: false,
      hfsheetContent: '',
    })
    this.updateGenerateStatus('null')
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
    if (content !== undefined && content.trim() !== "") {
      var todos = this.data.todos
      var stats = this.data.stats
      todos.push({
        id: id,
        content: content,
        done: false
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
    }
  },

  doAddTodos(arr, selected) {
    var todos = this.data.todos
    var stats = this.data.stats
    if (selected === 'all') {
      arr.forEach((ele, idx, arr) => {
        todos.push({
          id: util.uuid(),
          content: ele.name,
          done: false
        })
        stats.push({
          animB: '',
          animC: '',
          animD: '',
          selected: ''
        })
      })
    } else {
      selected.forEach((ele, idx, arrr) => {
        todos.push({
          id: util.uuid(),
          content: arr[ele].name,
          done: false
        })
        stats.push({
          animB: '',
          animC: '',
          animD: '',
          selected: ''
        })
      })
    }
    this.setData({
      todos: todos,
      stats: stats
    })
  },
  addTodo() {
    setTimeout(() => {
      this.hfopen()
    }, 50);
  },
  addTodoOld() {
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
  }
})

// /**
//  * 生命周期函数--监听页面初次渲染完成
//  */
// onReady() {

// },

// /**
//  * 生命周期函数--监听页面显示
//  */
// onShow() {

// },

// /**
//  * 生命周期函数--监听页面隐藏
//  */
// onHide() {

// },

// /**
//  * 生命周期函数--监听页面卸载
//  */
// onUnload() {

// },

// /**
//  * 页面相关事件处理函数--监听用户下拉动作
//  */
// onPullDownRefresh() {

// },

// /**
//  * 页面上拉触底事件的处理函数
//  */
// onReachBottom() {

// },

// /**
//  * 用户点击右上角分享
//  */
// onShareAppMessage() {

// },
//   onPageScroll(obj) {
//     if (obj.scrollTop === 0) {
//       onTop = true;
//       wx.setNavigationBarColor({
//         backgroundColor: '#fbf8ff',
//         frontColor: '#000000',
//         fail(res) {
//           console.log(res)
//         },
//         animation: {
//           duration: 300,
//           timingFunc: 'easeOut'
//         }
//       })
//     } else if (onTop) {
//       onTop = false;
//       wx.setNavigationBarColor({
//         backgroundColor: '#F3EDF7',
//         frontColor: '#000000',
//         fail(res) {
//           console.log(res)
//         },
//         animation: {
//           duration: 300,
//           timingFunc: 'easeOut'
//         }
//       })
//     }
//   }
// })
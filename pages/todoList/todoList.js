// pages/todoList/todoList.js
var util = require('../../utils/util.js');
var onTop = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    debugTimeDialogShow: false,
    pickerTime: '01:01',
    pickerDate: '2023-04-06',
    isIOS: false,
    animEa: 'input',
    animEb: 'input',
    animEc: 'show',
    animF: false,
    animG: 'notappear',
    animGb: 'appearB',
    todoCounter: {
      'done': 0,
      'notdone': 0,
      'pending': 0
    },
    noteCounter: 0,
    shorten: 'shorten',
    currentTab: 'notdone',
    currentPage: 'null',
    textareaValue: '',
    hftitle: '',
    hftips: '',
    hftextareadisabled: false,
    which: '',
    inputing: false,
    showTodoSheet: false,
    generateStatus: 'null',
    hfsheetContent: "",
    generatedNote: '',
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
        "iconPath": "/img/notee.png",
        "selectedIconPath": "/img/notef.png"
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
    addNoteButtons: [{
        type: 'default',
        className: '',
        text: '智能润色',
        value: 7
      },
      {
        type: 'primary',
        className: '',
        text: '添加',
        value: 8
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
    successNoteButtons: [{
        type: 'default',
        className: '',
        text: '返回',
        value: 2
      },
      {
        type: 'primary',
        className: '',
        text: '添加',
        value: 9
      }
    ],
    modifyAndRemoveButtons: [{
        type: 'warn',
        className: '',
        text: '删除',
        value: 4
      },
      {
        type: 'primary',
        className: '',
        text: '保存',
        value: 5
      }
    ],
    modifyAndRemoveNoteButtons: [{
        type: 'warn',
        className: '',
        text: '删除',
        value: 10
      },
      {
        type: 'primary',
        className: '',
        text: '保存',
        value: 11
      }
    ],
    removeButtons: [{
        type: 'default',
        className: '',
        text: '取消',
        value: 6
      },
      {
        type: 'warn',
        className: 'warn-accent',
        text: '删除',
        value: 4
      },
    ],
    modifyButtons: [{
        type: 'default',
        className: '',
        text: '取消',
        value: 6
      },
      {
        type: 'primary',
        className: '',
        text: '保存',
        value: 5
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
      status: 'done'
    }, {
      id: 2,
      content: '1222223',
      status: 'notdone'
    }, {
      id: 3,
      content: '1嗯哼噶覆盖阿萨德挖了讨论收到货了说的话水电费23',
      status: 'pending'
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
    notes: [{
      id: 1,
      content: '123',
      time: 0,
      simpleTime: '',
      fullTime: ''
    }, {
      id: 2,
      content: '1222223',
      time: 0,
      simpleTime: '',
      fullTime: ''
    }, {
      id: 3,
      content: '1嗯哼噶覆盖阿萨德挖了讨论收到货了说的话水电费23',
      time: 0,
      simpleTime: '',
      fullTime: ''
    }],
    statsNote: [{
      animB: ''
    }, {
      animB: ''
    }, {
      animB: ''
    }]
  },
  bindfocus(e) {
    this.setData({
      inputing: true
    })
  },
  bindblur(e) {
    this.setData({
      inputing: false
    })
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
  saveNote() {
    util.saveNotes(this.data.notes)
  },
  loadTodo() {
    var todos = util.loadTodos()
    var stats = todos.map(() => {
      return {
        animB: '',
        animC: '',
        animD: '',
        selected: ''
      }
    })
    this.updateTodoArr(todos, stats)
  },
  loadNote() {
    var notes = util.loadNotes()
    var stats = notes.map(() => {
      return {
        animB: ''
      }
    })
    this.updateNoteArr(notes, stats)
  },
  restart() {
    wx.exitMiniProgram()
  },
  hfopen(type, which) {
    switch (type) {
      case 'new': {
        if (this.data.currentPage === 'todos') {
          this.setData({
            hftitle: '添加新待办',
            hftips: 'Tips: 试试输入一段话，让小程序为你生成待办清单',
            showTodoSheet: true,
            buttons: this.data.addButtons
          })
        } else {
          this.setData({
            hftitle: '添加新便笺',
            hftips: 'Tips: 试试输入一段草稿，由小程序帮你润色表达',
            showTodoSheet: true,
            buttons: this.data.addNoteButtons
          })
        }
        break;
      }
      case 'modifyAndRemove': {
        this.setData({
          hftitle: '修改待办',
          hftips: ' ',
          showTodoSheet: true,
          textareaValue: this.data.todos[which].content,
          buttons: this.data.modifyAndRemoveButtons,
          which: which
        })
        break;
      }
      case 'modifyAndRemoveNote': {
        this.setData({
          hftitle: '便笺',
          hftips: this.data.notes[which].fullTime,
          showTodoSheet: true,
          textareaValue: this.data.notes[which].content,
          buttons: this.data.modifyAndRemoveNoteButtons,
          which: which
        })
        break;
      }
      case 'modify': {
        this.setData({
          hftitle: '修改待办',
          hftips: ' ',
          showTodoSheet: true,
          textareaValue: this.data.todos[which].content,
          buttons: this.data.modifyButtons,
          which: which
        })
        break;
      }
      case 'remove': {
        this.setData({
          hftitle: '删除待办',
          hftips: '确实要删除这条待办事项吗？',
          hftextareadisabled: true,
          showTodoSheet: true,
          textareaValue: this.data.todos[which].content,
          buttons: this.data.removeButtons,
          which: which
        })
        break;
      }
      default: {
        break;
      }
    }
  },
  handleTabClick(target) {
    this.setData({
      animG: 'notappear',
    })
    setTimeout(() => {
      this.setData({
        currentTab: target.mark.tab,
        animG: 'appear'
      })
    }, 100);
  },
  handleTodoClick(target) {
    this.startClickAnimB(target, '');
    this.startClickAnimC(target);
  },
  handleTodoClickOver(target) {
    this.endClickAnimB(target, '');
    this.endClickAnimC(target);
  },
  handleNoteClick(target) {
    this.startClickAnimB(target, 'Note');
  },
  handleNoteClickOver(target) {
    this.endClickAnimB(target, 'Note');
  },
  handleNoteTap(target) {
    setTimeout(() => {
      this.hfopen("modifyAndRemoveNote", target.mark.idx)
    }, 50);
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
              var todos = that.data.todos;
              var todo = todos.splice(target.mark.idx, 1);
              todo[0].status = 'done'
              todos.push(todo[0]);
              that.updateTodoArr(todos)
            }
          }
        })
        break;
      case 'pend':
        var todos = that.data.todos;
        var todo = todos.splice(target.mark.idx, 1);
        todo[0].status = 'pending'
        todos.push(todo[0]);
        that.updateTodoArr(todos)
        break;
      case 'unpend':
      case 'undone':
        var todos = that.data.todos;
        var todo = todos.splice(target.mark.idx, 1);
        todo[0].status = 'notdone'
        todos.push(todo[0]);
        that.updateTodoArr(todos)
        break;
      case 'modify':
        // wx.showModal({
        //   title: '修改待办',
        //   content: that.data.todos[target.mark.idx].content,
        //   editable: true,
        //   placeholderText: that.data.todos[target.mark.idx].content,
        //   success(res) {
        //     if (res.confirm && res.content !== undefined && res.content.trim() !== "") {
        //       that.setData({
        //         ['todos[' + target.mark.idx + '].content']: res.content
        //       })
        //     }
        //   }
        // })
        this.hfopen('modify', target.mark.idx)
        break;
      case 'remove':
        // wx.showModal({
        //   title: '要删除这条待办吗？',
        //   content: that.data.todos[target.mark.idx].content,
        //   success(res) {
        //     if (res.confirm) {
        //       var todos = that.data.todos;
        //       todos.splice(target.mark.idx, 1)
        //       that.setData({
        //         todos: todos
        //       })
        //     }
        //   }
        // })
        this.hfopen('remove', target.mark.idx)
        break;
      case 'modifyAndRemove': {
        this.hfopen('modifyAndRemove', target.mark.idx)
        break;
      }
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
        }
        that.updateGenerateStatus('failed')
      },
      fail(res) {
        that.updateGenerateStatus('failed')
      }
    })
  },
  requestNoteGenerate(prompt) {
    var that = this
    wx.request({
      url: 'https://little.bushtit.cn/parseNote',
      data: {
        'msg': encodeURIComponent(prompt)
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data && res.data.result && res.data.result != 'error') {
            var geneNote = res.data.result
            that.updateGenerateStatus('successNote', geneNote)
            return;
          }
        }
        that.updateGenerateStatus('failed')
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
          selectedTodos: [],
          generatedNote: ''
        })
        setTimeout(() => {
          this.setData({
            animEa: 'input'
          })
        }, 200);
        if (this.data.currentPage === 'todos') {
          setTimeout(() => {
            this.setData({
              animEb: 'input',
              animEc: 'show',
              generateStatus: 'null',
              buttons: this.data.addButtons
            })
          }, 220);
        } else {
          setTimeout(() => {
            this.setData({
              animEb: 'input',
              animEc: 'show',
              generateStatus: 'null',
              buttons: this.data.addNoteButtons
            })
          }, 220);
        }
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
    case 'successNote': {
      this.setData({
        animEb: '',
        animEc: 'show',
        generatedNote: ext,
        hftips: ' ',
        buttons: this.data.successNoteButtons,
        generateStatus: 'successNote'
      })
      setTimeout(() => {
        this.setData({
          animEa: 'resultNote'
        })
      }, 200);
      setTimeout(() => {
        this.setData({
          animEb: 'resultNote'
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
    } else if (e.detail.item.value == 4) {
      var todos = this.data.todos;
      todos.splice(this.data.which, 1)
      this.updateTodoArr(todos)
      this.hfclose()
    } else if (e.detail.item.value == 5) {
      if (this.data.hfsheetContent !== undefined && this.data.hfsheetContent.trim() !== "") {
        var todos = this.data.todos;
        todos[this.data.which].content = this.data.hfsheetContent;
        this.updateTodoArr(todos)
      }
      this.hfclose()
    } else if (e.detail.item.value == 6) {
      this.hfclose()
    } else if (e.detail.item.value == 7) {
      this.updateGenerateStatus('pending')
      this.requestNoteGenerate(this.data.hfsheetContent)
    } else if (e.detail.item.value == 8) {
      this.doAddNote(util.uuid(), this.data.hfsheetContent)
      this.hfclose()
    } else if (e.detail.item.value == 9) {
      this.doAddNote(util.uuid(), this.data.generatedNote)
      this.hfclose()
    } else if (e.detail.item.value == 10) {
      var notes = this.data.notes;
      notes.splice(this.data.which, 1)
      this.updateNoteArr(notes)
      this.hfclose()
    } else if (e.detail.item.value == 11) {
      var time = Date.now();
      if (this.data.hfsheetContent !== undefined && this.data.hfsheetContent.trim() !== "") {
        var notes = this.data.notes;
        notes[this.data.which].content = this.data.hfsheetContent;
        notes[this.data.which].time = time;
        notes[this.data.which].simpleTime = this.formatTime(time);
        notes[this.data.which].fullTime = this.formatTimeFull(time);
        this.updateNoteArr(notes)
      }
      this.hfclose()
    }
  },
  hfclose() {
    this.setData({
      showTodoSheet: false,
      hfsheetContent: '',
      textareaValue: '',
      hftextareadisabled: false
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
  startClickAnimB(target, what) {
    this.setData({
      ['stats' + what + '[' + target.mark.idx + '].animB']: 'animB'
    })
  },
  endClickAnimB(target, what) {
    setTimeout(() => {
      this.setData({
        ['stats' + what + '[' + target.mark.idx + '].animB']: ''
      })
    }, 300);
  },
  startClickAnimC(target) {
    if (this.data.stats[target.mark.idx].selected === '') {
      this.setData({
        ['stats[' + target.mark.idx + '].animC']: 'animC-once',
        ['stats[' + target.mark.idx + '].selected']: 'selected-once'
      })
    } else {
      this.setData({
        ['stats[' + target.mark.idx + '].animC']: 'animC',
        ['stats[' + target.mark.idx + '].selected']: 'selected'
      })
    }
  },
  endClickAnimC(target) {
    setTimeout(() => {
      this.setData({
        ['stats[' + target.mark.idx + '].animC']: '',
        ['stats[' + target.mark.idx + '].selected']: ''
      })
    }, 1000);
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
        status: 'notdone'
      })
      stats.push({
        animB: '',
        animC: '',
        animD: '',
        selected: ''
      })
      this.updateTodoArr(todos, stats)
    }
  },
  doAddNote(id, content) {
    var time = Date.now();
    if (content !== undefined && content.trim() !== "") {
      var notes = this.data.notes
      var statsNote = this.data.statsNote
      notes.push({
        id: id,
        content: content,
        time: time,
        simpleTime: this.formatTime(time),
        fullTime: this.formatTimeFull(time)
      })
      statsNote.push({
        animB: ''
      })
      this.updateNoteArr(notes, statsNote)
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
          status: 'notdone'
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
          status: 'notdone'
        })
        stats.push({
          animB: '',
          animC: '',
          animD: '',
          selected: ''
        })
      })
    }
    this.updateTodoArr(todos, stats)
  },
  addTodo() {
    setTimeout(() => {
      this.hfopen('new')
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
  switchPages(to) {
    this.setData({
      animGb: 'notappearB'
    })
    setTimeout(() => {
      this.setData({
        currentPage: to
      })
    }, 100);
    setTimeout(() => {
      this.setData({
        animGb: 'appearB'
      })
    }, 120);
  },
  updateTodoArr(todos, stats) {
    this.setData({
      animG: 'notappear'
    })
    setTimeout(() => {
      if (arguments.length == 1) {
        this.setData({
          todos: todos,
          todoCounter: {
            'done': todos.filter(item => item.status == 'done').length,
            'notdone': todos.filter(item => item.status == 'notdone').length,
            'pending': todos.filter(item => item.status == 'pending').length
          },
          animG: 'appear'
        })
      } else {
        this.setData({
          todos: todos,
          stats: stats,
          todoCounter: {
            'done': todos.filter(item => item.status == 'done').length,
            'notdone': todos.filter(item => item.status == 'notdone').length,
            'pending': todos.filter(item => item.status == 'pending').length
          },
          animG: 'appear'
        })
      }
    }, 100);
  },
  updateNoteArr(notes, stats) {
    this.setData({
      animGb: 'notappear'
    })
    setTimeout(() => {
      if (arguments.length == 1) {
        this.setData({
          notes: notes,
          noteCounter: notes.length,
          animGb: 'appear'
        })
      } else {
        this.setData({
          notes: notes,
          statsNote: stats,
          noteCounter: notes.length,
          animGb: 'appear'
        })
      }
    }, 100);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onReady(options) {

  },
  onLoad(e) {
    this.setData({
      isIOS: wx.getDeviceInfo().system.includes('iOS') ? true : false
    })
    this.loadTodo()
    this.loadNote()
    setTimeout(() => {
      this.switchPages('todos')
    }, 750);
  },
  onPageScroll(obj) {
    if (obj.scrollTop === 0) {
      onTop = true;
      wx.setNavigationBarColor({
        backgroundColor: '#fbf8ff',
        frontColor: '#000000',
        fail(res) {
          console.log(res)
        },
        animation: {
          duration: 300,
          timingFunc: 'easeOut'
        }
      })
      this.setData({
        animF: false
      })
    } else if (onTop) {
      onTop = false;
      wx.setNavigationBarColor({
        backgroundColor: '#F3EDF7',
        frontColor: '#000000',
        fail(res) {
          console.log(res)
        },
        animation: {
          duration: 300,
          timingFunc: 'easeOut'
        }
      })
      this.setData({
        animF: true
      })
    }
  },
  onHide() {
    this.saveTodo();
    this.saveNote();
  },
  onUnload() {
    this.saveTodo();
    this.saveNote();
  },
  tabChange(e) {
    switch (e.detail.index) {
      case 0: {
        this.switchPages('todos')
        break
      }
      case 1: {
        this.switchPages('notes')
        break
      }
      case 2: {
        break;
      }
      default:
        break;
    }
  },
  timeDebug(e) {
    if (e.target.id === 'tt') this.setData({
      pickerTime: e.detail.value
    })
    if (e.target.id === 'dd') this.setData({
      pickerDate: e.detail.value
    })
    var time = this.convertToDatestamp(this.data.pickerDate + ' ' + this.data.pickerTime);
    var notes = this.data.notes;
    notes[this.data.which].time = time;
    notes[this.data.which].simpleTime = this.formatTime(time);
    notes[this.data.which].fullTime = this.formatTimeFull(time);
    this.updateNoteArr(notes)
  },
  convertToDatestamp(dateString) {
    // 验证日期字符串格式  
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!regex.test(dateString)) {
      throw new Error('Invalid date string format. Expected format: yyyy-MM-dd hh:mm');
    }

    // 解析日期字符串  
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('-');
    const timeParts = parts[1].split(':');

    // 创建Date对象  
    const date = new Date(
      parseInt(dateParts[0], 10), // 年份  
      parseInt(dateParts[1], 10) - 1, // 月份（注意JavaScript中月份是从0开始的）  
      parseInt(dateParts[2], 10), // 日  
      parseInt(timeParts[0], 10), // 小时  
      parseInt(timeParts[1], 10), // 分钟  
      0, // 秒  
      0 // 毫秒  
    );

    // 返回时间戳（毫秒）  
    return date.getTime();
  },
  formatTime(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);

    // Function to pad single digit with leading zero
    const pad = num => (num < 10 ? '0' : '') + num;

    // Check if the date is today
    if (now.toDateString() === targetDate.toDateString()) {
      return `${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())}`;
    }

    // Check if the date is within this week
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDayOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + 6 * oneDay);

    if (targetDate >= firstDayOfWeek && targetDate <= lastDayOfWeek) {
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return `${weekdays[targetDate.getDay()]} ${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())}`;
    }

    // Check if the date is within this year
    if (now.getFullYear() === targetDate.getFullYear()) {
      return `${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())} ${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())}`;
    }

    // Otherwise, return the full date
    return `${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())}`;
  },
  formatTimeFull(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  debug() {
    var that = this
    wx.showActionSheet({
      itemList: ['立即保存当前待办+便签', '载入初始化数据', '修改便笺时间'],
      success(res) {
        switch (res.tapIndex) {
          case 0:
            that.saveTodo();
            that.saveNote();
            break;
          case 1:
            wx.showModal({
              title: '调试菜单',
              content: '载入初始数据会立即覆盖所有数据并且无法恢复，你确定吗？',
              complete: (res) => {
                if (res.confirm) {
                  util.saveTodos(JSON.parse(decodeURIComponent('%5B%7B%22id%22%3A%22d204df39-fa92-4a18-8f37-7273e76740e3%22%2C%22content%22%3A%22%E2%9C%A8%20%E4%B9%9F%E5%8F%AF%E4%BB%A5%E8%AF%95%E8%AF%95%E2%80%9C%E6%99%BA%E8%83%BD%E8%AF%86%E5%88%AB%E2%80%9D%E5%8A%9F%E8%83%BD%20%EF%BC%8C%E5%AE%83%E5%80%9F%E5%8A%A9AI%E6%9D%A5%E7%90%86%E8%A7%A3%E4%BD%A0%EF%BC%8C%E5%B9%B6%E4%B8%94%E4%B8%BA%E4%BD%A0%E7%94%9F%E6%88%90%E5%BE%85%E5%8A%9E%E5%88%97%E8%A1%A8%E3%80%82%22%2C%22status%22%3A%22notdone%22%7D%2C%7B%22id%22%3A%22554a1e6f-c784-4f44-899b-58d3c4ea3bfd%22%2C%22content%22%3A%22%F0%9F%93%8C%20%E4%BD%A0%E5%8F%AF%E4%BB%A5%E5%9C%A8%E6%B7%BB%E5%8A%A0%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9%E5%90%8E%EF%BC%8C%E5%8F%8C%E5%87%BB%E8%BF%9B%E8%A1%8C%E6%A0%87%E8%AE%B0%E6%88%96%E8%80%85%E4%BF%AE%E6%94%B9%E3%80%82%22%2C%22status%22%3A%22notdone%22%7D%2C%7B%22id%22%3A%22fa7b3431-a213-42bd-ad03-e7c512959e5b%22%2C%22content%22%3A%22%F0%9F%92%BC%20%E6%97%A5%E8%A1%8C%E6%98%AF%E4%B8%80%E6%AC%BE%E8%83%BD%E5%A4%9F%E5%B8%AE%E5%8A%A9%E4%BD%A0%E8%BF%9B%E8%A1%8C%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9%E8%AE%B0%E5%BD%95%E4%B8%8E%E7%AE%A1%E7%90%86%E7%9A%84%E5%B0%8F%E7%A8%8B%E5%BA%8F%22%2C%22status%22%3A%22notdone%22%7D%2C%7B%22id%22%3A%22337cad9f-79b8-4d7b-8b0d-195d7dbefc37%22%2C%22content%22%3A%22%F0%9F%8E%89%20%E6%AC%A2%E8%BF%8E%E4%BD%BF%E7%94%A8%E6%97%A5%E8%A1%8C%20Routines%EF%BC%81%22%2C%22status%22%3A%22notdone%22%7D%5D')))
                  util.saveNotes(JSON.parse(decodeURIComponent('%5B%7B%22id%22%3A%22a32e2863-eb7a-444b-89b6-5f4bf71f080b%22%2C%22content%22%3A%22%F0%9F%9A%80%20%E8%AF%B7%E5%B0%BD%E6%83%85%E4%BD%BF%E7%94%A8%E5%90%A7%EF%BC%81%22%2C%22time%22%3A1715008554095%2C%22simpleTime%22%3A%2223%3A15%22%2C%22fullTime%22%3A%222024-05-06%2023%3A15%3A54%22%7D%2C%7B%22id%22%3A%22d39026a8-c03a-4a29-863d-28d16b0a39cd%22%2C%22content%22%3A%22%F0%9F%93%85%20%E5%9C%A8%E6%9C%AA%E6%9D%A5%EF%BC%8C%E6%88%91%E4%BB%AC%E8%BF%98%E5%B0%86%E6%B7%BB%E5%8A%A0%E5%A6%82%E7%9B%AE%E6%A0%87%E6%8F%90%E9%86%92%20%F0%9F%8E%AF%EF%BC%8C%E8%BF%9B%E5%BA%A6%E8%BF%BD%E8%B8%AA%20%F0%9F%93%8A%EF%BC%8C%E6%97%B6%E9%97%B4%E5%9D%97%E8%AE%B0%E5%BD%95%E7%AD%89%E5%8A%9F%E8%83%BD%20%E2%8F%B0%EF%BC%8C%E5%B8%8C%E6%9C%9B%E5%B0%BD%E5%8F%AF%E8%83%BD%E6%9B%B4%E5%A5%BD%E5%9C%B0%E5%B8%AE%E5%8A%A9%E4%BD%A0%E8%A7%84%E5%88%92%E4%BD%A0%E7%9A%84%E6%97%B6%E9%97%B4%E3%80%82%5Cn%5Cn%22%2C%22time%22%3A1715008616162%2C%22simpleTime%22%3A%2223%3A16%22%2C%22fullTime%22%3A%222024-05-06%2023%3A16%3A56%22%7D%2C%7B%22id%22%3A%22da59ca09-8d02-412c-bba6-e266f77751e9%22%2C%22content%22%3A%22%F0%9F%8C%9F%20%E6%88%91%E4%BB%AC%E8%AE%BE%E8%AE%A1%E4%BA%86%E6%B5%81%E7%95%85%E9%AB%98%E6%95%88%E7%9A%84%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2%E4%B8%8E%E4%BA%A4%E4%BA%92%E6%96%B9%E5%BC%8F%E3%80%82%22%2C%22time%22%3A1715008623963%2C%22simpleTime%22%3A%2223%3A17%22%2C%22fullTime%22%3A%222024-05-06%2023%3A17%3A03%22%7D%2C%7B%22id%22%3A%22c21b5489-c816-4124-8ed6-0817d7f0338e%22%2C%22content%22%3A%22%F0%9F%97%92%20%E6%97%A5%E8%A1%8C%E8%BF%98%E9%99%84%E5%B8%A6%E4%BA%86%E4%B8%80%E4%B8%AA%E4%BE%BF%E7%AC%BA%E5%8A%9F%E8%83%BD%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%90%8C%E6%A0%B7%E6%94%AF%E6%8C%81%E5%9F%BA%E4%BA%8EAI%E7%9A%84%E6%96%87%E6%9C%AC%E8%AF%86%E5%88%AB%E5%92%8C%E6%B6%A6%E8%89%B2%E3%80%82%22%2C%22time%22%3A1715008629628%2C%22simpleTime%22%3A%2223%3A17%22%2C%22fullTime%22%3A%222024-05-06%2023%3A17%3A09%22%7D%5D')))
                  that.loadTodo();
                  that.loadNote();
                }
              }
            })
            break;
          case 2:
            that.hfclose()
            setTimeout(() => {
              that.setData({
                debugTimeDialogShow: true,
                pickerDate: that.data.notes[that.data.which].fullTime.substring(0, 10),
                pickerTime: that.data.notes[that.data.which].fullTime.substring(11, 16)
              })
            }, 0);
            break;
          default:
            break;
        }
      }
    })
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

// })
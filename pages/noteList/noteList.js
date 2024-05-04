// pages/noteList/noteList.js
var util = require('../../utils/util.js');
var onTop = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    animEa: 'input',
    animEb: 'input',
    animEc: 'show',
    animF: false,
    animG: 'notappear',
    animHa:'-1',
    animHb:'1',
    noteCounter: {
      'done': 0,
      'notdone': 0
    },
    'pending': 0,
    shorten: 'shorten',
    currentTab: 'notdone',
    textareaValue: '',
    hftitle: '',
    hftips: '',
    hftextareadisabled: false,
    which: '',
    inputing: false,
    showNoteSheet: false,
    generateStatus: 'null',
    hfsheetContent: "",
    generatedNotes: [{
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
    selectedNotes: [],
    list: [{
        "text": "待办",
        "pagePath": "pages/todoList/todoList",
        "iconPath": "/img/todoe.png",
        "selectedIconPath": "/img/todof.png"
      },
      {
        "text": "便笺",
        "pagePath": "pages/noteList/noteList",
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
    notes: [{
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
      selectedNotes: e.detail.value
    })
  },
  saveNote() {
    util.saveData(this.data.notes, 'notes')
  },
  loadNote() {
    var notes = util.loadData('notes')
    var stats = notes.map(() => {
      return {
        animB: '',
        animC: '',
        animD: '',
        selected: ''
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
        this.setData({
          hftitle: '添加新待办',
          hftips: 'Tips: 试试输入一段话，让小程序为你生成待办清单',
          showNoteSheet: true,
          buttons: this.data.addButtons
        })
        break;
      }
      case 'modifyAndRemove': {
        this.setData({
          hftitle: '修改待办',
          hftips: ' ',
          showNoteSheet: true,
          textareaValue: this.data.notes[which].content,
          buttons: this.data.modifyAndRemoveButtons,
          which: which
        })
        break;
      }
      case 'modify': {
        this.setData({
          hftitle: '修改待办',
          hftips: ' ',
          showNoteSheet: true,
          textareaValue: this.data.notes[which].content,
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
          showNoteSheet: true,
          textareaValue: this.data.notes[which].content,
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
  handleNoteClick(target) {
    this.startClickAnimB(target);
    this.startClickAnimC(target);
  },
  handleNoteClickOver(target) {
    this.endClickAnimB(target);
    this.endClickAnimC(target);
  },
  handleNoteOpClick(target) {
    this.startClickAnimD(target)
  },
  handleNoteOpClickOver(target) {
    this.endClickAnimD(target)
  },
  handleNoteOp(target) {
    var that = this;
    switch (target.mark.op) {
      case 'done':
        wx.showModal({
          title: '这条已经做完了嘛？',
          content: that.data.notes[target.mark.idx].content,
          confirmText: '是的！',
          cancelText: '还没有',
          success(res) {
            if (res.confirm) {
              var notes = that.data.notes;
              var note = notes.splice(target.mark.idx, 1);
              note[0].status = 'done'
              notes.push(note[0]);
              that.updateNoteArr(notes)
            }
          }
        })
        break;
      case 'pend':
        var notes = that.data.notes;
        var note = notes.splice(target.mark.idx, 1);
        note[0].status = 'pending'
        notes.push(note[0]);
        that.updateNoteArr(notes)
        break;
      case 'unpend':
      case 'undone':
        var notes = that.data.notes;
        var note = notes.splice(target.mark.idx, 1);
        note[0].status = 'notdone'
        notes.push(note[0]);
        that.updateNoteArr(notes)
        break;
      case 'modify':
        // wx.showModal({
        //   title: '修改待办',
        //   content: that.data.notes[target.mark.idx].content,
        //   editable: true,
        //   placeholderText: that.data.notes[target.mark.idx].content,
        //   success(res) {
        //     if (res.confirm && res.content !== undefined && res.content.trim() !== "") {
        //       that.setData({
        //         ['notes[' + target.mark.idx + '].content']: res.content
        //       })
        //     }
        //   }
        // })
        this.hfopen('modify', target.mark.idx)
        break;
      case 'remove':
        // wx.showModal({
        //   title: '要删除这条待办吗？',
        //   content: that.data.notes[target.mark.idx].content,
        //   success(res) {
        //     if (res.confirm) {
        //       var notes = that.data.notes;
        //       notes.splice(target.mark.idx, 1)
        //       that.setData({
        //         notes: notes
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
  requestNoteGenerate(prompt) {
    var that = this
    wx.request({
      url: 'https://little.bushtit.cn/parse',
      data: {
        'msg': encodeURIComponent(this.data.hfsheetContent)
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data && Array.isArray(res.data.note) && res.data.note.length != 0 && res.data.note[0] != 'error') {
            var gene = res.data.note.map(function (item, index) {
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
  updateGenerateStatus(to, ext) {
    switch (to) {
      case 'null': {
        this.setData({
          animEb: '',
          animEc: '',
          generatedNotes: [],
          selectedNotes: []
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
        generatedNotes: ext,
        selectedNotes: 'all',
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
      this.requestNoteGenerate(this.data.hfsheetContent)
    } else if (e.detail.item.value == 1) {
      this.doAddNote(util.uuid(), this.data.hfsheetContent)
      this.hfclose()
    } else if (e.detail.item.value == 2) {
      this.updateGenerateStatus('null')
    } else if (e.detail.item.value == 3) {
      this.doAddNotes(this.data.generatedNotes, this.data.selectedNotes)
      this.hfclose()
    } else if (e.detail.item.value == 4) {
      var notes = this.data.notes;
      notes.splice(this.data.which, 1)
      this.updateNoteArr(notes)
      this.hfclose()
    } else if (e.detail.item.value == 5) {
      if (this.data.hfsheetContent !== undefined && this.data.hfsheetContent.trim() !== "") {
        var notes = this.data.notes;
        notes[this.data.which].content = this.data.hfsheetContent;
        this.updateNoteArr(notes)
      }
      this.hfclose()
    } else if (e.detail.item.value == 6) {
      this.hfclose()
    }
  },
  hfclose() {
    this.setData({
      showNoteSheet: false,
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

  playAnimH(from){
    this.setData({animHa:from,animHb:1})
  },

  doAddNote(id, content) {
    if (content !== undefined && content.trim() !== "") {
      var notes = this.data.notes
      var stats = this.data.stats
      notes.push({
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
      this.updateNoteArr(notes, stats)
    }
  },

  doAddNotes(arr, selected) {
    var notes = this.data.notes
    var stats = this.data.stats
    if (selected === 'all') {
      arr.forEach((ele, idx, arr) => {
        notes.push({
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
        notes.push({
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
    this.updateNoteArr(notes, stats)
  },
  addNote() {
    setTimeout(() => {
      this.hfopen('new')
    }, 50);
  },
  addNoteOld() {
    var that = this;
    wx.showModal({
      title: '提示',
      placeholderText: '请输入待办内容',
      content: '',
      editable: true,
      success(res) {
        if (res.confirm && res.content !== undefined && res.content.trim() !== "") {
          that.doAddNote(222, res.content)
        }
      }
    })
  },
  updateNoteArr(notes, stats) {
    this.setData({
      animG: 'notappear'
    })
    setTimeout(() => {
      if (arguments.length == 1) {
        this.setData({
          notes: notes,
          noteCounter: {
            'done': notes.filter(item => item.status == 'done').length,
            'notdone': notes.filter(item => item.status == 'notdone').length,
            'pending': notes.filter(item => item.status == 'pending').length
          },
          animG: 'appear'
        })
      } else {
        this.setData({
          notes: notes,
          stats: stats,
          noteCounter: {
            'done': notes.filter(item => item.status == 'done').length,
            'notdone': notes.filter(item => item.status == 'notdone').length,
            'pending': notes.filter(item => item.status == 'pending').length
          },
          animG: 'appear'
        })
      }
    }, 100);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.loadNote()
    this.playAnimH(e.from?e.from:'-1')
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
    this.saveNote();
    // this.setData({
    //   current: 0
    // })
  },
  onShow() {
  },
  onUnload() {
    this.saveNote();
  },
  tabChange(e) {
    //  this.setData({current:0}) 
    wx.switchTab({
      url: '/' + e.detail.item.pagePath + '?from=1',
    })
    console.log(e)
  },
  onSwitchTab(e) {
    this.playAnimH(e.from)
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
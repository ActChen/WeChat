const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaireArray: null,

    hiddenmodalput: true,

    //题目描述
    num1:1,       //当前页面第一题
    num2:2,       //当前页面第二题

    //正式变量
    page:1,  //当前页数
    total:0,     //总页数
    disabledp:true,
    disabledt:true,
    index:0,     //题目数组下标

    //存储问卷1分数
    greadCount:[""],

    //控制下一页和提交按钮交叉显示
    isButton: false,
    code: null,

    phone: null,
    name: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var question = app.globalData.questionTwo
    //计算总页数
    this.setData({
      questionnaireArray: question,
      total: (question.length/2).toFixed(0)
    });
    this.disable();
    
    //结果数组初始化
    for(var i=0; i<question.length; i++){
      this.data.greadCount[i] = -1;
    }
  },

  /**
   * 控制上线翻页是否可用
   */
  disable: function () {
    if (this.data.page < this.data.total) {
      this.setData({
        isButton:false,
        disabledt:false
      });
    } else {
      this.setData({
        isButton:true
      });
    }

    if (this.data.page > 1) {
      this.setData({
        disabledp:false
      });
    } else {
      this.setData({
        disabledp:true
      });
    }
  },

  /**
   * 向上翻页事件
   */
  prevPage: function () {
    this.setData({
      index: this.data.index - 2,
      num1: this.data.num1 - 2,
      page: this.data.page - 1
    })
    if ((this.data.num2 - 2) > 0) {
      this.setData({
        num2: this.data.num2 - 2
      })
    }
    this.disable()
  },

  /**
   * 向下翻页事件
   */
  nextPage: function () {
    //如果此页有题没有选则不能翻页
    if(this.data.greadCount[this.data.num1-1] == -1 || this.data.greadCount[this.data.num2-1] == -1){
      wx.showToast({
        title: '此页面未答完',
        icon: 'none',
        duration: 1500
      })
    } else {
      this.setData({
        index: this.data.index + 2,
        num1: this.data.num1 + 2,
        page: this.data.page + 1
      })
      console.log(this.data.num2)
      console.log(this.data.questionnaireArray.length)
      if ((this.data.num2 + 2) <= this.data.questionnaireArray.length) {
        this.setData({
          num2: this.data.num2 + 2
        })
      }
      this.disable()
    }
  },

  /**
   * 提交
   */
  submit: function(){
    wx.request({
      url: 'http://172.20.10.10:8080/get/conclusion',
      // url: 'http://127.0.0.1:8080/get/conclusion',
      data: {
        "userId":app.globalData.openId,
        "question":this.data.questionnaireArray,
        "greadCount":this.data.greadCount,
        "tableNum":2
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        var result = res.data
        wx.showModal({
          title: '结论',
          content: res.data,
          success: function(res) {
            if (res.confirm) {
              if(result == "压力性尿失禁"){
                //若为压力性尿失禁则跳转表三
                wx.navigateTo({
                  url: '../diagnose/tableOfThree'
                })
              }else if (result == "混合性尿失禁"){
                wx.navigateTo({
                  url: '../diagnose/tableOfThreeAndFour',
                })
              } else {
                wx.navigateTo({
                  url: '../diagnose/tableOfFour',
                })
              }
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  /**
   * 问卷选择事务
   */
  radioChange: function (e) {
    //题号
    var id = e.currentTarget.id
    //存储分数
    this.data.greadCount[id-1]=parseInt(e.detail.value)
    //遍历options，将已选选项的isSelect状态改为已选择
    var arr = this.data.questionnaireArray
    for(var i=0; i<arr[id-1].content.options.length; i++) {
      console.log(arr[id-1].content.options)
       if (arr[id-1].content.options[i].gread == this.data.greadCount[id-1]){
        arr[id-1].content.options[i].isSelected = true
       } else {
        arr[id-1].content.options[i].isSelected = false
       }
       this.setData({
        questionnaireArray: arr
      })
       
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
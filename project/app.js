//客户端测试环境
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this
        wx.request({
          url: 'http://172.20.10.10:8080/getId/unionId',
          // url: 'http://127.0.0.1:8080/getId/unionId',
          data: {
            "code": res.code
          },
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          success: function (res) {
            that.globalData.openId = res.data
            console.log(res.data)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //获取问卷，分为5个问卷，四张问卷表，表1、表2、表3、表4、表3+表4
    var th = this;
    wx.request({
      url: 'http://172.20.10.10:8080/get/questionnaire',
      // url: 'http://127.0.0.1:8080/get/questionnaire',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        let questions = res.data;
        for(var i = 0; i < questions.length; i++){
          var num = questions[i].num;
          var questionnaire = questions[i].questionnaire;
          switch(num){
            case 1: th.globalData.questionOne = questionnaire; break;
            case 2: th.globalData.questionTwo = questionnaire; break;
            case 3: th.globalData.questionThree = questionnaire; break;
            case 4: th.globalData.questionFour = questionnaire; break;
            case 5: th.globalData.questionFive = questionnaire; break;
          } 
        }
        console.log(res.data)
      }
    })
    
  },
  globalData: {
    userInfo: null,
    openId: null,   //用户唯一性Id
    questionOne: null, //问卷1
    questionTwo: null, //问卷2
    questionThree: null, //问卷3
    questionFour: null, //问卷4
    questionFive: null //问卷五
  }
})
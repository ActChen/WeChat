//homePage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    //姓名电话
    name:null,
    phone:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },

  jump: function(){

    wx.request({
      url: 'http://172.20.10.10:8080/save/user',
      // url: 'http://127.0.0.1:8080/save/user',
      data: {
        "userId":app.globalData.openId,
        "name":this.data.name,
        "phone":this.data.phone
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        if(res.statusCode == 200){
           wx.navigateTo({
             url: '../diagnose/questionOfOne'
           })
        } else{
          wx.showToast({
            title: '用户信息保存错误，请联系管理员',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },

  //点击开始评测触发事件
  bt_1: function(){

    //跟新问卷
    this.update()

    var hidden = this.data.hiddenmodalput
    //先查询数据库里是否有此用户信息，根据userId去查
    var that = this;
    console.log(app.globalData.openId)
    wx.request({
      url: 'http://172.20.10.10:8080/is/user',
      // url: 'http://127.0.0.1:8080/is/user',
      data: {
        "userId":app.globalData.openId
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if(res.data){
          that.setData({
            hiddenmodalput: !hidden
          })
        }else{
          wx.redirectTo({
            url: '../diagnose/questionOfOne'
          })
        }
      }
    })
  },

    /**
   * 取消
   */
  cancel: function(){
    var hidden = this.data.hiddenmodalput
    this.setData({
      hiddenmodalput: !hidden 
    })
  },

  /**
   * 提交
   */
  confirm: function(){

    //正则手机号码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if(!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号或姓名',
        icon: 'none',
        duration: 1500
      })
    } else {
      var hidden = this.data.hiddenmodalput
      this.jump()
      this.setData({
        hiddenmodalput: !hidden 
      })
    }
  },

  getPhone: function(e){
    this.data.phone = e.detail.value
  },

  getName: function(e){
    this.data.name = e.detail.value
  },

  bt_2: function(){
    wx.redirectTo({
      url: 'viewTestData'
    })
  },

  update: function(){
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
            case 1: app.globalData.questionOne = questionnaire; break;
            case 2: app.globalData.questionTwo = questionnaire; break;
            case 3: app.globalData.questionThree = questionnaire; break;
            case 4: app.globalData.questionFour = questionnaire; break;
            case 5: app.globalData.questionFive = questionnaire; break;
          } 
        }
      }
    })
  }

})
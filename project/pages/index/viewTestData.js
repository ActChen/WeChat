const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    video: true
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
    var that = this
    wx.request({
      url: 'http://172.20.10.10:8080/get/history',
      // url: 'http://127.0.0.1:8080/get/history',
      data: {
        "userId":app.globalData.openId
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          listData: res.data
        })
      }
    })
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

  click: function(e) {
    var data = e.currentTarget.dataset.text
    wx.showModal({
      title: '诊断结论',
      content: data,
      success: function(res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  clickAdvise: function(e){
    var model = JSON.stringify(e.currentTarget.dataset.text)
    wx.redirectTo({
      url: '../index/advise?model=' + model
    })
  },
})
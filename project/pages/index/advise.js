Page({

  /**
   * 页面的初始数据
   */
  data: {
    json: null,
    text:true,
    pendiji:true,
    pangguangji:true,
    shenghuo:true,
    video:true,
    videoSrc:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonData = JSON.parse(options.model)
    this.setData({
      json: jsonData
    })
    var advise = this.data.json
    console.log(advise)
    if(advise != null && advise.text !=null) {
      this.setData({
        text: false
      })
      if(advise.button1 != null){
        this.setData({
          pendiji: false
        })
      }
      if(advise.button2 != null){
        this.setData({
          shenghuo: false
        })
      }
      if(advise.button3 != null){
        this.setData({
          pangguangji: false
        })
      }
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
    
  },

  //点击盆底肌锻炼视频按钮
  pendijiClick: function(){
    this.setData({
      videoSrc: this.data.json.button1.content,
      video: false
    })
  },

  //点击膀胱肌功能训练视频按钮
  pangguangjiClick: function(){
    this.setData({
      videoSrc: this.data.json.button3.content,
      video: false
    })
  },

  shenghuoClick: function(){
    var data = this.data.json.button2.content
    wx.showModal({
      title: '生活调摄建议',
      content: data,
      success: function(res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  click: function(){
    this.setData({
      video: true
    })
  },

  previewImage: function (e){
    var current = e.target.dataset.src;   //这里获取到的是一张本地的图片
    wx.previewImage({
      current: current,//需要预览的图片链接列表
      urls: [current]  //当前显示图片的链接
    })
  },

})
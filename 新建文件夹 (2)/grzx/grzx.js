let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //关于我们
  binviewguan:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  wddk:function(){
    wx.navigateTo({
      url: 'calorie',
    })
  },
  //设置
  binviewshe:function(){
    wx.navigateTo({
      url: 'settings',
    })
  },
  //发现
  binviewfa:function(){
    wx.navigateTo({
      url: '../found/found',
    })
  },
  //跳转我的钱包
  binviewbao:function(){
    wx.navigateTo({
      url: '../wdqb/wdqb',
    })
  },
  //跳转充值记录
  binviewjl:function(){
    wx.navigateTo({
      url: '../grzx/record',
    })
  },
  //个人信息
  binviewhraer:function(){
    wx.navigateTo({
      url: '../grzx/information',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    // var userInfo = wx.getStorageSync('userInfo');
    // this.setData({
    //   money: userInfo.totalOverage,
    //   userNick: userInfo.userNick,
    //   uid: userInfo.id,
    //   userPortrait: userInfo.userPortrait
    // })
    wx.request({
      url: app.globalData.URL +'/user/info',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: token
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200){
          this.setData({
            money: res.data.result.totalOverage,
            userNick: res.data.result.userNick,
            uid: res.data.result.id,
            userPortrait: res.data.result.userPortrait
          })
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
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
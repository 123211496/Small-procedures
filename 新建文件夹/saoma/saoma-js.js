let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //关闭返回首页
  binviweguan: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token=wx.getStorageSync('token')
    var deviceId = options.gmtr;
    var jiequ = deviceId.split("|");
    var deviceid= jiequ[0];
    var id = jiequ[1];
    var time=jiequ[2];
    var order=jiequ[3];
    var orderId=jiequ[4]
    wx.request({
      url: app.globalData.URL +'/scavenging/nonoccupyingfee',
      data:{
        token:token,
        deviceid: deviceid,
        time: time,
        id:id,
        orderId: orderId
      },
      success:res=>{
        console.log(res)
       if(res.data.code==200){
        this.setData({
         chargingCost: res.data.result.chargingCost,
         chargingTime: res.data.result.chargingTime,
         accountBalance: res.data.result.accountBalance,
         daysRemaining: res.data.result.daysRemaining,
         freeH: res.data.result.freeH,
         freeM: res.data.result.freeM
        })
       }
      }
    })
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
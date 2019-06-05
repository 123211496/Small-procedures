// pages/yuek/yuek.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // currentItemId:'1',
    maxHour: '30',
    maxCost: '30',
    price: '',
    cardid: '22',
    cardType: '',
    currentItemId: '22',
  },
  //选择购买类型
  clickcolor: function(event) {
    let that = this
    //免费充电小时
    // that.setData({
    //   maxHour: event.currentTarget.dataset.maxhour
    // })
    //消费金额
    // that.setData({
    //   maxCost: event.currentTarget.dataset.maxcost
    // })
    //把data-id放入currentItemId
    this.setData({
      currentItemId: event.currentTarget.dataset.id
    })
    //和确认支付关联价格
    var index = event.currentTarget.dataset.price;
    that.setData({
      price: index
    })
    //获取ID参数到支付
    var id = event.currentTarget.dataset.id;
    that.setData({
      cardid: id
    })
  },
  //点击支付
  button: function(e) {
    var id = e.currentTarget.dataset.clickid;
    var token = wx.getStorageSync('token')
    wx.request({
        url: app.globalData.URL + '/monorder/createorder',
        data: {
          token: token,
          chargeCard: id
        },
        success: res => {
          if (res.data.code == 200) {
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 4000,
              success: res => {
                wx.navigateBack({
                  url: '../wdqb/wdqb'
                })
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '余额不足',
              confirmText: '去充值',
              success: res => {
                if (res.confirm) {
                  wx.navigateBack({
                    url: '../wdqb/wdqb-cz',
                  })
                }
              }
            })
          }
        }
    })
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  let that = this;
  //查询购买类型
  var token = wx.getStorageSync('token')
  wx.request({
    url: app.globalData.URL + '/chargecard/sel',
    data: {
      token: token
    },
    success: res => {
      console.log(res)
      if (res.data.code == 200) {

        that.setData({
          items: res.data.result
        })
      }
    }
  })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})
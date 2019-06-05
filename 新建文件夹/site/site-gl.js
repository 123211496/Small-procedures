let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showcdxx: true,
    showcdxy: true,
  },
  button: function() {
    wx.navigateTo({
      url: 'site-tj',
    })
  },
  changeFn(e) {
    console.log(e)
  },
  //默认地址
  changeFn: function(event) {
    console.log(event)
    console.log(event.detail.value)
    let that = this;
    let token = wx.getStorageSync('token')
    let id = event.detail.value;
    wx.request({
      url: app.globalData.URL + '/address/set',
      data: {
        token: token,
        id: id
      },
      success: res => {
        console.log(res);
      }
    })
  },






  //点击删除
  delList: function(event) {
    let that = this;
    //删除
    //let dataset=event.target.dataset;
    // var index=dataset.index;
    // this.data.items.splice(index,1);
    // this.setData({
    //   items:this.data.items
    // })
    let id = event.currentTarget.dataset.id;
    let token = wx.getStorageSync('token')
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: res => {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/address/del',
            data: {
              token: token,
              id: id
            },
            success: res => {
              this.onLoad();
              console.log(res)
              let dataset = event.target.dataset;
              var index = dataset.index;
              this.data.items.splice(index, 1);
              this.setData({
                items: this.data.items
              })
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
    var that = this;
    let token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL + '/address/sel',
      method: "get",
      data: {
        token: token
      },
      header: {
        "Content-Type": "applicatiSon/x-www-form-urlencoded"
      },
      success: res => {
        if (res.data.result.length == 0) {
          that.setData({
            reple: false,
            reply: true
          })
        } else if (res.data.result.length !== 0) {
          that.setData({
            reple: true,
            reply: false
          })
        }
        if (res.data.code == 200) {
          that.setData({
            items: res.data.result
          })
        }
      }
    })
  },
  binviewmo: function() {

  },
  binviewshan: function() {

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
    this.onLoad()
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
    wx.stopPullDownRefresh()
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
// pages/city/city-list.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  getCode:function(e){
    console.log(e)
    var token=wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL +'/SysAddress/find',
      data:{
        token:token,
        name: e.detail.value
      },
      success:res=>{
        console.log(res)
        if(res.data.code==200){
          this.setData({
            itemb:res.data.result
          })
        }
      }
    })
  },
  binviename:function(e){
    console.log(e)
    var name = e.currentTarget.dataset.name;
    var token=wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL +'/SysAddress/searchaddr',
      data:{
        token:token,
        name:name
      },
      success:res=>{
        if (res.data.code == 200) {
          console.log(res)
          var lat = res.data.result.lat
          var lng = res.data.result.lng
          wx.showModal({
            title: '提示',
            content: '是否切换页面',
            success: res => {
              wx.setStorageSync('citys', { lat: lat, lng: lng });
              wx.navigateTo({
                url: "../index/index",
              })
            },
            fail: function () {
            }
          })
        }
      }
    })
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
  
  }
})
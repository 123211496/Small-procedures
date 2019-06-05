// pages/facility/navigation.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
let app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'',
    latitude:'',
    lat:'',
    lng:"",
    markers:[{}]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var demo = new QQMapWX({
      key: 'GKRBZ-ZWIC6-KWZSC-MDOPG-VTYK2-K2F55'
    });

    var that = this
    let _ordinate = wx.getStorageSync('ordinate');
    let lat=_ordinate.lat;
    let lng=_ordinate.lng;
    console.log(lat)
    console.log(lng)
    wx.openLocation({
      latitude: (Number(lat)),
      longitude: (Number(lng)),
      scale: 18,
      // name: '华乾大厦',
      // address: '金平区长平路93号'
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          longitude: longitude,
          latitude: latitude
        })
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            console.log(res)
            that.setData({
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,              
            })
            // wx.setStorageSync('ordinate', '')
          }
        })
      },
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
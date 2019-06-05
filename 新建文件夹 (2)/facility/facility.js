// pages/facility/facility.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  //预约
  woyaoyuyue:function(){
    wx.showToast({
      title: '功能正在开发中',
      duration:3000,
      icon:"none"
    })
  },
//点击导航
  binvietymap:function(e){
    console.log(e)
    var lat = e.target.dataset.lat;
    var lng = e.target.dataset.log;
    wx.setStorageSync('ordinate', { lat: lat, lng: lng });
    wx.openLocation({
      latitude: (Number(lat)),
      longitude: (Number(lng)),
      scale: 18,
      // name: '华乾大厦',
      // address: '金平区长平路93号'
    })
    // wx.navigateTo({
    //   url: "navigation",
    // })
    // wx.openLocation({
    //   latitude: (Number(lat)),
    //   longitude: (Number(lng)),
    //   scale: 18,
    //   name: '华乾大厦',
    //   address: '金平区长平路93号'
    // })
  },
  //点击我要充电
  binviewdian:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var deviceNumber = e.currentTarget.dataset.name
    console.log(id)
    var token=wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL + '/device/comdevstanum',
      data: {
        deviceid: id,
        token: token,
      },
      success: res => {
        console.log(res)
        if (res.data.result.billingManner == 'tim') {
          wx.navigateTo({
            url: "../ports/ports-hour?deviceId=" + id + "|" + deviceNumber,
          })
        } else if (res.data.result.billingManner == 'pow'){
          wx.navigateTo({
            url: '../ports/ports?deviceId=' + id + "|" + deviceNumber,
          })
        } else if (res.data.result.billingManner == 'ele'){
          wx.navigateTo({
            url: '../ports/ports-degree?deviceId=' + id + "|" + deviceNumber,
          })
        }
      }
    })
  },
  submit:function(){

  },
  // tymap:function(){
  //   wx.openLocation(function(){
  //     longitude: longitude,
  //      latitude:latitude,
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var demo = new QQMapWX({
      key: 'GKRBZ-ZWIC6-KWZSC-MDOPG-VTYK2-K2F55'
    });
    //获取首页传来的经纬度、设备ID
    var str = options.deviceId;
    console.log(str)
    var _str=str.split("|")
    var id=_str[0];
    var log=_str[1];
    var lat=_str[2];
    var deviceNumber=_str[3]
    this.setData({
      deviceid:id,
      lng:log,
      lat:lat,
      deviceNumber:deviceNumber,
    })
    var token=wx.getStorageSync('token')
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude, //纬度 
          longitude: longitude, //经度 
        })
        wx.request({
          url: app.globalData.URL + '/device/querydevice',
          data: {
            token: token,
            id: id,
            longitude: longitude,
            latitude:latitude
          },
          success: res => {
            that.setData({
              deviceName: res.data.result.deviceName,
              communityName: res.data.result.communityName,
              distance: res.data.result.distance
            })
          }
        })
        //设备状态
        wx.request({
          url: app.globalData.URL+'/device/comdevstanum',
          data:{
            deviceid:id,
            token: token,
          },
          success:res=>{
            that.setData({
              state_fau: res.data.result.faultNo,
              state_yes: res.data.result.freeNo,
              state_no: res.data.result.chargeNo
            })
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
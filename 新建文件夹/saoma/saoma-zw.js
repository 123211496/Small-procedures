var util = require('../../utils/util.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
 
  //结束充电
  binviejies:function(e){
    console.log(e)
    var that = this;
    var order = e.currentTarget.dataset.order;
    var deviceid = e.currentTarget.dataset.name;
    var portid = e.currentTarget.dataset.id;
    var time = e.currentTarget.dataset.time;
    var deviceNumber = e.currentTarget.dataset.device;
    console.log(deviceNumber)
    console.log(order)
    console.log(deviceid)
    console.log(portid)
    console.log(time)
    var token = wx.getStorageSync('token');
    wx.scanCode({
      success: (res) => {
        console.log(res)
        //扫码结算   00
        wx.request({
          url: app.globalData.URL + '/scavenging/endCharge',
          data: {
            token: token,
            deviceId: deviceid,
            portId: portid
          },
          success: res => {
            console.log(res)
            if (res.data.code == 200) {
              //结算
              wx.request({
                url: app.globalData.URL + '/scavenging/stopScanOrder',
                data: {
                  token: token,
                  deviceid: deviceNumber,
                  portid: portid
                },
                success: res => {
                  console.log(res)
                  if (res.data.code == 200) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000,
                    })
                    wx.navigateTo({
                      url: 'saoma-js-list?scaven=' + deviceid + "|" + portid + "|" + time + "|" + order,
                    })
                  }
                },
                fail: res => {
                  wx.showToast({
                    title: '订单异常',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          },
          fail: res => {
            wx.showToast({
              title: '订单异常',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    var str = options.gmtr; 
    var _str=str.split("|");
    var deviceid=_str[0];
    var portid=_str[1];
    var time=_str[2];
    var deviceNumber=_str[3]
    console.log(deviceNumber)
    that.setData({
      deviceid: deviceid,
      portid: portid,
      time: time,
      deviceNumber: deviceNumber
    })
    var token=wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL +'/scavenging/occffe',
      data:{
        token:token,
        hour: time,
        deviceid: deviceid,
        port: portid
      },
      success:res=>{
        console.log(res)
        if(res.data.code==200){
          that.setData({
            balance: res.data.result.balance,
            chargingCost: res.data.result.chargingCost,
            chargeTime: res.data.result.chargeTime ,
            occupyingfee: res.data.result.occupyingfee,
            orderid: res.data.result.orderId
          })
        }else{
          console.log('请求失败')
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
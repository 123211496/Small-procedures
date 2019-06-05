//logs.js
// const util = require('../../utils/util.js')
var app = getApp()
// pages/libs/accredit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // getPhoneNumber: function (e) {
  //   console.log(e)
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //登陆
    let that=this
    wx.login({
      success:function (res) {
        console.log(res)
         if (res.code) {
          wx.request({
            url: app.globalData.URL +'/login/wxlogin',
            method: "get",
            data: {
              code: res.code,
              appId: 'wx78d66dc4f4bb7afc'
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
              if(res.data.code==200){
                var token = res.data.result.token;
                var openid = res.data.result.openid;
                //保存token
                wx.setStorageSync('token', token);
                //保存openid
                wx.setStorageSync('openid', openid);
              }else{
                wx.showModal({
                  title: '提示',
                  content: '请求服务器失败',
                })
              }
            },
            fail:function(){
              wx.showModal({
                title: '提示',
                content: '授权失败',
              })
            }
          })
         } else {
           console.log("登陆失败！" + res.errMsg)
        }
      }
    });

    //授权登陆 
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              //获取用户信息
              var userInfo=wx.getStorageSync('userInfo');
              //获取openid
              var token = wx.getStorageSync('token')
              
              // wx.switchTab({
              //   url: '../index/index',
              // })
            }
          })
        };
      },
      fail: function () {
      }
    })
  },
  getUserInfo:function(e){
    var userInfo = e.detail.userInfo
    //保存用户信息
    wx.setStorageSync('userInfo', userInfo);
    var that=this
    if (e.detail.userInfo){
      var token = wx.getStorageSync('token');
      wx.request({
        url: app.globalData.URL + '/user/updateInfo',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "get",
        data: {
          userPortrait: userInfo.avatarUrl,
          userNick: userInfo.nickName,
          sex: userInfo.gender,
          token: token
        },
        success: function (res) {
          console.log(res)
        }
      })
      wx.request({
        url: app.globalData.URL +'/user/setauthorization',
        data: {
          token: token
        },
        success: res => {
          console.log(res)
          if(res.data.code==200){
            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: 'login',
      })
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

  }
})

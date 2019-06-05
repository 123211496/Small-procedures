// pages/index/index-list.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  showports:function(){
    let token=wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL +'/user/userScavAuth',
      data:{
        token:token
      },
      success:res=>{
        console.log(res)
        if(res.data.code==200){
          //扫码授权
          wx.scanCode({
            // onlyFromCamera: false,
            scanType: 'qrCode',
            success: res => {
              var result = res.result;
              console.log(result)
              // //扫码授权
              wx.request({
                url: app.globalData.URL + '/user/userScavAuth',
                data: {
                  token: token
                },
                success: res => {
                  console.log(res)
                }
              })
              wx.request({
                url: app.globalData.URL + '/device/judge',
                data: {
                  token: token,
                  pile_code: result
                },
                success: function (res) {
                  console.log(res)
                  if (res.data.code == 200) {
                    var deviceId = res.data.result.deviceId
                    if (res.data.result.billingManner == 'tim') {
                      wx.navigateTo({
                        url: "../ports/ports-hour?deviceId=" + deviceId + "|" + result,
                      })
                    } else if (res.data.result.billingManner == 'pow') {
                      wx.navigateTo({
                        url: '../ports/ports?deviceId=' + deviceId + "|" + result,
                      })
                    } else if (res.data.result.billingManner == 'ele') {
                      wx.navigateTo({
                        url: '../ports/ports-degree?deviceId=' + deviceId + "|" + result,
                      })
                    }
                  }
                }
              })
            }
          })
          // wx.scanCode({
          //   success: (res) => {
          //     var result = res.result;
          //     wx.request({
          //       url: app.globalData.URL + '/device/judge',
          //       data: {
          //         token: token,
          //         pile_code: result
          //       },
          //       success: function (res) {
          //         console.log(res)
          //         if (res.data.code == 200) {
          //           var deviceId = res.data.result.deviceId
          //           if (res.data.result.billingManner == 'tim') {
          //             wx.navigateTo({
          //               url: "../ports/ports-hour?deviceId=" + deviceId + "|" + result,
          //             })
          //           } else if (res.data.result.billingManner == 'pow') {
          //             wx.navigateTo({
          //               url: '../ports/ports?deviceId=' + deviceId + "|" + result,
          //             })
          //           } else if (res.data.result.billingManner == 'ele') {
          //             wx.navigateTo({
          //               url: '../ports/ports-degree？deviceId=' + deviceId + "|" + result,
          //             })
          //           }
          //         }
          //       }
          //     })
          //   }
          // })
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
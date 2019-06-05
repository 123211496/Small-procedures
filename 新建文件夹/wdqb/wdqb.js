// pages/wdqb/wdqb.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rety:true,
    retys:false
  },
  //充值
  binviechong:function(){
    wx.navigateTo({
      url: 'wdqb-cz',
    })
  },
  //钱包明细
  binvieming:function(){
    wx.navigateTo({
      url: 'detail',
    })
  },
  //月卡
  binvieyue:function(){
    wx.navigateTo({
      url: '../yuek/yuek-xun',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var token = wx.getStorageSync('token')
    //查询余额，赠送、充值
    wx.request({
      url: app.globalData.URL + '/user/info',
      data: {
        token: token
      },
      success: res => {
        console.log(res)
        that.setData({
          handselOverage: res.data.result.handselOverage,
          rechargeOverage: res.data.result.rechargeOverage,
          totalOverage: res.data.result.totalOverage,
        })
      }
    })
    //查询是否有月卡
    wx.request({
      url: app.globalData.URL +'/userchargecard/selusercard',
      data:{
        token: token
      },
      success:res=>{
        // console.log(res)
        if(res.data.code==200){
          wx.request({
            url: app.globalData.URL + '/userchargecard/Sur',
            data: {
              token: token
            },
            success: res => {
              console.log(res)
              if (res.data.code == 200) {
                  if(res.data.result.isHave=="Y"){
                    that.setData({
                      time: res.data.result.monthlyCard.freeChargingTime,
                      min: res.data.result.monthlyCard.freeToMin,
                      ption: res.data.result.monthlyCard.comption,
                      day: res.data.result.monthlyCard.day
                    })
                  } else if (res.data.result.isHave == "N"){
                    that.setData({
                      rety: false,
                      retys: true
                    })
                  }
              }
            }
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
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',  
    deviceid:'',
    // id:'',
    second:'00',
    minute:'00',
    hour:'00',
    Loadingtime:'',

  },
  record:function(){
    wx.navigateTo({
      url: '../grzx/record',
    })
  },
  //结束充电
  binviewjie:function(e){
    wx.showModal({
      title: '提示',
      content: '此充电桩设置有车位占位费，您可以点击 “我知道了“后跳转的页面，扫码结束并离开车位，结束扣费。',
      success: function (res) {
        if (res.confirm) {
          //设备号
          let deviceNumber = e.currentTarget.dataset.device;
          //设备ID
          let deviceid = e.currentTarget.dataset.id;
          let time = e.currentTarget.dataset.time;
          //端口ID
          let portid = e.currentTarget.dataset.name;
          //订单ID
          let order = e.currentTarget.dataset.order;
          var token = wx.getStorageSync('token');
          //判断有误占位费
          wx.request({
            url: app.globalData.URL + '/scavenging/siofee',
            data: {
              token: token,
              deviceid: deviceid,
              orderId: portid
            },
            success: res => {
              console.log(res)
              if (res.data.code == 200) {
                if (res.data.result.isof == "yes") {
                  //订单结算  04
                  wx.request({
                    url: app.globalData.URL + '/scavenging/stopCharge ',
                    data:{
                      token: token,
                      deviceId: deviceid,
                      portId: portid
                    },
                    success:res=>{
                      if(res.data.code==200){
                        wx.navigateTo({
                          url: 'saoma-zw?gmtr=' + deviceid + "|" + portid + "|" + time + "|" +deviceNumber+"|"+ order,
                        })
                      }
                    }
                  })
                } else if (res.data.result.isof == "no") {
                  //没有占位费  00
                  wx.request({
                    url: app.globalData.URL +'/scavenging/endCharge ',
                    data:{
                      token: token,
                      deviceId: deviceid,
                      portId: portid
                    },
                    success:res=>{
                      if(res.data.code==200){
                        wx.request({
                          //订单结算
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
                                url: 'saoma-js?gmtr=' + deviceid + "|" + portid + "|" + time + "|" + deviceNumber + "|" + order,
                              })
                            } else if(res.data.code==100){
                              wx.showToast({
                                title: '订单异常',
                                icon: 'success',
                                duration: 2000
                              })
                            }
                          },
                         
                        })
                      }
                    }
                  })                               
                }
              } else {
                console.log("返回数据错误")
              }
            },
            fail: function () {
              console.log('链接失败')
            }
          })
        } else if (res.cancel) {
          // this.onLoad();
        }
      }
    })
  },
  //充值
  binviewchong:function(){
    wx.navigateTo({
      url: '../wdqb/wdqb-cz',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //截取参数
    var deviceId = options.facility;
    var jiequ = deviceId.split("|");
    var deviceid=jiequ[0];
    var portid=jiequ[1];
    var time=jiequ[2];
    var deviceNumber=jiequ[3]
    var that=this;
    that.setData({
      deviceid: deviceid,
      portid: portid,
      time:time,
      deviceNumber: deviceNumber
    })
    // //本页面的全局参数
    // this.data.deviceid = deviceid;
    // //本页面的全局参数
    // this.data.time = time;
    // this.data.id = portid;
    var token=wx.getStorageSync('token')
    //倒计时 每十分钟请求一次
    Loadingtime:setInterval(function () {
      wx.request({
        url: app.globalData.URL + '/scavenging/Charge',
        data: {
          deviceid: deviceid,
          token: token,
          hour: time,
          portid: portid
        },
        success: res =>{
          console.log(res)
          if(res.data.code==200){
            that.setData({
              balance: res.data.result.balance,
              mcu: res.data.result.mcu,
              freeToMin: res.data.result.freeToMin,
              freeToHour: res.data.result.freeToHour,
              payinAdvance: res.data.result.payinAdvance
            })
            // this.onLoad();
          }else{
            console.log('请求失败...')
          }
        }
      })
    }, 600000)
    
    //正常请求
    wx.request({
      url: app.globalData.URL +'/scavenging/Charge',
      data:{
        deviceid: deviceid,
        token: token,
        hour:time,
        portid: portid
      },
      success:res=>{
        console.log(res)
        that.setData({
          balance: res.data.result.balance,
          mcu: res.data.result.mcu,
          freeToMin: res.data.result.freeToMin,
          freeToHour: res.data.result.freeToHour,
          payinAdvance: res.data.result.payinAdvance
        })
      }
    })
    //获取订单
    wx.request({
      url: app.globalData.URL + '/scavenging/occffe',
      data: {
        token: token,
        hour: time,
        deviceid: deviceid,
        port: portid
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            orderid: res.data.result.orderId
          })
        } else {
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
    clearInterval(this.data.Loadingtime);
    clearInterval(this.onLoad().Loadingtime)
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
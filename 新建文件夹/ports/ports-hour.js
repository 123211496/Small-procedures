// pages/ports/ports.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nunder: '1',
    text: '',
    texta: '空闲',
    textb: '充电中',
    textc: '故障',
    indicatorDots: true,
    currentTab: '',
    meterMinute: '',
    // currentItemId:1,
    currentItemid:"",
    portid:'',

  },
  //点击获取时长
  duration:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentItemid:id
    })
  },
  //点击端口切换背景
  clickbrg: function (event) {
    var portid = event.currentTarget.dataset.id
    this.setData({
      portid: portid
    })
    this.setData({
      currentItemId: event.currentTarget.dataset.id
    })
  },
  //点击立即充电
  binviewbut: function (e) {
    console.log(e)
    var that=this;
    var deviceid = e.currentTarget.dataset.id; //设备Id
    var id = e.currentTarget.dataset.tedl;   //端口id
    var token=wx.getStorageSync('token');   
    var time = this.data.currentItemid;     //选择时间
    var result = e.currentTarget.dataset.name;
    // wx.navigateTo({
    //   url: '../saoma/saoma-cd',
    // })
    if(id==""){
      wx.showModal({
        title: '提示',
        content: '请选择端口',
      })
    } else if(time==""){
      wx.showModal({
        title: '提示',
        content: '请选择充电时长',
      })
    } 
    else if (id!=="" && time!==""){
      wx.request({
        url: app.globalData.URL + '/scavenging/genera',
        data: {
          token: token,
          deviceid: deviceid,
          portid: id,
          hour: time
        },
        success: res => {
          console.log(res)
          if (res.data.code == 200) {
            if (res.data.result.balance=='ok'){
              wx.request({
                url: app.globalData.URL + '/scavenging/createScanOrder',
                data: {
                  token: token,
                  deviceid: deviceid,
                  portid: id,
                  hour: time
                },
                success: res => {
                  console.log(res)
                  if (res.data.code == 200) {
                    wx.navigateTo({
                      url: '../saoma/saoma-cd?facility=' + deviceid + "|" + id + "|" + time + "|" + result,
                    })
                  } else if (res.data.code == 100) {
                    wx.showToast({
                      title: '您有未完成的订单,请先结算',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                }
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '余额不足',
                confirmText: '去充值',
                success:res=>{
                  if(res.confirm){
                    wx.navigateTo({
                      url: '../wdqb/wdqb-cz',
                    })
                  }
                }
              })
            }
          } else if (res.data.code == 100) {
            wx.showToast({
              title: '您有未完成的订单,请先结算',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var deviceId = options.deviceId;
    var jiequ = deviceId.split("|");
    var deviceid = jiequ[0];
    var deviceNumber = jiequ[1];
    this.setData({
      deviceId: deviceid,
      deviceNumber: deviceNumber
    })
    var token = wx.getStorageSync("token")
    //端口状态
    wx.request({
      url: app.globalData.URL + '/DevicePort/findList',
      data: {
        token: token,
        deviceId: deviceid
      },
      success: res => {
        console.log(res)
        this.setData({
          items: res.data.result,
        })
      }
    })
    //充电时长
    wx.request({
      url: app.globalData.URL + '/DeviceTimePricing/findList',
      data: {
        token: token,
        deviceId: deviceid
      },
      success: res => {
      }
    })
    //分钟计算
    wx.request({
      url: app.globalData.URL + '/DeviceTimePricing/findList',
      data: {
        token: token,
        deviceId: deviceid
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            // itema: res.data.result
            meterPrice: res.data.result.meterPrice,
            meterMinute: res.data.result.meterMinute,
            deviceId: res.data.result.deviceId
          })
        } else {
          wx.showModal({
            title: '网络异常...',
            content: '',
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
    this.onLoad()
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
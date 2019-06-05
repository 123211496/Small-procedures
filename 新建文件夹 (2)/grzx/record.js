// pages/grzx/record.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // hidden: true,
    relty: true,
    relts: true,
    date: '2018-08-01',
    dateBox: '2019-08-01',
    time: '00:01',
    timeBox: '23:59',
    relta:1,
    dataid:''
  },
  //
  yinc:function(){
    if(this.data.relts==false){
      this.setData({
        relts:true
      })
    } else if (this.data.relty==false){
      this.setData({
        relty: true
      })
    }
  },
  //点击重置日期
  datecz:function(){
    this.setData({
      date:"",
      dateBox:""
    })
  },
  //重置时间
  timecz:function(){
    this.setData({
      time:"",
      timeBox:""
    })
  },
  //日期显示隐藏
  bindate: function(e) {
    if (this.data.relts==false){
      this.setData({
        relty: !this.data.relty,
        relty:false,
        dataid: 1,
        relts:true

      })
    }else{
      this.setData({
        relty: !this.data.relty,
      })
    }
  },
  //时间显示隐藏
  bintime: function(a) {
    if (this.data.relty==false){
      this.setData({
        relts: !this.data.relts,
        dataid:1,
        relty:true
      })
    }else{
      this.setData({
        relts: !this.data.relts,
      })
    }
  },
  //月份前面
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //月份后面
  bindDateChanges: function(e) {
    this.setData({
      dateBox: e.detail.value
    })
  },
  //时间前面
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
    console.log(e.detail.value)
  },
  //时间后面
  bindTimeChanges: function(e) {
    this.setData({
      timeBox: e.detail.value
    })
  },
  //点击日期上传确定
  binquedi: function(e) {
    var token = wx.getStorageSync('token')
    var that = this;
    var dataq = that.data.date
    var datah = that.data.dateBox;
    console.log(dataq);
    console.log(datah)
    wx.request({
      url: app.globalData.URL + '/UserChargingRecord/findList',
      data: {
        token: token,
        startdate: dataq,
        endDate: datah,
        nowPage: '1'
      },
      success: res => {
       if(res.data.code==200){
         if (this.data.relts == false) {
           this.setData({
             relts: true
           })
         } else if (this.data.relty == false) {
           this.setData({
             relty: true
           })
         }
         console.log(res)
         that.setData({
           items: res.data.result.list,
         })

       }else{
         console.log('网络异常')
       }
      }
    })
  },
  //时间
  timequed: function(e) {
    var token = wx.getStorageSync('token')
    var that = this;
    var time = that.data.time
    var timeBox = that.data.timeBox
    console.log(time);
    console.log(timeBox);
    wx.request({
      url: app.globalData.URL + '/UserChargingRecord/findList',
      data: {
        token: token,
        staretimes: time,
        endtimes: timeBox,
        nowPage: '1'
      },
      success: res => {
        if(res.data.code==200){
          if (this.data.relts == false) {
            this.setData({
              relts: true
            })
          } else if (this.data.relty == false) {
            this.setData({
              relty: true
            })
          }
          that.setData({
            items: res.data.result.list
          })
        }
      }
    })
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL + '/UserChargingRecord/findList',
      data: {
        token: token,
        nowPage: '1'
      },
      success: res => {
        console.log(res)
        this.setData({
          items: res.data.result.list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
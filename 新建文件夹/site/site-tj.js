var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    textat:''
  },
  //获取input值
  getCode: function (e) {
    console.log(e)
    var textat = e.detail.value
    this.data.textare = textat;
  },
  //确定返回首页
  binviewxiao: function () {
    var that = this;
    var text = this.data.textare
    let token = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL + '/SysAddress/searchaddr',
      data: {
        token: token,
        name: text
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          var lat = res.data.result.lat;
          var lng = res.data.result.lng;
          // wx.setStorageSync("limit", { lat: lat, lng: lng })
          // wx.navigateTo({
          //   url: '../index/index'
          // })
          that.setData({
            longitude:lng,
            latitude:lat
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var demo = new QQMapWX({
      key: 'GKRBZ-ZWIC6-KWZSC-MDOPG-VTYK2-K2F55'
    });
    var that=this
    wx.getLocation({
      type: 'gcj02',
      success: res =>{
        console.log(res);
        var latitude = res.latitude    // wx.getLocation 获取当前的地理位置、速度   latitude(维度)  longitude（经度）
        var longitude = res.longitude
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success:function(res){
            console.log(res)
            var latitude = res.result.location.lat;
            var longitude = res.result.location.lng;
            var address = res.result.address;
            var areaName = res.result.formatted_addresses.recommend;
            that.setData({
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
              address: res.result.address,
              areaName: res.result.formatted_addresses.recommend,  
              // markers:[{
              //   iconPath: '../../img/map_Positioning.png',
              //   width: 20,
              //   height: 35,
              //   latitude: res.result.location.lat,
              //   longitude: res.result.location.lng,
              //   address: res.result.address,
              //   areaName: res.result.formatted_addresses.recommend, 
              // }]
            });
          },
          fail:function(res){
            console.log(res)
          },
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        that.setData({
          //添加控件
          controls: [{
            id: 1,
            //控件图片
            iconPath: '../../img/map_Positioning.png',
            //相对页面ed位子
            position: {
              width: 22.4,
              height: 43.4,
              left: windowWidth / 2 - 11.2,
              top: windowHeight / 2 - 43.4,
            },
            clickable: true
          },]
        })
      },
    })
  },
  //点击确定
  binviewque: function (e) {
    console.log(e)
    var token = wx.getStorageSync("token")
    wx.request({
      url: app.globalData.URL +'/address/add',
      method: 'get',
      data: {
        token: token ,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        address: this.data.address,
        areaName: this.data.areaName,
      },
      header: {
        "Content-Type": "applicatiSon/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
        wx.redirectTo({
          url: 'site-gl',
        })
      }
    })
   
  },
  //获取设备
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },
  //拖动地图定位中心
  getCenterLocation: function () {
    let that = this;
    var token = wx.getStorageSync('token')
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res)
        let lat = res.latitude;
        let long = res.longitude
        wx.request({
          url: app.globalData.URL + '/address/getlocal',
          data: {
            token: token,
            log: long,
            lat: lat
          },
          success: res => {
             console.log(res)
            that.setData({
              // latitude: res.result.ad_info.location.lat,
              // longitude: res.result.ad_info.location.lng,
              address: res.data.result.result.DetailedAddress,
              areaName: res.data.result.result.region,
            })
          }
        })
      }
    })

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
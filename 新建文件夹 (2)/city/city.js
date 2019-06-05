// pages/city/city.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sitya:false,
    sitys:true,
    textat:'',
    city:'',
    cityAZ: [{ cityName: '#' }, { cityName: 'A' }, { cityName: 'B' }, { cityName: 'C' }, { cityName: 'D' }, { cityName: 'E' }, { cityName: 'F' }, { cityName: 'G' }, { cityName: 'H' }, { cityName: 'J' }, { cityName: 'K' }, { cityName: 'L' }, { cityName: 'M' }, { cityName: 'N' }, { cityName: 'P' }, { cityName: 'Q' }, { cityName: 'R' }, { cityName: 'S' }, { cityName: 'T' }, { cityName: 'W' }, { cityName: 'X' }, { cityName: 'Y' }, { cityName: 'Z' },]
  },
  getCode: function (e) {
    this.setData({
      sitya: true,
      sitys: false,
    })
    console.log(e)
    var token = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL + '/SysAddress/find',
      data: {
        token: token,
        name: e.detail.value
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          this.setData({
            itemb: res.data.result
          })
        }
      }
    })
  },
  binviename: function (e) {
    console.log(e)
    var name = e.currentTarget.dataset.name;
    var token = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL + '/SysAddress/searchaddr',
      data: {
        token: token,
        name: name
      },
      success: res => {
        if (res.data.code == 200) {
          console.log(res)
          var lat = res.data.result.lat
          var lng = res.data.result.lng
          wx.showModal({
            title: '提示',
            content: '是否切换页面',
            success: res => {
              if (res.confirm) {
                wx.setStorageSync('limit', { lat: lat, lng: lng });
                wx.navigateBack({
                  url: "../index/index",
                })
              } else if (res.cancel) {
                this.onLoad();
              }
            },
            fail: function () {
            }
          })
        }
      }
    })
  },






  //确定返回首页
  // binviewxiao: function () {
  //   wx.navigateBack({
  //     url: '../index/inex'
  //   })
    // var that = this;
    // var text = this.data.textare;
    // // let latitude = this.data.latitude
    // // let longitude = this.data.longitude
    // let token = wx.getStorageSync('token');
    // wx.request({
    //   url: app.globalData.URL + '/SysAddress/searchaddr',
    //   data: {
    //     token: token,
    //     // longitude: longitude,
    //     // latitude: latitude,
    //     name: text
    //   },
    //   success: res => {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       var lat = res.data.result.lat;
    //       var lng = res.data.result.lng;
    //       wx.setStorageSync("limit", { lat: lat, lng: lng })
    //     }
    //   }
    // })
  // },


  // bindAZ: function (e) {
  //   var currentCityName = e.currentTarget.dataset.name;
  //   console.log(currentCityName)
  //   this.setData({
  //     cityListId: currentCityName
  //   })
  //   var that = this;
  //   //放入A-Z的scrollTop参数
  //   if (that.data.scrollAZ == null) {
  //     wx.createSelectorQuery().selectAll('.city-item-A-Z').fields({
  //       dataset: true,
  //       size: true,
  //       rect: true
  //     }, function (res) {
  //       res.forEach(function (re) {
  //         if (currentCityName == re.dataset.cityname) {
  //           wx.pageScrollTo({
  //             scrollTop: re.top + that.data.scrollNow - 55.5,
  //             duration: 0
  //           })
  //         }
  //       })
  //     }).exec();
  //   } else {
  //     this.data.scrollAZ.forEach(function (re) {
  //       if (currentCityName == re.dataset.cityname) {
  //         wx.pageScrollTo({
  //           scrollTop: re.top + that.data.scrollNow - 55.5,
  //           duration: 0
  //         })
  //       }
  //     })
  //   }
  // },


  //刷新
  shuaxin:function(){
    wx.showLoading({
      title: '刷新中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    this.onLoad()
  },
  gaincity:function(e){
    var token=wx.getStorageSync('token')
    var name = e.currentTarget.dataset.tien;
    wx.request({
      url: app.globalData.URL +'/SysAddress/searchaddr',
      data:{
        token: token,
        name: name
      },
      success:res=>{
        if (res.data.code == 200) {
          var lat = res.data.result.lat
          var lng = res.data.result.lng
          wx.showModal({
            title: '提示',
            content: '是否切换页面',
            success: function(res){
              if (res.confirm) {
                wx.setStorageSync('ordinate', { lat: lat, lng: lng });
                wx.navigateBack({
                  url: "../index/index",
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                this.onLoad();
              }
            },
            fail:function(){
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var demo = new QQMapWX({
      key: 'GKRBZ-ZWIC6-KWZSC-MDOPG-VTYK2-K2F55'// 必填
    }); 
    var namecity = wx.getStorageSync('city')
    this.setData({
      city: namecity
    })
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL +'/SysAddress/findList',
      data:{
        token:token
      },
      success:res=>{
        console.log(res)
       if(res.data.code==200){
         this.setData({
           items: res.data.result
         })
       }
      }
    })
    wx.request({
      url: app.globalData.URL +'/HotCity/findList',
      data:{
        token: token
      },
      success:res=>{
        console.log(res)
        this.setData({
          irema:res.data.result
        })
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
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reple:true,
    showtj:true,
    cityt:'',
    url:'',
    textare:'',
    longitude:'',
    latitude:'',
    items:[{
      
    }]
  },
  //点击到常用地址
  dianji:function(e){
    console.log(e)
    var text = e.currentTarget.dataset.name;
    let token=wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL +'/SysAddress/searchaddr',
      data:{
        token:token,
        name:text
      },
      success:res=>{
        if (res.data.code == 200) {
          var lat = res.data.result.lat;
          var lng = res.data.result.lng;
          wx.setStorageSync("list", { lat: lat, lng: lng })
          wx.navigateBack({
            url: '../index/inex'
          })
        }
      }
    })
  },
  //点击切换城市
  chengshi:function(){
    wx.navigateTo({
      url: '../city/city',
    })
  },
  //获取input值
  getCode:function(e){
    console.log(e)
    var textat = e.detail.value
    this.data.textare= textat;
  },
  //确定返回首页
  binviewxiao:function(){
    var that=this;
    var text = this.data.textare
    let token= wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL +'/SysAddress/searchaddr',
      data:{
        token:token,
        name: text
      },
      success:res=>{
        console.log(res)
        if(res.data.code==200){
          var lat= res.data.result.lat;
          var lng=res.data.result.lng;
          wx.setStorageSync("limit", { lat: lat, lng: lng })
          wx.navigateBack({
            url:'../index/index'
          })
        }
      }
    })
  },
  //跳转添加常用地址
  binviewchang:function(){
    wx.navigateTo({
      url: 'site-tj',
    })
  },
  //更换地址
  binviegeng:function(){
    wx.navigateTo({
      url: 'site-gl',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取token
    var token=wx.getStorageSync('token')
    var that = this;
    var city = wx.getStorageSync('city')
    that.setData({
      cityt: city
    })
    wx.request({
      url: app.globalData.URL +'/address/def',
      method:"get",
      data:{
        token: token
      },
      header: {
        "Content-Type": "applicatiSon/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
       if(res.data.code==200){
         if (res.data.result.isnull == "yes") {
           that.setData({
             reple: false,
             replt:true,
             rety: true,
           })
         } else if (res.data.result.isnull == "no") {
           let areaName = res.data.result.date.areaName;
           let address = res.data.result.date.address;
           let id = res.data.result.date.id;
           let isdef = res.data.result.date.isdef;
           that.setData({
             reple: true,
             rety: false,
             replt:false,
             areaName: areaName,
             address: address,
             id: id,
             isdef: isdef
           })
         
         }
       } else{
         console.log("网络错误")
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
  onShow: function (){
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
    
      wx.stopPullDownRefresh()
  
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
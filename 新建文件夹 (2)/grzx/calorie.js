// pages/grzx/calorie.js
var util = require('../../utils/util.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    resty:true,
    resy:true
  },
  tianjia(){
    wx.redirectTo({
      url:'calorie-list'
    })
  },
  //解除绑定
  jiebang(e){
    var cardId = e.currentTarget.dataset.id
     var  id=this.data.id;
     var token=wx.getStorageSync('token');
     wx.request({
       url: app.globalData.URL +'/electricCard/relieveCard',
       data:{
         token:token,
         cardId: cardId
       },
       success:res=>{
         if(res.data.code==200){
           this.onLoad();
         }
       }
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.URL +'/electricCard/queryUserCard',
      data:{
        token:token
      },
      success:res=>{
        console.log(res)
        if(res.data.code==200){
         if(res.data.result.length == "0"){
           this.setData({
             resty:false,
             resy:true
           })
         }else{
           for (var i = 0 ; i < res.data.result.length; i++) {
             var list = res.data.result[i].creationTime;
             var _list = util.formatTime(list);
             console.log(_list)
             this.setData({
               time: _list
             })
           }
           this.setData({
             resty: true,
             resy: false,
             items: res.data.result,
           })
         }
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
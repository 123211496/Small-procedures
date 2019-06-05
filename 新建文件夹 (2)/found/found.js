var util = require('../../utils/util.js');
var d = new Date(1230999938);
console.log(util.formatTime(d))
// let app = getApp()
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reple:true
  },

  dianji:function(){
    wx.navigateTo({
      url: 'found-list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token=wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL + '/NewsSign/findList',
      data:{
        token:token,
        nowPage:'1'
      },
      success:res=>{
        console.log(res)
       if(res.data.code==200){
         if (res.data.result.list.length =='0'){
           this.setData({
             reple:false,
             replt:true
           })
         } else{
           for (var i = 0; i < res.data.result.list.length;i++){
             let time=res.data.result.list[i].sendTime;
             let _time = util.formatTime(time) 
             console.log(_time)
             this.setData({
               time: util.formatTime(time) 
             })
           }
           this.setData({
             reple: true,
             replt: false,
             items: res.data.result.list,
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
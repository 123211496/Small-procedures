// pages/grzx/calorie-list.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
  },
  input(e){
    console.log(e)
    let texst = e.detail.value;
    this.data.text=texst; 
    let textr=this.data.text;
    console.log(textr);
    let that = this;
    if (this.data.text.length == 0) {
      that.setData({
        texat: '#CBCBCB'
      })
    } else if (this.data.text.length !== 0) {
      that.setData({
        texat: '#15CD80'
      })
    }
  },
  //点击绑定点卡
  bangding(e){
    var token=wx.getStorageSync('token');
    var numbar=this.data.text;
    if (!/^[0-9]{6,10}$/.test(numbar)){
      wx.showToast({
        title: '卡号错误请输入数字卡号',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.request({
        url: app.globalData.URL + '/electricCard/addBind',
        data: {
          token: token,
          cardNo: numbar
        },
        success: res => {
          console.log(res)
          if (res.data.code==200) {
            wx.navigateTo({
              url: 'calorie'
            })
          }else if(res.data.code==100){
            wx.showToast({
              title: '该卡已被绑定或者无该卡号',
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
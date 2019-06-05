// pages/wdqb/wdqb-cz.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItemId:'',
    rechargeAmount:'',
    price:'50',
    priceBox:'',
    id:'',
    itemid:'1',
    currentItem:''
  },
  //选择充值金额
  binvienam:function(e){
    let than=this;
    this.setData({
      currentItemId: e.currentTarget.dataset.id
    })
   
    //和确认支付关联价格
    var index = e.currentTarget.dataset.name;
    this.setData({
      price: index,
      priceBox:index
    })
    
  },
  agreement(){
    wx.navigateTo({
      url: 'agreement',
    })
  },
  //点击其他金额
  dianji:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let time=1;
    let _time=0;
    this.setData({
      currentItemId: _time,
      currentItem: time
    })
  },
  //获取其他金额的值
  inputext:function(e){
    console.log(e)
    var amount = e.detail.value;
    this.setData({
      price: amount
    })
  },
  //支付
  testSubmit:function(e){
    console.log(e)
    var amount = e.detail.target.dataset.name;
    var token=wx.getStorageSync('token');
    //创建订单
    wx.request({
      url: app.globalData.URL +'/scavenging/createOrder',
      data:{
        token:token,
        total_amount: amount,
        type:'1'
      },
      success:res=>{
        console.log(res)
        var orderno = res.data.result.orderNo;
        if(res.data.code==200){
          //获取微信支付参数
          wx.request({
            url: app.globalData.URL +'/pay/apply',
            method: 'POST',
            data:{
              token:token,
              orderNo: orderno,
              payType:'wx',
              payModel: 'jsapi'
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success:res=>{
              console.log(res)
              if(res.data.code==200){
                wx.requestPayment({
                  'timeStamp': res.data.result.timeStamp,
                  'nonceStr': res.data.result.nonceStr,
                  'package': res.data.result.package,
                  'signType': res.data.result.signType,
                  'paySign': res.data.result.paySign,
                  'success': function (res) {
                    wx.redirectTo({
                      url:'wdqb'
                    })
                    //推送消息
                    // wx.request({
                    //   url: app.globalData.URL +'',
                    //   data:{
                    //     'formId':e.detail.formId,
                    //      'token':token
                    //   },
                    //   method:'POST',
                    //   success:res=>{
                    //     console.log(res)
                    //   },
                    //   fail:function(err){
                    //     console.log('失败'+err);
                    //   }
                    // })
                  },
                  'fail': function (res) {
                    console.log(res)
                  }
                })
              }
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
    let that = this;
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL + '/user/info',
      data: {
        token: token
      },
      success: res => {
        that.setData({
          totalOverage: res.data.result.totalOverage,
        })
      }
    })
    wx.request({
      url: app.globalData.URL+'/Favorable/findList',
      data:{
        token: token        
      },
      success:res=>{
        that.setData({
          items:res.data.result
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
let app = getApp()
Page({
  data: {
    
  },
  //事件处理函数
  //跳转如何添加图片
  tjtp:function(){
  wx.navigateTo({
    url: 'picture',
  })
  },
  //跳转充值常见问题
  czcj:function(){
    wx.navigateTo({
      url: 'recharge',
    })
  },
  //跳转使用充电桩设备
  cdsb:function(){
    wx.navigateTo({
      url: 'device',
    })
  },
  stop(){
    wx.navigateTo({
      url: 'stop',
    })
  },
  inquire(){
    wx.navigateTo({
      url: 'inquire',
    })
  }
})

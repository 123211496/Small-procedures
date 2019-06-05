//index.js
//获取应用实例
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    tempFile: '',
    content: '',
    max:400
  },
  //关联字数
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      {
        
      }
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  //文本
  formSubmit: function (e) {
    console.log(e)
    let that=this;
    let content = e.detail.value.opinion;
    console.log(content)
    let token = wx.getStorageSync('token')
    let imgurl = wx.getStorageSync('imgurl')
    wx.request({
      url: app.globalData.URL +'/upload/text', 
      method: "get",
      data: {
        token:token,
        centos: content,
        image: this.data.tempFile
      },
      success: function(res) {
        console.log(res);
        if (res.data.code==200){
          if (e.detail.value == "") {
            wx.showModal({
              title: '提示',
              content: '内容不能为空',
            })
          } else if (e.detail.value !== ""){
            wx.redirectTo({
              url: 'fault-list',
            })
          }
        } else{
          wx.showModal({
            title: '提示',
            content: '请求失败',
          })
        }
      }
    })
    
  },
  binviewchuan: function() {
    var token = wx.getStorageSync("token")
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        // that.setData({
        //   tempFile: res.tempFilePaths
        // })
        wx.uploadFile({
          url: app.globalData.URL +'/upload/file',
          filePath: tempFilePaths[0],
          name: 'files',
          method:'post',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
          //  // 'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            token:token   
          },
          success: res => {
            var obj=JSON.parse(res.data)
            var image = obj.result[0].url
            that.setData({
              tempFile: image
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

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
// pages/grzx/information.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: 0,
    avatarUrl: '',
    Name: '',
    gender: ['身份证', '驾驶证'],
    areaIndex: 0,
    genw: [
      '男',
     '女'
    ],
    Phone: '',
    zheng: '',
    img: ''
  },
  //获取性别
  bindPicker: function(e) {
    var val = e.detail.value;
    console.log(val)
    this.setData({
      areaIndex: val
    })
  },
  //获取昵称
  getName: function(e) {
    var val = e.detail.value;
    this.setData({
      Name: val
    })
  },
  //获取手机号
  getPhon: function(e) {
    var val = e.detail.value;
    this.setData({
      Phone: val
    })
  },
  //获取真实姓名
  getanme: function(e) {
    var val = e.detail.value;
    this.setData({
      ming: val
    })
  },
  //选择证件
  bindViewEvent: function(e) {
    this.setData({
      option: e.detail.value
    })
  },
  //获取证件号码
  getbunber: function(e) {
    this.setData({
      zheng: e.detail.value
    })
  },
  //点击更换头像
  binimage: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        var token =wx.getStorageSync('token')
        //保存图片
        wx.uploadFile({
          url: app.globalData.URL + '/upload/file',
          filePath: tempFilePaths[0],
          name: 'files',
          method: 'post',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
            //  // 'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            token: token
          },
          success: res => {
            console.log(res)
            var obj = JSON.parse(res.data);
            console.log(obj)
            var image = obj.result[0].url;
            console.log(image)
            that.setData({
              img: image
            })
          }
        })
        that.setData({
          img: tempFilePaths
        })
      },
    })
  },
  //点击保存
  buttom: function(e) {
    console.log(e)
    if (this.data.Name === "") {
      wx.showToast({
        title: '昵称不能为空，请输入3-16个字符的昵称',
        duration: 3000,
        icon: 'none',
      })
      return false
    } else if (this.data.Phone === '') {
      wx.showToast({
        title: '手机号码不能为空',
        duration: 3000,
        icon: 'none',
      })
      return false
    } else if (this.data.Name.length < 3 || this.data.Name.length >16){
      wx.showToast({
        title: '昵称不能为空，请输入3-16个字符的昵称',
        duration: 3000,
        icon: 'none',
      })
      return false
    }
    // var myreg = /^1[34578]\d{9}$/;
    var phone = this.data.phone;
    console.log(phone)
    if (!/^1[34578]\d{9}$/.test(this.data.Phone)) {
      wx.showToast({
        title: '手机号码有误！',
        duration: 2000,
        icon: 'none',
      })
      return false
    }
    var token = wx.getStorageSync('token')
    //保存信息
    wx.request({
      url: app.globalData.URL + '/user/updateInfo',
      data: {
        userNick: this.data.Name,
        sex: this.data.areaIndex,
        phone: this.data.Phone,
        realName: this.data.ming,
        idType: this.data.option,
        idNumber: this.data.zheng,
        userPortrait: this.data.img,
        token: token
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          var userInfo=res.data.result;
          wx.setStorageSync('userInfo', userInfo);
          wx.showToast({
            title: '已保存',
            icon: 'none',
            duration: 3000,
            success: res => {
              wx.navigateBack({
                url: 'grzx',
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '链接失败',
            success: res => {

            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.URL + '/user/info',
      data: {
        token: token
      },
      success: res => {
        console.log(res);
        if (res.data.result.realName == 'undefined' || res.data.result.Phone == 'undefined') {
          that.setData({
            img: res.data.result.userPortrait,
            Name: res.data.result.userNick,
            uid: res.data.result.id,
            Phone: res.data.result.phone,
            // realName: res.data.result.realName,
            idNumber: res.data.result.idNumber,
            areaIndex: res.data.result.sex
          })
        } else if (res.data.result.realName !== 'undefined') {
          console.log(res.data.result.phone)
          that.setData({
            img: res.data.result.userPortrait,
            Name: res.data.result.userNick,
            uid: res.data.result.id,
            Phone: res.data.result.phone,
            realName: res.data.result.realName,
            idNumber: res.data.result.idNumber,
            areaIndex:res.data.result.sex
          })
        }
      }
    })
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
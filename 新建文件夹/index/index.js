//index.js
//获取应用实例
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // teleiy:false,
    rety: true,
    markers: [{}],
    longitude: '',
    latitude: "",
    deviceId: '',
    cityt: '',
    scale: 15,
    imarkerId: 0,
    showView: true,
    showYou: true,
    showcdxx: true,
    en: '',
    i: "",
  },
  //有订单时跳转页面
  bindView(e){
    console.log(e)
    var deviceid = e.currentTarget.dataset.id;
    var id = e.currentTarget.dataset.name;
    var result = e.currentTarget.dataset.evice;
    var time='1';
    wx.navigateTo({
      url: '../saoma/saoma-cd?facility=' + deviceid + "|" + id + "|" + time + "|" + result,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    //跳转页面
    //跳转使用说用
    wx.navigateTo({
      url: '../about/about-list',
    })
  },
  // shuoming:function(){
  //   if (this.data.showcdxx==true){
  //     this.data.showcdxx = false
  //   }
  // },
  //跳转充电桩选择
  bindViewcdxx: function (e) {
    console.log(e)
    var deviceNumber = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var log = e.currentTarget.dataset.log;
    var lat = e.currentTarget.dataset.lat;
    wx.navigateTo({
      url: "../facility/facility?deviceId=" + id + "|" + log + "|" + lat + "|" + deviceNumber,
    })
  },
  //转跳搜索
  bindViewSite: function () {
    wx.navigateTo({
      url: '../site/site',
    })
  },
  //跳转个人中心
  bindViewGrzx: function () {
    wx.navigateTo({
      url: '../grzx/grzx',
    })
  },
  //跳转上传故障
  bindViewFault: function () {
    wx.navigateTo({
      url: '../fault/fault',
    })
  },
  //跳转常见问题
  bindViewHelp: function () {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  //跳转城市问题
  citytBox: function () {
    wx.navigateTo({
      url: '../city/city',
    })
  },
  //使用说明显示
  showState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  //使用说明隐藏
  noButton: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  //显示用户协议
  showPorts: function () {
    var that = this;
    that.setData({
      showYou: (!that.data.showYou)
    });
  },
  //隐藏用户协议/扫码/跳转
  showports: function (e) {
    console.log(e)
    var that = this;
    var token = wx.getStorageSync('token')
    if (e.currentTarget.dataset.isunfir == true){
      var deviceid = e.currentTarget.dataset.id;
      var id = e.currentTarget.dataset.name;
      var result = e.currentTarget.dataset.evice;
      var time = '1';
      wx.navigateTo({
        url: '../saoma/saoma-cd?facility=' + deviceid + "|" + id + "|" + time + "|" + result,
      })
    } else if (e.currentTarget.dataset.isunfir == false){
      //校验token
      wx.request({
        url: app.globalData.URL + '/user/getisauthorization',
        data: {
          token: token
        },
        success: res => {
          if (res.data.code == 100) {
            wx.navigateTo({
              url: '../login/logs',
            })
          } else if (res.data.result.isAuthorization == "Y") {
            console.log("验证成功")
          }
        }
      })
      // that.setData({
      //   showYou: (!that.data.showYou)
      // })
      //相机扫码
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo.isScavAuth == '1') {
        wx.scanCode({
          // onlyFromCamera: false,
          scanType: 'qrCode',
          success: res => {
            var result = res.result;
            console.log(result)
            // //扫码授权
            wx.request({
              url: app.globalData.URL + '/user/userScavAuth',
              data: {
                token: token
              },
              success: res => {
                console.log(res)
              }
            })
            wx.request({
              url: app.globalData.URL + '/device/judge',
              data: {
                token: token,
                pile_code: result
              },
              success: function (res) {
                console.log(res)
                if (res.data.code == 200) {
                  var deviceId = res.data.result.deviceId
                  if (res.data.result.billingManner == 'tim') {
                    wx.navigateTo({
                      url: "../ports/ports-hour?deviceId=" + deviceId + "|" + result,
                    })
                  } else if (res.data.result.billingManner == 'pow') {
                    wx.navigateTo({
                      url: '../ports/ports?deviceId=' + deviceId + "|" + result,
                    })
                  } else if (res.data.result.billingManner == 'ele') {
                    wx.navigateTo({
                      url: '../ports/ports-degree?deviceId=' + deviceId + "|" + result,
                    })
                  }
                } else if(res.data.code==100){
                  wx.showToast({
                    title: '扫码失败',
                    icon: 'success',
                    duration: 2000
                  })
                }
              }
            })
          }
        })
      }
      else if (userInfo.isScavAuth !== '1') {
        wx.navigateTo({
          url: 'index-list',
        })
      }

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    let _ordinate = wx.getStorageSync('ordinate');
    if (_ordinate) {
      this.setData({
        latitude: _ordinate.lat,
        longitude: _ordinate.lng,
      });
      wx.setStorageSync('ordinate', '')
    }
    let _limit = wx.getStorageSync('limit');
    if (_limit) {
      this.setData({
        latitude: _limit.lat,
        longitude: _limit.lng,
      })
      wx.setStorageSync('limit', '')
      this.onLoad();
    };

    let _citys = wx.getStorageSync('citys');
    if (_citys) {
      this.setData({
        latitude: _citys.lat,
        longitude: _citys.lng
      })
      wx.setStorageSync('citys', "")
    }

    let _list = wx.getStorageSync('list');
    if (_list) {
      this.setData({
        latitude: _list.lat,
        longitude: _list.lng
      })
      wx.setStorageSync('list', "");
      // this.onLoad.;
    }
  },
  onLoad: function () {
    var that = this;
    var demo = new QQMapWX({
      key: 'GKRBZ-ZWIC6-KWZSC-MDOPG-VTYK2-K2F55'
    });
    //此声明最好不要写在 wx.getLocation方法内，this指代不同
    wx.getLocation({
      type: 'wgs84', //编码方式
      success: res => {
        console.log(res)
        var token = wx.getStorageSync('token');
        var latitude = res.latitude // wx.getLocation 获取当前的地理位置、速度   latitude(维度)  longitude（经度）
        var longitude = res.longitude
        that.setData({
          longitude: longitude,
          latitude: latitude
        })
        demo.reverseGeocoder({
          //腾讯地图api 逆解析方法 首先设计经纬度
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          //逆解析成功回调函数
          success: function (res) {
            var city = res.result.address_component.city;
            //保存城市
            wx.setStorage({
              key: 'city',
              data: city,
            })
            that.setData({
              cityt: res.result.address_component.city,
              longitude: res.result.location.lng,
              latitude: res.result.location.lat
            })
            let token = wx.getStorageSync('token')
            wx.request({
              url: app.globalData.URL + '/device/rangequery',
              data: {
                token: token,
                longitude: longitude,
                latitude: latitude
              },
              success: res => {
                console.log(res)
                //校验token
                wx.request({
                  url: app.globalData.URL + '/user/getisauthorization',
                  data: {
                    token: token
                  },
                  success: res => {
                    
                    if (res.data.code == 100) {
                      wx.navigateTo({
                        url: '../login/logs',
                      })
                    } else if (res.data.result.isAuthorization == "Y") {
                      console.log("验证成功")
                      let token = wx.getStorageSync('token');
                      wx.request({
                        url: app.globalData.URL + '/user/info',
                        data: {
                          token: token
                        },
                        success: res => {
                          if (res.data.code == 200) {
                            if (res.data.code == 200) {
                              let userInfo = res.data.result;
                              wx.setStorageSync('userInfo', userInfo);
                              that.setData({
                                images: res.data.result.userPortrait,
                              })
                            }
                          }
                        }
                      })
                    }
                  }
                })
                var arr = [];
                for (var i = 0; i < res.data.result.length; i++) {
                  let _src = '';
                  if (res.data.result[i].runStatus == 'onl') {
                    _src = '../../img/Positioning_equipment_ nor.png'
                  } else if (res.data.result[i].runStatus == 'off'){
                    _src = '../../img/Positioning_equipment_sel.png'
                  } else {
                    _src = '../../img/map_malfunction.png'
                  }
                  var json = {
                    'latitude': res.data.result[i].latitude,
                    'longitude': res.data.result[i].longitude,
                    'id': res.data.result[i].id,
                    'iconPath': _src,
                    'width': 40,
                    'height': 47,
                  }
                  arr.push(json);
                }
                that.setData({
                  markers: arr
                })
              }
            })
          },
        })
      },
    })

    //获取设备的信息 (可用高度、可用宽度)
    var that = this;
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
          },],
        })
      },
    })
    // //判断是否有订单
    // var token = wx.getStorageSync('token')
    // wx.request({
    //   url: app.globalData.URL + '/scavenging/incompleteorder',
    //   data: {
    //     token: token
    //   },
    //   success: res => {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       if (res.data.result.isUnfiOrder == false){
    //         that.setData({
    //           rety: true,
    //           isUnfiOrder: res.data.result.isUnfiOrder
    //         })
    //       } else if (res.data.result.isUnfiOrder == true) {
    //         console.log(123)
    //         that.setData({
    //           rety: false,
    //           order: '未结算',
    //           device: res.data.result.deviceId,
    //           port: res.data.result.portId,
    //           devicenumber: res.data.result.deviceNumber,
    //           isUnfiOrder: res.data.result.isUnfiOrder
    //         }) 
    //         if (res.data.result.isAbnormal == false){
    //           that.setData({
    //           //   rety: true
    //             isUnfiOrder: res.data.result.isUnfiOrder
    //           })
    //           console.log(123)
    //         } else if (res.data.result.isAbnormal == true){
    //           console.log(123)
    //           that.setData({
    //             rety: false,
    //             order: '异常',
    //             device: res.data.result.deviceId,
    //             port: res.data.result.portId,
    //             devicenumber: res.data.result.deviceNumber,
    //           })
    //         }
    //       } 
    //     }
    //   }
    // })
  },
  //点击显示隐藏充电桩详情
  controltap: function () {
    if (this.data.showcdxx == false) {
      this.setData({
        showcdxx: true
      })
    }
  },
  //归位
  binwehui: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude, //纬度 
          longitude: longitude, //经度 
        })

      },
    })
  },
  //多点ID显示  充电桩选择
  kertap(e) {
    console.log(e)
    var deviceId = e.markerId
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: app.globalData.URL + '/device/querydevice',
      data: {
        id: deviceId,
        token: token,
        longitude: this.data.longitude,
        latitude: this.data.latitude
      },
      success: res => {
        if (res.data.result.runStatus == "err") {
          var lat = res.data.result.latitude;
          var lng = res.data.result.longitude;
          // var deviceNumber = res.data.result.deviceNumber;
          that.setData({
            top: lat,
            left: lng,
            deviceNumber: deviceNumber,
            teleiy: false,
          })
          wx.showToast({
            title: '设备故障,请选择其他设备',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.result.runStatus == "off") {
          that.setData({
            // communityName: res.data.result.communityName,
            // distance: res.data.result.distance,
            // deviceId: res.data.result.id,
            // deviceName: res.data.result.deviceName,
            lat: res.data.result.latitude,
            lng: res.data.result.longitude,
            // portNumber: res.data.result.portNumber,
            // deviceNumber :res.data.result.deviceNumber,
            // showcdxx: (!that.data.showcdxx)
          })
          wx.showToast({
            title: '设备离线,请选择其他设备',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.result.runStatus == "onl") {
          that.setData({
            communityName: res.data.result.communityName,
            distance: res.data.result.distance,
            deviceId: res.data.result.id,
            deviceName: res.data.result.deviceName,
            lat: res.data.result.latitude,
            lng: res.data.result.longitude,
            portNumber: res.data.result.portNumber,
            deviceNumber: res.data.result.deviceNumber,
            showcdxx: (!that.data.showcdxx)
          })
        }
      }
    })
    // 空闲 故障  总数量
    wx.request({
      url: app.globalData.URL + '/device/comdevstanum',
      data: {
        deviceid: deviceId,
        token: token,
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          this.setData({
            state_fau: res.data.result.faultNo,
            state_yes: res.data.result.freeNo,
            state_no: res.data.result.chargeNo

          })
        } else {
          console.log('访问失败....')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that=this;
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userLocation'])
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '是否授权当前位子',
            content: '需要获取您的地理位子，请确认授权，否则地图功能将无法使用',
            success: res => {
              if (res.cancel) {
                console.log("再次授权失败")
              } else if (res.confirm) {
                wx.openSetting({
                  success: res => {
                    console.log(res)
                    if (res.authSetting['scope.userLocation'] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icom: 'success',
                        duration: 2000
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          this.onLoad();
        }
      }
    })
    //创建map上下文
    this.mapCtx = wx.createMapContext('myMap') //地图ID ;
  },
  //滑动地图
  getCenterLocation: function () {
    let that = this;
    var token = wx.getStorageSync('token')
    this.mapCtx.getCenterLocation({
      success: function (res) {
        // console.log(res)
        let lat = res.latitude
        let long = res.longitude
        wx.request({
          url: app.globalData.URL + '/device/rangequery',
          data: {
            token: token,
            longitude: long,
            latitude: lat
          },
          success: res => {
            if(res.data.code==200){
              //判断是否有订单
              var token = wx.getStorageSync('token')
              wx.request({
                url: app.globalData.URL + '/scavenging/incompleteorder',
                data: {
                  token: token
                },
                success: res => {
                  console.log(res)
                  if (res.data.code == 200) {
                    if (res.data.result.isUnfiOrder == false) {
                      that.setData({
                        rety: true,
                        isUnfiOrder: res.data.result.isUnfiOrder
                      })
                    } else if (res.data.result.isUnfiOrder == true) {
                      console.log(123)
                      that.setData({
                        rety: false,
                        order: '未结算',
                        device: res.data.result.deviceId,
                        port: res.data.result.portId,
                        devicenumber: res.data.result.deviceNumber,
                        isUnfiOrder: res.data.result.isUnfiOrder
                      })
                      if (res.data.result.isAbnormal == false) {
                        that.setData({
                          //   rety: true
                          isUnfiOrder: res.data.result.isUnfiOrder
                        })
                        console.log(123)
                      } else if (res.data.result.isAbnormal == true) {
                        console.log(123)
                        that.setData({
                          rety: false,
                          order: '异常',
                          device: res.data.result.deviceId,
                          port: res.data.result.portId,
                          devicenumber: res.data.result.deviceNumber,
                        })
                      }
                    }
                  }
                }
              })
            }
            var arr = [];
            for (var i = 0; i < res.data.result.length; i++) {
              let _src = '';
              if (res.data.result[i].runStatus == 'onl') {
                _src = '../../img/Positioning_equipment_ nor.png'
              } else if (res.data.result[i].runStatus == 'off') {
                _src = '../../img/Positioning_equipment_sel.png'
              } else {
                _src = '../../img/map_malfunction.png'
              }
              var json = {
                'latitude': res.data.result[i].latitude,
                'longitude': res.data.result[i].longitude,
                'id': res.data.result[i].id,
                'iconPath': _src,
                'width': 40,
                'height': 47,
              }
              arr.push(json);
            }
            that.setData({
              markers: arr
            })
          }
        })
      }
    })

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
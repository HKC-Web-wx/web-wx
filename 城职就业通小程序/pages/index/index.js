//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: '',
    select: false,
    tihuoWay: '请选择身份',
    userName:'',
    userPassword:''

  },

  bindShowMsg: function () {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect: function (e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
    })
  },

//学生端
  stu_login:function(e){
    var that = this
    wx.showLoading({
      title: '登录中.请稍等',
      mask:true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Student/stu_login',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_code: e.detail.value.accountNumber,
        pad_code: e.detail.value.password,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.exist == 2){
          wx.hideLoading();
          wx.showToast({
            title: '账号不存在',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 1){
          wx.hideLoading();
          wx.showToast({
            title: '账号或密码错误',
            icon:"none",
            duration:1500,
            mask:true
          })
          return;
        }
        if(res.data.exist == 0){
          wx.hideLoading();
          wx.showToast({
            title: '跳转中',
            mask: true,
            duration: 2000,
            icon: "none"
          })
          wx.setStorageSync('tihuoWay', that.data.tihuoWay)
          wx.setStorageSync('userName', e.detail.value.accountNumber)
          wx.setStorageSync('userPassword', e.detail.value.password)
          wx.redirectTo({
            url: '/pages/student/student?sid=' + res.data[0][0].id
          })
        }
      },fail:function(err){
        wx.hideLoading();
        wx.showToast({
          title: '网络状态差',
          icon: "none",
          duration: 1500,
          mask: true
        })
      }
    })
  },

  //教师端
  ter_login:function(e){
    var that = this
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Teacher/teach_login',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        teach_code: e.detail.value.accountNumber,
        pad_code: e.detail.value.password,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.exist == 2) {
          wx.hideLoading();
          wx.showToast({
            title: '账号不存在',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '账号或密码错误',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 0) {
          wx.hideLoading();
          wx.showToast({
            title: '跳转中',
            mask: true,
            duration: 1000,
            icon: "none"
          })
          wx.setStorageSync('tihuoWay', that.data.tihuoWay)
          wx.setStorageSync('userName', e.detail.value.accountNumber)
          wx.setStorageSync('userPassword', e.detail.value.password)
          wx.redirectTo({
            url: '/pages/teacher/teacher?tid=' + res.data[0][0].id,
          })
        }
      }, fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '网络状态差',
          icon: "none",
          duration: 1500,
          mask: true
        })
      }
    })
  },
  
  //分管领导
  leader_login: function (e) {
    var that = this
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/leader_login',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        lead_code: e.detail.value.accountNumber,
        pad_code: e.detail.value.password,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.exist == 2) {
          wx.hideLoading();
          wx.showToast({
            title: '账号不存在',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '账号或密码错误',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 0) {
          wx.hideLoading();
          wx.showToast({
            title: '跳转中',
            mask: true,
            duration: 1000,
            icon: "none"
          })
          wx.setStorageSync('tihuoWay', that.data.tihuoWay)
          wx.setStorageSync('userName', e.detail.value.accountNumber)
          wx.setStorageSync('userPassword', e.detail.value.password)
          wx.redirectTo({
            url: '/pages/leader/leader?lid=' + res.data[0][0].id,
          })
        }
      }, fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '网络状态差',
          icon: "none",
          duration: 1500,
          mask: true
        })
      }
    })
  },

  //管理员
  admin_login: function (e) {
    var that = this
    wx.showLoading({
      title: '登录中..',
      mask:true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Admin/admin_login',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        admin_code: e.detail.value.accountNumber,
        pad_code: e.detail.value.password,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.exist == 2) {
          wx.hideLoading();
          wx.showToast({
            title: '账号不存在',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '账号或密码错误',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 0) {
          wx.hideLoading();
          wx.showToast({
            title: '跳转中',
            mask:true,
            duration:1000,
            icon:"none"
          })
          wx.setStorageSync('tihuoWay', that.data.tihuoWay)
          wx.setStorageSync('userName', e.detail.value.accountNumber)
          wx.setStorageSync('userPassword', e.detail.value.password)
          wx.redirectTo({
            url: '/pages/admin/admin?aid=' + res.data[0][0].id,
          })
        }
      }, fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '网络状态差',
          icon: "none",
          duration: 1500,
          mask: true
        })
      }
    })
  },
  //企业端
  enterprise_login:function(e){
    var that = this
    wx.showLoading({
      title: '登录中..',
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Enterprise/ent_login',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        enterprise_code: e.detail.value.accountNumber,
        enterprise_password: e.detail.value.password,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.exist == 3) {
          wx.hideLoading();
          wx.showToast({
            title: '账号不存在',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 2) {
          wx.hideLoading();
          wx.showToast({
            title: '账号已失效',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '账号或密码错误',
            icon: "none",
            duration: 1500,
            mask: true
          })
          return;
        }
        if (res.data.exist == 0) {
          wx.hideLoading();
          wx.showToast({
            title: '跳转中',
            mask: true,
            duration: 1000,
            icon: "none"
          })
          wx.setStorageSync('tihuoWay', that.data.tihuoWay)
          wx.setStorageSync('userName', e.detail.value.accountNumber)
          wx.setStorageSync('userPassword', e.detail.value.password)
          wx.redirectTo({
            url: '/pages/enterprise/enterprise?eid=' + res.data[0][0].id,
          })
        }
      }, fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '网络状态差',
          icon: "none",
          duration: 1500,
          mask: true
        })
      }
    })
  },

  //事件处理函数
  formSubmit:function(e){
    var that = this
    console.log(that.data.tihuoWay)
    if (e.detail.value.accountNumber.length == 0 || e.detail.value.password.length == 0) {
      wx.showToast({
        title: '账户或密码为空',
        icon: 'loading',
        duration: 2200,
        mask: true
      })
    } else {
      if (that.data.tihuoWay == '教师端'){
        that.ter_login(e);
      }else if(that.data.tihuoWay == '学生端'){
        that.stu_login(e);
      } else if (that.data.tihuoWay == '分管领导') {
        that.leader_login(e);
      }else if (that.data.tihuoWay == '管理员') {
        that.admin_login(e);
      } else if (that.data.tihuoWay == '企业端'){
        that.enterprise_login(e)
      }else if (that.data.tihuoWay == '请选择身份'){
        wx.showToast({
          title: '请先选择身份',
          icon: 'loading',
          duration: 1900,
          mask: true
        })
      }
    }
  },
  //异步获取本地缓存的数据
  loadData: function(){
    var that = this;
    wx.getStorage({
      key: 'tihuoWay',
      success: function(res) {
        console.log(res.data)
        that.setData({
          tihuoWay: res.data
        })
      },fail:function(err){
        console.log(err + '本地缓存无tihuoWay数据')
        tihuoWay: '请选择身份'
      }
    })
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userName: res.data
        })
      }, fail: function (err) {
        console.log(err + '本地缓存无userName数据')
        // userName: ''
      }
    })
    wx.getStorage({
      key: 'userPassword',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userPassword: res.data
        })
      }, fail: function (err) {
        console.log(err + '本地缓存无userPassword数据')
        // userPassword: ''
      }
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  onReady:function(){
    // this.loadData();
    var that = this
    wx.login({ //wx.login 拿到code
      success: function (res) { //成功后将code 保存至 this.data
        console.log(res.code);
        that.setData({
          code: res.code
        })
        if (that.data.code) {
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Fair/wx_code',
            data: {
              code: that.data.code
            },
            success: function (res) {
              // console.log(res);//openid 和 session_key
              app.globalData.openid = res.data.openid
            },
            fail: function (res) {
              console.log('openid接口失败了'.res);
            }
          })
        }
      },
      fail: function (res) {
        console.log('wx.login调用失败');
      }
    })
  },
  onShow:function(){
    this.loadData();
  }
})

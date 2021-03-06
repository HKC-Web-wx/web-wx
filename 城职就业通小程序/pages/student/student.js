const app = getApp()

// pages/student/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo: {},
    sid:'',
  },
  //切换身份按钮
  switch_id() {
    wx.showToast({
      title: '跳转中',
      mask: true,
      duration: 2000,
      icon: "none"
    })
    wx.reLaunch({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading();
    wx.hideToast();
    this.setData({
      sid: options.sid
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '学生端-管理中心'
    })
    wx.hideLoading();
  },
  //个人信息
  p_click: function () {
    wx.showToast({
      title: '加载中',
      duration: 1400,
      icon:"none",
      mask: true
    })
    wx.navigateTo({
      url: '/pages/stu_person/stu_person?sid=' + this.data.sid,
    })
  },
  //简历
  r_click: function () {
    wx.navigateTo({
      url: '/pages/resume/resume?sid=' + this.data.sid,
    })
  },
  //招聘会
  f_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 5000
    })
    wx.navigateTo({
      url: '/pages/fairwork/fairwork?sid='+this.data.sid,
    })
    wx.hideToast();
  },
  //我的报名
  e_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 5000
    });
    wx.navigateTo({
      url: '/pages/enrolment/enrolment?sid=' + this.data.sid,
    })
    wx.hideToast();
  },
  //求职面试
  i_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 5000
    });
    wx.navigateTo({
      url: '/pages/interviewAddList/interviewAddList?sid=' + this.data.sid,
    })
    wx.hideToast();
  },
  //求职录用
  a_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 5000
    });
    wx.navigateTo({
      url: '/pages/acceptedAddlist/acceptedAddlist?sid=' + this.data.sid,
    })
    wx.hideToast();
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo: {},
    lid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading();
    wx.hideToast();
    wx.showLoading({
      title: '加载页面中',
      mask: true
    })
    this.setData({
      lid: options.lid
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
      title: '分管员-管理中心',
      success:function(){
        wx.hideLoading();
      }
    })
  },
  p_click: function () {
    // wx.navigateTo({
    //   url: '/pages/le_person/le_person?lid=' + this.data.lid,
    // })
    wx.showModal({
      title: '提示',
      content: '此功能未开放',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return;
  },
  f_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 9000
    })
    wx.navigateTo({
      url: '/pages/le-fairwork/le-fairwork?lid=' + this.data.lid,
      success:function(){
        wx.hideToast();
      }
    })
  },
  t_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 9000
    })
    wx.navigateTo({
      url: '/pages/adle-teacher/adle-teacher?lid=' + this.data.lid,
      success:function(){
        wx.hideToast();
      }
    })
    
  },
  c_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 9000
    })
    wx.navigateTo({
      url: '/pages/adle-classlist/adle-classlist?lid=' + this.data.lid,
      success:function(){
        wx.hideToast();
      }
    })
  },
  s_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 10000
    })
    wx.navigateTo({
      url: '/pages/adle-stulist/adle-stulist?lid=' + this.data.lid,
      success:function(){
        wx.hideToast();
      }
    })
  },
  d_click: function () {
    wx.showToast({
      title: '加载中',
      mask: true,
      icon: "none",
      duration: 10000
    })
    wx.navigateTo({
      url: '/pages/adle-tong-data/adle-tong-data?lid=' + this.data.lid,
      success:function(){
        wx.hideToast();
      }
    })
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
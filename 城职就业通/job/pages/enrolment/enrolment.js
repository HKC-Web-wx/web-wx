const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    winHeight:'',
    stu_id:''
  },

  add:function(e){
    var sid = this.data.stu_id
    wx.navigateTo({
      url: '/pages/add_enroll/add_enroll?sid=' + sid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var that = this;
    console.log(options)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/sign_list',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        stu_id: options.sid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          enrolment: res.data,
          stu_id: options.sid
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '报名记录'
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
    return {
      title: '城职就业通',
      path: '/pages/index/index'
    }
  }
})
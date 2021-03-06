// pages/stulist/stulist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_id:'',
    winHeight: '',
    stulist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      class_id:options.id,
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
  },
  //学生列表
  stu_list: function () {
    var that = this;
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Fair/stu_list',
      method: 'GET',
      data: {
        class_id:that.data.class_id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stulist: res.data
        })
      }
    })
  },
  //修改学生操作
  edit_stu:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let sex = e.currentTarget.dataset.sex
    let code = e.currentTarget.dataset.code
    let phone = e.currentTarget.dataset.phone
    wx.navigateTo({
      url: '/pages/editstudent/editstudent?id=' + id + '&name=' + name + '&sex=' + sex + '&code=' + code + '&phone=' + phone + '&class_id=' + this.data.class_id,
    })
  },
  //删除学生操作
  del_stu:function(e){
    var that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Fair/del_stu',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data)
              that.stu_list()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //添加学生操作
  add:function(){
    wx.navigateTo({
      url: '/pages/addstudent/addstudent?id=' + this.data.class_id,
    })
  },
  //重置密码操作
  reset_password: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认重置其密码为123456？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '重置中',
            mask: true
          })
          wx.request({
            url: 'https://test.hivetech.cn/hkc/job/Home/Fair/reset_stu',
            method: 'GET',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              if (res.data == 1) {
                wx.hideLoading();
                wx.showToast({
                  title: '重置成功',
                  mask: true,
                  duration: 1300,
                  icon: "none"
                })
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: '重置失败',
                  mask: true,
                  duration: 1200,
                  icon: "none"
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('取消重置操作')
        }
      }, fail: function (err) {
        console.log(err);
      }
    })
  },
  //点击查看学生详情
  employ_info: function (e) {
    console.log(e)
    var sid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/employ_info/employ_info?sid=' + sid,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '管理学生'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.stu_list()
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
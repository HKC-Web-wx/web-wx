
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    address: '',
    image: '',
    images: '',
    details: '',
    imageurl: '',
    chooseblooen: false,
    fileName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      title: options.title,
      address: options.address,
      image: options.image,
      details: options.details,
      chooseblooen: false
    })
  },
  chooseimage: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        console.log(res)
        that.setData({
          image: res.tempFilePaths
        })
        wx.uploadFile({
          url: 'https://test.hivetech.cn/hkc/job/Home/Leader/upload_image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          filePath: res.tempFilePaths[0],
          name: 'upload',
          success: function (res) {
            console.log(res)
            console.log(JSON.parse(res.data))
            var data = JSON.parse(res.data)
            var imageurl = String(data.upload.savepath + data.upload.savename)
            that.setData({
              imageurl: imageurl,
              chooseblooen: true
            })
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  },
  // 上传招聘文件
  uploadFile: function (e) {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: function (res) {
        console.log(res.tempFiles);
        const fileName = res.tempFiles[0].name;
        var fileType_docx = fileName.substr(fileName.length - 4);
        var fileType_doc = fileName.substr(fileName.length - 3);
        console.log("文件类型：" + fileType_docx + "或" + fileType_doc + "招聘会id：" + that.data.id)
        if (fileType_docx == 'docx' || fileType_doc == 'doc') {
          that.setData({
            fileName: fileName,
          });
          wx.showLoading({
            title: '文件上传中',
            mask: true
          })
          wx.uploadFile({
            url: 'https://test.hivetech.cn/hkc/job/Home/Fair/upload_file', //服务器上传接口
            filePath: res.tempFiles[0].path, //文件资源路径
            formData: {
              fair_id: that.data.id,
              fileName: fileName
            },
            name: 'filename',
            header: {},
            success(res) {
              if (res.errMsg == "uploadFile:ok") {
                console.log(res)
                wx.hideToast();
                wx.hideLoading();
                wx.showToast({
                  title: '上传文件成功',
                  icon: 'success',
                  duration: 2300,
                  mask: true
                })
              } else {
                wx.hideLoading()
                wx.showToast({
                  title: '上传文件失败',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
              }
            }
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '上传文件格式错误',
            icon: "none",
            duration: 1800,
            mask: true
          })
        }
      },
      fail(error) {
        wx.hideLoading();
        console.log('文件上传失败', error)
      }
    })
  },
  //下载查看文件
  look_file: function () {
    wx.navigateTo({
      url: '/pages/fair_file/fair_file?fair_id=' + this.data.id,
    })

  },

  formSubmit: function (e) {
    console.log(e)
    var that = this
    var url = 'https://test.hivetech.cn/hkc/job/Public/Fair/images/'
    var title = e.detail.value.title;
    var address = e.detail.value.address;
    var details = e.detail.value.details;
    if (!title) {
      wx.showToast({
        title: '标题不能为空',
        icon: "none"
      })
      return;
    } else if (!address) {
      wx.showToast({
        title: '地点不能为空',
        icon: "none"
      })
      return;
    } else if (!details) {
      wx.showToast({
        title: '详情不能为空',
        icon: "none"
      })
      return;
    }

    if (that.data.chooseblooen == false) {
      that.setData({
        images: that.data.image
      })
    } else if (that.data.chooseblooen == true) {
      that.setData({
        images: url + that.data.imageurl
      })
    }
    wx.showToast({
      title: '提交数据中',
      icon: "none",
      duration: 20000,
      mask: true
    })
    wx.request({
      url: 'https://test.hivetech.cn/hkc/job/Home/Leader/edit_information',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        id: that.data.id,
        image: that.data.images,
        title: e.detail.value.title,
        address: e.detail.value.address,
        details: e.detail.value.details
      },
      success: function (res) {
        console.log(res.data)
        if (res.data !== 1) {
          wx.showToast({
            title: '招聘会已存在',
            icon: "none",
            mask: true,
            duration: 1500
          })
        } else {
          wx.navigateBack();
          wx.hideLoading();
          wx.hideToast();
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '修改招聘会信息'
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
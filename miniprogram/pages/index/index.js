const app = getApp()

Page({

  data: {
    imageUrl: 'https://image.potatofield.cn/18-10-24/3328292.jpg',
  }, 

  onLoad: function() {
    var that = this
    wx.downloadFile({
      url: this.data.imageUrl,
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
          imageUrl: tempFilePath
        })
      }
    })
  },
  
  // 南开同学录
  gotoNKYearBook: function () {
    wx.navigateTo({
      url: '/pages/graduate/graduate',
    })
  },

  //拼图
  gotoPuzzle: function () {
    wx.navigateTo({
      url: '/pages/puzzle/puzzle',
    })
  },
  
  //头像生成器
  gotoAvatarCreator: function() {
    wx.navigateTo({
      url: '/pages/avatarCreator/avatarCreator',
    })
  },

  //南开一百周年签到日历
  gotoNankai100:function() {
    wx.navigateTo({
      url: '/pages/timeMachine/Nankai100/Nankai100',
    })
  },

  //时光机
  gotoTimeMachine: function() {
    wx.navigateTo({
      url: '/pages/timeMachine/timeMachine',
    })
  },

  //纳新
  gotoRecruitment:function(){
    wx.navigateTo({
      url: '/pages/recruitment/recruitment',
    })
  },

  // 南开问卷
  gotoNankaiQs:function() {
    wx.navigateTo({
      url: '/pages/NankaiQs/NankaiQs',
    })
  },

  //用户点击右上角分享
  onShareAppMessage: function(res) {
    return {
      title: "南开大学团委服务平台",
      imageUrl: this.data.imageUrl,
      success: function (res) {
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 1500
        })
      },
      fail: function (res) {
        wx.showToast({
          title: "分享失败",
          icon: 'none',
          duration: 1500
        })
      }
    }
  },

  //呼出菜单
  actionSheet: function() {
    wx.showActionSheet({
      itemList: ['关于本程序', '建议与反馈'],
      success(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/about/about',
          })
        } else if (res.tapIndex === 1) {
          wx.navigateTo({
            url: '/pages/feedback/feedback'
          })
        }
      }
    })
  }
})
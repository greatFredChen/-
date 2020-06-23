// pages/graduate/graduate.js
const app = getApp()

const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

   prev:function(){
    wx.redirectTo({
      url: '../../index/index',
    })
  },

  //从相册中选择头像
  fromAlbum: async function () {
    var that = this;
    wx.chooseImage({
      count: 1, //最多可以选择的图片
      sourceType: ['album', 'camera'], //用户可以选择拍照或者相册上传
      success: async function (res) {
        //把照片传给avatar
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          avatar: tempFilePaths[0], //res.tempFilePaths是一个string数组
        })
        // 上传到云存储
        let ifUpload = await util.uploadPhoto(that.data.avatar)
        if (!ifUpload) {
          // 上传失败
          wx.showToast({
          title: '上传图片失败!',
          icon: 'none',
          duration: 1500
          })
          return
        }
        let verifyResult = await util.verifyRes(ifUpload, that.data.avatar.match(app.globalData.storePattern)[1])
        if (verifyResult.result.errCode != 0) {
          that.setData({
            avatar: ''
          })
          wx.showToast({
            title: '您的图片未能过审!',
            icon: 'none',
            duration: 2000,
          })
          return
        }
        wx.showToast({
          title: '上传成功',
          icon: 'suceess',
          duration: 2000,
          mask: true,
        })
        wx.redirectTo({
          url: '../answer/answer?avatar=' + that.data.avatar,
        })
      },
      //上传失败
      fail: function (res) {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  //授权上传头像
  bindGetUserInfo: async function (e) {
    var that = this;
    //成功获取授权
    if (e.detail.userInfo) {
      that.setData({
        avatar: e.detail.userInfo.avatarUrl
      })
      wx.downloadFile({
        url: e.detail.userInfo.avatarUrl,
        success: async function (res) {
          //把照片传给avatar
          that.setData({
            avatar: res.tempFilePath,
          })
          // 上传到云存储
        let ifUpload = await util.uploadPhoto(that.data.avatar)
        if (!ifUpload) {
          // 上传失败
          wx.showToast({
          title: '上传图片失败!',
          icon: 'none',
          duration: 1500
          })
          return
        }
        let verifyResult = await util.verifyRes(ifUpload, that.data.avatar.match(app.globalData.storePattern)[1])
        if (verifyResult.result.errCode != 0) {
          that.setData({
            avatar: ''
          })
          wx.showToast({
            title: '您的图片未能过审!',
            icon: 'none',
            duration: 2000,
          })
          return
        }
          wx.showToast({
            title: '已获得头像',
            icon: 'suceess',
            duration: 5000,
            mask: true,
          })
          wx.redirectTo({
            url: '../answer/answer?avatar=' + that.data.avatar,
          })
        },
        //下载头像失败
        fail: function (res) {
          wx.showToast({
            title: '头像获取失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
    //获取授权失败
    else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 1500
      })
    }
  },

  
})
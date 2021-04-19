// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    hasUserInfo: false
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo){
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      app.globalData.userInfo = userInfo;
    }
    else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        app.globalData.userInfo = userInfo;
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      })
    }



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  chenyixun: function(event) {       
    wx.navigateTo({
    url: '../songs/chenyixun/chenyixun',
    })
  },

  likeqin: function(event) {       
    wx.navigateTo({
    url: '../songs/likeqin/likeqin',
    })
  },

  yangqianhua: function(event) {       
    wx.navigateTo({
    url: '../songs/yangqianhua/yangqianhua',
    })
  },

  fushishanxia: function(event) {       
    wx.navigateTo({
    url: '/pages/songs/chenyixun/lyric/fushishanxia',
    })
  },

  yuebanxiaoyequ: function(event) {       
    wx.navigateTo({
    url: '/pages/songs/likeqin/lyric/yuebanxiaoyequ',
    })
  },

  chuchuwen: function(event) {       
    wx.navigateTo({
    url: '/pages/songs/yangqianhua/lyric/chuchuwen',
    })
  },

  suo: function (event) {
    wx.navigateTo({
      url: '../search/search',
    })
  },




})
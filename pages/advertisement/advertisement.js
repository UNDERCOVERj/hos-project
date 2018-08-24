// pages/advertisement/advertisement.js
var WxParse = require('../wxParse/wxParse.js');
const WX = require('../../utils/util.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		WX.request({
			url: '/Hospital/getOpenAdvert',
			success: (resData) => {
				let {
					is_allow_save_contacts,
					advert_detail,
					id: advert_id
				} = resData;

				WxParse.wxParse('ad_detail', 'html', advert_detail, this);
				this.setData({
					is_allow_save_contacts: is_allow_save_contacts == 1 ? true : false,
					advert_id
				})
			}
		})
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

	}
})
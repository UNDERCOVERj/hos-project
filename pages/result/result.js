// pages/result/result.js

const WX = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		status: 0,
		resultMsg: '',
		additionalMsg: '',
		type: 0,
		zyNo: '',
		mzNo: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let {
			mzNo, // 扫码的返回结果, 门诊号
			zyNo, // 扫码的返回结果, 住院号
			zyTimes, // 扫码的返回结果, 住院次数
			status, // 扫描是否成功
			type // 0 扫码，1 支付
		} = options;
		this.setData({
			...options,
			status: +status,
			type: +type
		});
		wx.setNavigationBarTitle({
			'title': +type ? '支付结果' : '扫码结果'
		})
		if (!+type && +status) { // 扫码成功后请求服务器, 成功就hideloading
			WX.request({
				url: '/ThirdParty/getOutpatientWaitPayList',
				data: {
					mzNo
				},
				success: (resData) => {
					wx.navigateTo({
						url: `/pages/outpatient/outpatient?mzNo=${mzNo}`
					})
				}
			})
		} else { // 支付结果，不需要显示loading

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

	}
})
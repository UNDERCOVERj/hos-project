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
		mzNo: '',
		adFlag: false,
		is_detail_skip: true // 是否查看详情
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
			type, // 0 扫码，1 支付
			resultMsg // 条件1，2不满足时的msg
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
			if (mzNo) { // 门诊检验3，4条件
				WX.request({
					url: '/ThirdParty/getOutpatientWaitPayList',
					data: {
						mzNo
					},
					success: () => {
						wx.redirectTo({
							url: `/pages/outpatient/outpatient?mzNo=${mzNo}`
						})
					},
					fail: (additionalMsg) => {
						this.setData({
							status: 0,
							resultMsg: '扫码失败',
							additionalMsg
						})
					}
				})
			} else if (zyNo) { // 住院检验3，4条件
				WX.request({
					url: '/ThirdParty/getInpatientWaitPayList',
					data: {
						zyNo,
						zyTimes
					},
					success: () => {
						wx.redirectTo({
							url: `/pages/inhospital/inhospital?zyNo=${zyNo}&zyTimes=${zyTimes}`
						})
					},
					fail: (additionalMsg) => {
						this.setData({
							status: 0,
							resultMsg: '扫码失败',
							additionalMsg
						})
					}
				})
			}
		} else if (!+type && !+status) { // 条件1，2不满足
			this.setData({
				resultMsg
			})
		} else if (+type && +status){ // 支付成功
			WX.request({
				'url': '/Hospital/getIsOpenAdvert',
				success: (resData) => {
					let {
						advert_is_open
					} = resData;
					this.setData({
						adFlag: advert_is_open == '1' ? true : false
					})
					if (advert_is_open == '1') {
						WX.request({
							url: '/Hospital/getOpenAdvert',
							success: (resData) => {
								let {
									is_detail_skip,
									cover_img
								} = resData;
								this.setData({
									is_detail_skip: is_detail_skip == 1 ? true : false,
									cover_img
								})
							}
						})
					}
				}
			})
		} else if (+type && !+status){
			console.log('支付失败')
		} else { // 支付结果，不需要显示loading
			
		}
	},
	goToAd() {
		wx.redirectTo({
			url: '/pages/advertisement/advertisement'
		})
	}
})
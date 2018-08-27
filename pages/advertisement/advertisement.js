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

				WxParse.wxParse('ad_detail', 'html', advert_detail, this, 20);
				this.setData({
					is_allow_save_contacts: is_allow_save_contacts == 1 ? true : false,
					advert_id
				})
			}
		})
	},
	inputName(e) {
		let value = e.detail.value;
		this.setData({
			name: value && value.trim() || ''
		})
	},
	inputPhone(e) {
		let value = e.detail.value;
		this.setData({
			phone: value && value.trim() || ''
		})
	},
	submitAd() {
		let {
			name,
			phone
		} = this.data;
		if (!(name && name.trim() || '') || !(phone && phone.trim() || '')) {
			wx.showToast({
				title: '输入信息不能为空',
				icon: 'none',
				duration: 1000
			})
		} else {
			let data = {
				name,
				phone,
				advert_id
			}
			WX.request({
				url: '',
				data,
				success: () => {

				},
				fail: () => {

				}
			})
		}
	}
})
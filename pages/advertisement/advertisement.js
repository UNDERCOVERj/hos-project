// pages/advertisement/advertisement.js
var WxParse = require('../wxParse/wxParse.js');
const WX = require('../../utils/util.js');
const Utils = require('../../utils/unescape.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cover_img: '',
		advert_id: '',
		is_allow_save_contacts: false
	},
	decodeUnicode(str) {
		str = str.replace(/\\/g, "%");
		return this.postStr(unescape(str));
	},
	postStr(str) {
		return str.replace(/\%/g, "");
	},
	onLoad: function (options) {
		WX.request({
			url: '/Hospital/getOpenAdvert',
			success: (resData) => {
				let {
					is_allow_save_contacts,
					advert_detail,
					cover_img,
					id: advert_id
				} = resData;
				advert_detail = Utils.unescape(Utils.deleteQuot(this.decodeUnicode(advert_detail)))

				WxParse.wxParse('ad_detail', 'html', advert_detail, this, 20);
				this.setData({
					is_allow_save_contacts: is_allow_save_contacts == 1 ? true : false,
					advert_id,
					cover_img
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
			phone,
			advert_id
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
				url: '/Hospital/addUserContacts',
				data: {
					advert_id,
					mini_open_id: wx.getStorageSync('mini_open_id'),
					name,
					phone
				},
				success: () => {
					wx.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 1000
					})
				},
				fail: () => {
					wx.showToast({
						title: '提交失败',
						icon: 'success',
						duration: 1000
					})
				}
			})
		}
	}
})
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const loop = () => {

}

const strategy = {
	'/User/getUserOpenid': {
		"code": 200,
		"info": "success",
		"data":{
			"openid": 1234,
			"session_key": 'sessionkey123'
		}
	},
	'/User/checkIsExistUser': {
        "code": 200,
        "info": "success",
        "data":{
        }
	},
	'/User/getUserInfo': {
        "code": 200,
        "info": "success",
        "data": {
            "id": "用户唯一ID",
            "user_name": "用户昵称",
            "head_img": "用户头像",
            "sex": "用户性别", // 0：其他；1：男；2：女"
            "mini_open_id": "用户openid",
            "created_time": "用户创建时间",
            "created_time_date": "用户创建时间-日期格式化",
        }
	},
	'/User/createdUser': {
        "code": 200,
        "info": "success",
        "data": {
        }
	},
	'/Hospital/getEnableNotticeList': {
        "code": 200,
        "info": "success",
        "data": [
			{
				"id": "公告 id",
				"notice_detail": "这是"
			},
			{
				"id": "公告 id",
				"notice_detail": "这是一条告示"
			}
        ]
	},
	'/ThirdParty/getOutpatientWaitPayList': { 
        "code": 200,
        "message": "success",
        "data": {
            "mzh": "234",
            "brid": "病人ID",
            "brxm": "益达",
            "dj_list": {
                "S0000006（单据号为key）": {
                    "no": "单据号",
                    "hjsj_time": "化价时间(时间戳)",
                    "sfxm_list": [
                        {
                            "sfxm": "收费项目",
                            "xmdj": "10",
                            "dw": "单位",
                            "xmfl": "项目分类",
                            "xmsl": "10",
                            "xmfyxj": "100"
                        },{
                            "sfxm": "收费项目",
                            "xmdj": "10",
                            "dw": "单位",
                            "xmfl": "项目分类",
                            "xmsl": "10",
                            "xmfyxj": "100"
                        },{
                            "sfxm": "收费项目",
                            "xmdj": "10",
                            "dw": "单位",
                            "xmfl": "项目分类",
                            "xmsl": "10",
                            "xmfyxj": "100"
                        }
                    ]
				},
				"S0000007（单据号为key）": {
                    "no": "单据号",
                    "hjsj_time": "化价时间(时间戳)",
                    "sfxm_list": [
                        {
                            "sfxm": "收费项目",
                            "xmdj": "10",
                            "dw": "单位",
                            "xmfl": "项目分类",
                            "xmsl": "10",
                            "xmfyxj": "100"
                        },{
                            "sfxm": "收费项目",
                            "xmdj": "10",
                            "dw": "单位",
                            "xmfl": "项目分类",
                            "xmsl": "10",
                            "xmfyxj": "100"
                        },{
                            "sfxm": "收费项目",
                            "xmdj": "10",
                            "dw": "单位",
                            "xmfl": "项目分类",
                            "xmsl": "10",
                            "xmfyxj": "100"
                        }
                    ]
                }
            }
        }
	},
	// 获取住院费用清单.
	'/ThirdParty/getInpatientCostList': {
        "code": 200,
        "message": "success",
        "data": {
            "chargeTimeArr": {
                "收费时间（时间戳）": "收费时间（格式化）"
            },
            "patientInfo": {
                "name": "病人姓名",
                "admission_time_date": "入院时间(格式化)",
                "total_cost": "总收费金额"
            },
            "costList": {
                "收费时间（时间戳）": {
                    "费用分类": {
                        "category_name": "费用分类",
                        "category_total_cost": "当前分类总收费金额",
                        "project_list": [
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            }
                        ]
                    }
                }
            }
        }
	},
	// 获取门诊账单集合.
	'/Order/getOutpatientOrderList': {
        "code": 200,
        "message": "success",
        "data": {
            "page": {
                "page_size": "每页显示数量",
                "current_page": "当前页码",
                "total_page": "总页码"
            },
            "list": [
                {
                    "id": "订单id",
                    "order_number": "订单编号",
                    "pay_status": "支付状态（0：待支付：1：支付成功）",
                    "hospital_id": "医院ID",
                    "hospital_name": "医院名称",
                    "outpatient_number": "门诊号",
                    "bill_number": "单据号",
                    "patient_name": "病人姓名",
                    "calculation_money_time": "化价时间",
                    "real_money": "当前订单实际金额",
                    "pay_money": "当前订单支付金额",
                    "user_id": "用户ID",
                    "created_time": "订单生成时间",
                    "pay_time": "支付时间",
                    "pay_time_date": "支付时间(格式化)",
                    "project_list":[
                        {
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
                    ]
				},
				{
                    "id": "订单id",
                    "order_number": "订单编号",
                    "pay_status": "支付状态（0：待支付：1：支付成功）",
                    "hospital_id": "医院ID",
                    "hospital_name": "医院名称",
                    "outpatient_number": "门诊号",
                    "bill_number": "单据号",
                    "patient_name": "病人姓名",
                    "calculation_money_time": "化价时间",
                    "real_money": "当前订单实际金额",
                    "pay_money": "当前订单支付金额",
                    "user_id": "用户ID",
                    "created_time": "订单生成时间",
                    "pay_time": "支付时间",
                    "pay_time_date": "支付时间(格式化)",
                    "project_list":[
                        {
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
						{
                            "order_id":"订单id",
                            "category":"项目分类",
                            "project_name":"项目名称",
                            "unit_price":"项目单价",
                            "num":"项目数量",
                            "sum_price":"项目总金额"
						},
                    ]
                }
            ]
        }
	},
	// 获取住院押金集合
	'/Order/getInpatientOrderList': {
        "code": 200,
        "message": "success",
        "data": {
            "page": {
                "page_size": "每页显示数量",
                "current_page": "当前页码",
                "total_page": "总页码"
            },
            "list": [
                {
                    "id": "订单id",
                    "order_number": "订单编号",
                    "pay_status": "支付状态（0：待支付：1：支付成功）",
                    "hospital_id": "医院ID",
                    "hospital_name": "医院名称",
                    "inpatient_number": "住院号",
                    "serial_number": "住院次数号",
                    "department": "department",
                    "bed_number": "床位号",
                    "advance_money":"预交金额",
                    "cost_money":"已产生费用",
                    "account_balance":"账户余额",
                    "real_money": "当前订单实际金额",
                    "pay_money": "当前订单支付金额",
                    "user_id": "用户ID",
                    "created_time": "订单生成时间",
                    "pay_time": "支付时间",
                    "pay_time_date": "支付时间(格式化)"
                }
            ]
        }
    },
    // 获取住院费用清单
    '/ThirdParty/getInpatientCostList':  {
        "code": 200,
        "message": "success",
        "data": {
            "chargeTimeArr": {
                1534054260598: "2018/8/12 下午2:11:00",
                1486771200000: "eejeijfo",
                1533975140531: "dio",
                1531385396859: "djdiow"
            },
            "patientInfo": {
                "name": "病人姓名",
                "admission_time_date": "入院时间(格式化)",
                "total_cost": "总收费金额"
            },
            "costList": {
                1531385396859: {
                    "费用分类": {
                        "category_name": "费用分类",
                        "category_total_cost": "10000",
                        "project_list": [
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },{
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },{
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            }
                        ]
                    }
                },
                1534054260598: {
                    "费用分类": {
                        "category_name": "费用分类",
                        "category_total_cost": "10000",
                        "project_list": [
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            }
                        ]
                    }
                },
                1533975140531: {
                    "费用分类34": {
                        "category_name": "费用分类",
                        "category_total_cost": "10000",
                        "project_list": [
                            {
                                "project_name": "项目名称221212",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称2233",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            }
                        ]
                    }
                },
                1486771200000: {
                    "费用分类2": {
                        "category_name": "费用分类",
                        "category_total_cost": "10000",
                        "project_list": [
                            {
                                "project_name": "项目名称221212",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            },
                            {
                                "project_name": "项目名称2233",
                                "project_specifications": "项目规格",
                                "project_unit": "项目单位",
                                "project_unit_price": "项目单价",
                                "project_num": "项目数量",
                                "project_sum_price": "项目总费用",
                                "charge_time": "收费时间(格式化)"
                            }
                        ]
                    }
                }
            }
        }
    }
}

let loadingFlag = false;

const request = (params) => {
	let self = this;
	let {
		url,
		data,
		success,
		fail
	} = params;
	fail = fail || loop;
	success = success || loop;
	!loadingFlag && wx.showLoading({
		title: '请稍等',
		mask: true
	})
	return new Promise((resolve) => {

		function request(url) {
			let data = strategy[url];
			let status = 200;
			let resData = {
				data,
				status
			}
			if (status === 200) {
				resolve(resData.data)
			} else {
				reject();
			}
		}
		setTimeout(() => request.call(this, url), 500)
		

	})
	.then((resData) => {
		loadingFlag = false;
		wx.hideLoading();
		success.call(self, resData.data)
	})
	// .catch(() => {
	// 	wx.showToast && wx.showToast({
	// 		title: '请求失败',
	// 		icon: 'none',
	// 		duration: 1000
	// 	})
	// })
	
}


module.exports = {
	formatTime,
	request
}

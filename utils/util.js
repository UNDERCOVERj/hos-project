const app = getApp();
const prefixUrl = 'https://backend.wsyzyyjfzs.com';

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

const add = (a, b) => {
    a = a + '';
    b = b + '';
    let aL = a.split('.')[1];
    let bL = b.split('.')[1];
    let aLen = aL && aL.length || 0;
    let bLen = bL && bL.length || 0;

    let m = aLen > bLen ? aLen : bLen;

    let bei = Math.pow(10, m);
    a = +a * bei;
    b = +b * bei;
    return (a + b)/bei;
}

class CodeMap {
    constructor() {
        this.codeMap = {
            '200': 'success',
            '2000': 'error',
            '2001': '请求非法',
            '2002': '接口参数无效',
            // 微信
            '3000': '微信请求错误',
            // 医院接口
            '4000': '医院不存在或无效',
            '4001': '医院未有上线广告',
            '4002': '支付广告无效或不存在',
            '4003': '医院接口地址无效或非法',
            '4004': '医院广告无效',
            '4005': '医院广告不允许保留用户联系信息',
            '4006': '已超过医院每日限额支付费用',
            // 用户
            '5000': '用户不存在',
            '5001': '用户已存在',
            // 甲方接口
            '6000': '调用甲方接口失败',
            '6001': '调用甲方接口未获取到任何信息',
            // 订单
            '7000': '页码非法'
        }
        this.whiteList = ['/User/setUserInfo'] // 为了检查有无数据
    }
    checkCodeMap(code, data, url) {
        if (this.codeMap[code] && code == '200') {
            if (!data 
                || (Array.isArray(data) && !data.length) 
                || (this.whiteList.indexOf(url) < 0 && typeof data == 'object' && !Object.keys(data).length)) {

                return {
                    msg: '数据为空',
                    error_no: 1
                }
            }
            return {
                msg: this.codeMap[code],
                error_no: 0
            };
        } else {
            return {
                msg: this.codeMap[code],
                error_no: 1
            }
        }
    }
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
	'/User/setUserInfo': {
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
                        },{
                            "sfxm": "收费项目",
                            "xmdj": "10",
                            "dw": "单位",
                            "xmfl": "项目分类",
                            "xmsl": "10",
                            "xmfyxj": "100.134"
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
                },{
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
                },{
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
    '/ThirdParty/getInpatientCostList0':  {
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
                            }
                        ]
                    },
                    "费用分类2": {
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
    },
    // 获取住院费用清单
    '/ThirdParty/getInpatientCostList1':  {
        "code": 200,
        "message": "success",
        "data": {
            "chargeTimeArr": {
                1531385396859: "eejeijfo"
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
                            }
                        ]
                    },
                    "费用分类2": {
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
                }
            }
        }
    },
    "/ThirdParty/getInpatientWaitPayList": {
        "code": 200,
        "message": "success",
        "data": {
            "brxm": "病人姓名",
            "rysj": "入院时间(甲方数据库格式化时间)",
            "dqks": "当前科室",
            "dqch": "当前床号",
            "yjje": "1000",
            "ycsfy": "1000",
            "zhye": "2000",
            "zyh": "住院号",
            "zycs": "住院次数",
            "brid": "病人ID",
            "rysj_time":"入院时间（时间戳）"
        }
    },
    "/Order/getInpatientNoAndTimeList": {
        "code": 200,
        "message": "success",
        "data": [
            {
                "serial_number": "abcd",
                "serial_number_list": [
                    "1",
                    "2"
                ]
            },
            {
                "serial_number": "eeee",
                "serial_number_list": [
                    "1"
                ]
            }
        ]
    },
    '/Hospital/getIsSinglePay': {
        "code": 200,
        "info": "success",
        "data":{
            "is_allow_single_pay": "1"
        }
    },
    // 获取是否广告
    '/Hospital/getIsOpenAdvert': {
        "code": 200,
        "info": "success",
        "data":{
            "advert_is_open": "1"
        }
    },
    // 广告详情
    '/Hospital/getOpenAdvert': {
        "code": 200,
        "info": "success",
        "data":{
            "id":"广告ID",
            "advert_name":"广告名称",
            "is_detail_skip":"0",
            "cover_img": "https://f10.baidu.com/it/u=690824487,874247919&fm=173&app=25&f=JPEG?w=640&h=600&s=61512B66DA2AA65752C0A49303004089&access=215967316",
            "is_allow_save_contacts":"是否允许用户留存信息",
            "advert_detail":"广告详情"
        }
    },
    '/Order/addOutpatientOrder': {
        'code': 200,
        "info": "success",
        "data": {
            // timeStamp: 1,
            // nonceStr: 2,
            // package: 2,
            // signType: 3,
            // paySign: 4
        }
    }
}

class Request extends CodeMap{
    constructor() {
        super();
        this.loadingFlag = false;
    }
    request (url, resolve, reject) {
        let {
            data,
            code
        } = strategy[url];
        let {
            msg,
            error_no // 1 错 0 继续
        } = this.checkCodeMap(code, data, url);
        let resData = {
            data,
            code
        }
        if (!error_no) {
            resolve(resData)
        } else {
            reject(msg);
        }
    }
    send({url, data, success, fail} = {url: '', data: {}, success: loop, fail: loop}) {

        !this.loadingFlag && wx.showLoading({
            title: '请稍等',
            mask: true
        })
        return new Promise((resolve, reject) => {
            // try {
                setTimeout(() => this.request(url, resolve, reject), 500)
                // const requestTask = wx.request({
                //     url: `${prefixUrl}${url}`,
                //     header: {
                //         'content-type': 'application/json'
                //     },
                //     data: {
                //         ...data, 
                //         hospita_unique_id: app.globalData.hospitalId
                //     },
                //     method: 'POST',
                //     success: (res) => {
                //         let {
                //             statusCode
                //         }
                //         if (statusCode != 200) {
                //             reject(statusCode);
                //             return;
                //         }
                //         let {
                //             data,
                //             code
                //         } = res.data;
                //         let {
                //             msg,
                //             error_no // 1 错 0 继续
                //         } = this.checkCodeMap(code, data);
                //         let resData = {
                //             data,
                //             code
                //         }
                //         if (!error_no) {
                //             resolve(resData)
                //         } else {
                //             reject(msg);
                //         }
                //     },
                //     fail: (err) => reject(err)
                // })
                // setTimeout(() => {requestTask.abort()}, 1000)
            // } catch (e) {
            //     reject('请求错误')
            // }
            
        })
        .then((resData) => {
            this.loadingFlag = false;
            wx.hideLoading();
            success && success(resData.data)
        })
        .catch((err = '') => {
            let msg = typeof err == 'object' ? err.errMsg : err;
            wx.showToast({
                title: msg,
                icon: 'loading',
                duration: 1000
            })
            fail && fail(msg)
        })
    }
}
let request = new Request();

module.exports = {
    formatTime,
    add,
	request: request.send.bind(request)
}

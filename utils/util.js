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
    }
}

const request = (params) => {
	let self = this;
	let {
		url,
		success,
		fail
	} = params;
	fail = fail || loop;
	success = success || loop;
	return new Promise((resolve) => {

		function request(url) {
			let data = strategy[url];
			let status = 200;
			let resData = {
				data,
				status
			}
			if (status === 200) {
				console.log('200')
				resolve(resData.data)
			} else {
				reject();
			}
		}
		request.call(this, url);

	})
	.then((resData) => {
		console.log('resolve')
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

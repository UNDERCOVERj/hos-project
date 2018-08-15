//app.js
App({
    onLaunch: function () {

        // 登录
        wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        console.log('launch')
        
    },
    onShow: function () {
        console.log('app show')
    },
    

    globalData: {
        hospitalId: 1234,
        hospitalName: "五四一医院缴费助手"
    }
})
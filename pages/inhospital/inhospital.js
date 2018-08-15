// pages/inhospital/inhospital.js

const app = getApp();
const WX = require('../../utils/util.js');

Page({

    /**
    * 页面的初始数据
    */
    data: {
        // info: {
            hospital: app.globalData.hospitalName, // 医院名
            name: '乐俊杰',// 姓名
            inhospitalId: 1234,// 住院号
            number: 2,// 次数
            time: new Date().toLocaleString(),// 住院时间
            department: '皮肤科',// 科室
            bedId: 34,// 床位号
            prepayPrice: 1200,// 预交金额
            expense: 3000,// 已产生费用
            balance: 2444,// 余额
        // },
        totalAmount: 0,
        canPay: false
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        let {
            zyNo,
            zyTimes
        } = options;

        WX.request({
            url: '/ThirdParty/getInpatientWaitPayList',
            success: (resData) => {
                let {
                    // hospital,
                    brxm: name,
                    zyh: inhospitalId,
                    zycs: number,
                    rysj: time,
                    dqks: department,
                    dqch: bedId,
                    yjje: prepayPrice,
                    ycsfy: expense,
                    zhye: balance
                } = resData;
                this.setData({
                    name,
                    inhospitalId,
                    number,
                    time,
                    department,
                    bedId,
                    prepayPrice,
                    expense,
                    balance
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

    },
    // 输入金额
    changeTotalAmount (e) {
        let value = e.detail.value;
        let canPayReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        this.setData({
            totalAmount: value,
            canPay: canPayReg.test(value)
        })
    },
    // 支付
    handlePayment () {

    }
})
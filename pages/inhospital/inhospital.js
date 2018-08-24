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

    // 输入金额
    changeTotalAmount (e) {
        let value = e.detail.value;
        let canPayReg = /(^[1-9]([0-9]+)?(\.[0-9]*)?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        this.setData({
            totalAmount: value,
            canPay: canPayReg.test(value)
        })
    },
    // 支付
    handlePayment () {
        let {
            canPay,
            zyTimes,
            zyNo,
            totalAmount
        } = this.data;
        if (canPay) {
            wx.navigateTo({
                url: `/pages/result/result?type=1&status=1&resultMsg=支付成功`
            })
            // let data = {
            //     inpatient_number: zyNo,
            //     serial_number: zyTimes,
            //     mini_open_id: wx.getStorageSync('mini_open_id'),
            //     pay_money: totalAmount
            // }
            // WX.request({
            //     url: '/Order/addInpatientOrder',
            //     data,
            //     success: (resData) => {
            //         let {
            //             timeStamp,
            //             nonceStr,
            //             package: _package,
            //             signType,
            //             paySign 
            //         } = resData;
            //         wx.requestPayment({
            //             timeStamp,
            //             nonceStr,
            //             package: _package,
            //             signType,
            //             paySign,
            //             success: () => {
            //                 wx.showToast({
            //                     title: '支付成功',
            //                     icon: 'success',
            //                     duration: 1000,
            //                     complete: () => {
            //                         wx.navigateTo({
            //                             url: `/pages/result/result?type=1&status=1&resultMsg=支付成功`
            //                         })
            //                     }
            //                 })
            //             },
            //             fail: this.failHandeler
            //         })
            //     },
            //     fail: this.failHandeler
            // })
        } else {
            wx.navigateTo({
                url: `/pages/result/result?type=1&status=0&resultMsg=支付失败`
            })
        }
    },
    failHandeler () {
        wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1000,
            complete: () => {
                wx.navigateTo({
                    url: `/pages/result/result?type=1&status=0&resultMsg=支付失败`
                })
            }
        })
    }
})
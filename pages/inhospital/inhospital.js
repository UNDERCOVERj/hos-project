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
            name: '',// 姓名
            inhospitalId: '',// 住院号
            number: '',// 次数
            time: '',// 住院时间
            department: '',// 科室
            bedId: '',// 床位号
            prepayPrice: '',// 预交金额
            expense: '',// 已产生费用
            balance: '',// 余额
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
            data: {
                zyNo,
                zyTimes
            },
            url: '/ThirdParty/getInpatientWaitPayList',
            success: (resData) => {
                let {
                    // hospital,
                    brxm: name,
                    zyh: inhospitalId,
                    zycs: number,
                    rysj_time: time,
                    dqks: department,
                    dqch: bedId,
                    yjje: prepayPrice,
                    zhye: expense,
                    wjfy: balance
                } = resData;
                time = (() => {
                    let date = new Date(+time*1000);
                    let year = date.getFullYear() + '';
                    let month = (date.getMonth() + 1) + '';
                    let day = date.getDate() + '';
                    month = ('00' + month).slice(month.length);
                    day = ('00' + day).slice(day.length);
                    return year + '-' + month + '-' + day;
                })()
                this.setData({
                    name,
                    inhospitalId,
                    number,
                    time,
                    department,
                    bedId,
                    prepayPrice,
                    expense,
                    balance,
                    zyNo,
                    zyTimes
                })
            }
        })
    },

    // 输入金额
    changeTotalAmount (e) {
        let value = e.detail.value;
        let canPayReg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        // /(^([1-9][0-9]*)$)|(^([0]\.\d?|[1-9][0-9]*\.\d?)[1-9]$)/ 这个就不可以以0结束
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
            // wx.navigateTo({
            //     url: `/pages/result/result?type=1&status=1&resultMsg=支付成功`
            // })
            let data = {
                inpatient_number: zyNo,
                serial_number: zyTimes,
                mini_open_id: wx.getStorageSync('mini_open_id'),
                pay_money: totalAmount
            }
            WX.request({
                url: '/Order/addInpatientOrder',
                data,
                success: (resData) => {
                    let {
                        timeStamp,
                        nonceStr,
                        package: _package,
                        signType,
                        paySign 
                    } = resData;
                    wx.requestPayment({
                        timeStamp,
                        nonceStr,
                        package: _package,
                        signType,
                        paySign,
                        success: () => {
                            wx.showToast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 1000,
                                complete: () => {
                                    wx.navigateTo({
                                        url: `/pages/result/result?type=1&status=1&resultMsg=支付成功`
                                    })
                                }
                            })
                        },
                        fail: this.failHandeler
                    })
                },
                fail: this.failHandeler
            })
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
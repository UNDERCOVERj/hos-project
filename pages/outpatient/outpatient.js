// pages/outpatient/outpatient.js

const WX = require('../../utils/util.js');
Page({

    /**
    * 页面的初始数据
    */
    data: {
        canSelect: false, // 是否可选择性支付
        name: '乐俊杰',// 姓名
        outpatientId: 123456789,// 门诊号
        totalExpense: 0, // 勾选的总共多少钱
        canPay: false, // 是否可以支付
        // cards: [
        //     {
        //         idx: 0,
        //         checked: false,
        //         billId: 1248,// 单据号
        //         time: new Date().toLocaleString(),// 划价时间
        //         totalExpense: 600,// 合计价钱
        //         isUnfold: false, // 是否展开，false未展开
        //         list: [
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药1233444云南白药1233444云南白药1233444',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'}
        //         ]   
        //     },
        //     {   
        //         idx: 1,
        //         checked: false,
        //         billId: 1247,// 单据号
        //         time: new Date().toLocaleString(),// 划价时间
        //         totalExpense: 600,// 合计价钱
        //         isUnfold: false, // 是否展开，false未展开
        //         list: [
        //             {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
        //             {project: '云南白药1233444云南白药1233444云南白药1233444',price: 24,quantity: 23, amount: '100.00'}
        //         ]   
        //     }
        // ]
        cards: []
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        let {mzNo} = options;

        WX.request({
            url: '/Hospital/getIsSinglePay',
            success: (resData) => {
                let {
                    is_allow_single_pay
                } = resData;
                WX.request({
                    url: '/ThirdParty/getOutpatientWaitPayList',
                    success: (resData) => {
                        

                        let {
                            mzh,
                            brid,
                            brxm,
                            dj_list // object
                        } = resData;
                        let cards = []
                        Object.keys(dj_list).forEach((key) => {
                            let list = dj_list[key];
                            let {
                                no,
                                hjsj_time,
                                sfxm_list // arr
                            } = list;
                            let card = {
                                checked: is_allow_single_pay == '1' ? false : true,
                                isUnfold: false,
                                billId: no,
                                time: hjsj_time,
                                totalExpense: 0,
                                list: []
                            }
                            card.list = sfxm_list.map((list_item) => {
                                let {   
                                    sfxm,
                                    xmdj,
                                    xmsl,
                                    xmfyxj
                                } = list_item;
                                card.totalExpense = WX.add(card.totalExpense, xmfyxj);
                                return { 
                                    project: sfxm,
                                    price: xmdj,
                                    quantity: xmsl,
                                    amount: xmfyxj
                                }
                            })
                            cards.push(card)
                        })

                        let totalExpense = cards.reduce((total, val, idx) => (total = WX.add(total, val.checked ? val.totalExpense : 0)), 0);

                        this.setData({
                            totalExpense: totalExpense,
                            canPay: totalExpense ? true : false,
                            canSelect: is_allow_single_pay == '1' ? true : false,
                            cards,
                            outpatientId: mzh,
                            name: brxm,
                            mzNo
                        })
                    }
                })
            }
        })
        
    },
    // 计算总共价钱，在多选框改变时计算,改变cards
    computeTotalExpense (e) {
        let value = e.detail.value;
        let total = 0;
        const cards = this.data.cards;
        cards.forEach((item, idx) => {
            if (value.indexOf(idx.toString()) !== -1) {
                cards[idx].checked = true;
            } else {
                cards[idx].checked = false;
            }
        })
        this.setData({
            cards
        }, () => {
            let cards = this.data.cards;
            let canPay = false;
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].checked) {
                    total = WX.add(total, cards[i].totalExpense);
                    canPay = true;
                }
            }
            this.setData({
                totalExpense: total,
                canPay
            })
        })
    },
    handlePayment() {
        let {
            canPay,
            cards,
            outpatientId
        } = this.data;

        let bill_number_arr = cards.map((item) => item.checked ? item.billId : '');

        if (canPay) {
            let data = {
                mini_open_id: wx.getStorageSync('mini_open_id'),
                outpatient_number: outpatientId,
                bill_number: bill_number_arr.join(',')
            }
            // 吊起微信支付
            WX.request({
                url: '/Order/addOutpatientOrder',
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
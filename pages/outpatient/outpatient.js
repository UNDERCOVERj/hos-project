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
    onLoad: function ({zyNo, zyTimes} = {zyNo: 0, zyTimes: 0}) {

        

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
                        checked: false,
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
                this.setData({
                    cards,
                    outpatientId: mzh,
                    name: brxm
                })
                WX.request({
                    url: '/Hospital/getIsSinglePay',
                    success: (resData) => {
                        let {
                            is_allow_single_pay
                        } = resData;
                        if (is_allow_single_pay == '1') {
                            this.setData({
                                canSelect: true
                            })
                        } else {
                            let totalExpense = cards.reduce((total, val, idx) => (total = WX.add(total, val.totalExpense)), 0);
                            this.setData({
                                totalExpense: totalExpense,
                                canPay: totalExpense ? true : false
                            })
                        }
                    }
                })
            }
        })
    },
    // 组件里改变isUnfold，需要在父组件同步改变
    // unfoldTable (e) {
    //     let {
    //         cardidx,
    //         type
    //     } = e.detail;
    //     let data = this.data[type];
    //     data[cardidx].isUnfold = !data[cardidx].isUnfold;
    //     this.setData({
    //         [type]: data
    //     })
    // },
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
    }
})
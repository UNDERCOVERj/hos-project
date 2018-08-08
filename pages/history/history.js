// pages/history/history.js
Page({

    /**
    * 页面的初始数据
    */
    data: {
        type: 1,
        navs: [
            {
                type: 1,
                title: '门诊账单'
            },
            {
                type: 2,
                title: '住院押金'
            },
            {
                type: 3,
                title: '住院费用清单'
            }
        ],
        // 日期选择四列
        years: [],
        months: [],
        days: [],
        prices: [],
        curPickerView: 0, // 表示第几个inhospitalBills的索引
        curYear: 0, // 表示years数组的选中项
        curMonth: 0, // 表示months数组的选中项
        curDay: 0, // 表示days数组的选中项
        curPrice: 0, // 表示prices数组的选中项
        pickerViewValue: [0, 0, 0, 0],
        pickerViewHiddenFlag: true,
        // 。。
        outpatientBills: [ // 门诊账单，没有时为null/空数组
            {
                outpatientId: 12,// 门诊号
                billId: 223,// 单据号
                totalExpense: 230,// 合计价钱
                isUnfold: false,
                list: [
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药1233444云南白药1233444云南白药1233444',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                    {project: '云南白药',price: 24,quantity: 23, amount: '100.00'}
                ]   
            },
            {
                outpatientId: 12,// 门诊号
                billId: 2234,// 单据号
                totalExpense: 230,// 合计价钱
                isUnfold: false,
                list: [
                    {
                        project: '云南白药啊啊啊啊',// 项目名
                        price: 12,// 单价
                        quantity: 10, // 数量
                        amount: 20// 小计
                    }
                ]   
            }
        ],
        inhospitalDeposit: [ // 住院押金，没有时为null/空数组
            {   
                inhospitalId: 123, // 住院号
                name: '乐俊杰',// 姓名
                orderId: 234,// 订单号
                expense: 123,// 缴费金额
                time: new Date().toLocaleString() // 缴费时间
            },
            {   
                inhospitalId: 123, // 住院号
                name: '乐俊杰',// 姓名
                orderId: 234,// 订单号
                expense: 123,// 缴费金额
                time: new Date().toLocaleString() // 缴费时间
            }
        ],
        inhospitalBills: [ // 这儿是通过住院号区分吗（数组形式还是单个对象形式？）？住院费用清单, 没有时为null/空数组
            {
                inhospitalId: 123,// 住院号
                name: '乐俊杰', // 姓名
                date: new Date().toLocaleString(),// 住院日期
                totalExpense: 123, // 费用合计
                priceInfo: [{ // 罗列日期价格，选择后可改变list
                    year: 2018,
                    months: [
                        {
                            month: 1,
                            days: [
                                {
                                    day: 23,
                                    price: 600
                                },
                                {
                                    day: 23,
                                    price: 600
                                }
                            ]
                        }
                    ]
                },{ // 罗列日期价格，选择后可改变list
                    year: 2017,
                    months: [
                        {
                            month: 4,
                            days: [
                                {
                                    day: 25,
                                    price: 500
                                },
                                {
                                    day: 25,
                                    price: 300
                                }
                            ]
                        }
                    ]
                }],
                card: {
                    list: [
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药1233444云南白药1233444云南白药1233444',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'},
                        {project: '云南白药',price: 24,quantity: 23, amount: '100.00'}
                    ],
                    totalExpense: 230,// 合计价钱 
                    isUnfold: false  
                }
            }
        ]
    },

    /**
    * 生命周期函数--监听页面加载 通过type来控制active页面
    */
    onLoad: function (options) {
        this.initialPickerViewData()
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

    switchToHistory (e) {
        let type = e.currentTarget.dataset.type;
        if (this.data.type !== type) {
            this.setData({
                type
            })
        }
    },
    // 组件里改变isUnfold，需要在父组件同步改变, 也是为了保持伸展状态
    unfoldTable (e) {
        let {
            cardidx,
            type
        } = e.detail;
        let data = this.data[type];
        if (type === 'inhospitalBills') {
            data[cardidx].card.isUnfold = !data[cardidx].card.isUnfold;
        } else {
            data[cardidx].isUnfold = !data[cardidx].isUnfold;
        }
        this.setData({
            [type]: data
        })
    },
    // 初始化picker-view所需日期数据
    initialPickerViewData () {
        const data = this.data;

        let {
            inhospitalBills,
            curPickerView,
            curYear,
            curMonth
        } = data;

        const priceInfo = inhospitalBills[curPickerView]['priceInfo'];
        const tempMonths = priceInfo[curYear]['months']; // 临时months

        const years = priceInfo.map((years) => years['year']);
        const months = tempMonths.map((months) => months['month']);
        const days = tempMonths[curMonth]['days'].map(days => days['day']);
        const prices = tempMonths[curMonth]['days'].map(days => days['price']);

        this.setData({
            years,
            months,
            days,
            prices
        })
    },
    // 处理picker 的change事件
    bindChange (e) {
        let value = e.detail.value;
        let [
            curYear,
            curMonth,
            curDay,
            curPrice
        ] = value;
        this.setData({
            curYear,
            curMonth,
            curDay,
            curPrice
        }, this.initialPickerViewData)
    },
    // 显示蒙层，传入pickerView所需的日期数据,根据索引来查找日期数据，并重新initial
    showModal (e) {
        const curPickerView = e.currentTarget.dataset.curPickerView || 0;
        this.setData({
            curPickerView,
            pickerViewHiddenFlag: false
        }, this.initialPickerViewData)
    },
    // 隐藏蒙层
    cancelModal () {
        this.setData({
            pickerViewHiddenFlag: true
        })
    },
    // 确认改变蒙层
    confirmModal () {

    }
})
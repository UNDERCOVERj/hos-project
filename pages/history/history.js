// pages/history/history.js
const WX = require('../../utils/util.js');
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
        inhospitalIds: [],
        inhospitalId: [0],
        // 结合下面两个去请求
        inhospitalIdIndex: 0,// 第几个
        pickerViewHiddenFlag: true, // 日趋选择
        inhospitalIdHiddenFlag: true, // 住院次数选择
        outpatientBills: [],
        // outpatientBills: [ // 门诊账单，没有时为null/空数组
        //     {
        //         outpatientId: 12,// 门诊号
        //         billId: 223,// 单据号
        //         totalExpense: 230,// 合计价钱
        //         isUnfold: false,
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
        //         outpatientId: 12,// 门诊号
        //         billId: 2234,// 单据号
        //         totalExpense: 230,// 合计价钱
        //         isUnfold: false,
        //         list: [
        //             {
        //                 project: '云南白药啊啊啊啊',// 项目名
        //                 price: 12,// 单价
        //                 quantity: 10, // 数量
        //                 amount: 20// 小计
        //             }
        //         ]   
        //     }
        // ],
        inhospitalDeposit: [],
        // inhospitalDeposit: [ // 住院押金，没有时为null/空数组
        //     {   
        //         inhospitalId: 123, // 住院号
        //         name: '乐俊杰',// 姓名
        //         orderId: 234,// 订单号
        //         expense: 123,// 缴费金额
        //         time: new Date().toLocaleString() // 缴费时间
        //     },
        //     {   
        //         inhospitalId: 123, // 住院号
        //         name: '乐俊杰',// 姓名
        //         orderId: 234,// 订单号
        //         expense: 123,// 缴费金额
        //         time: new Date().toLocaleString() // 缴费时间
        //     }
        // ],
        inhospitalBills: [],
        // inhospitalBills: [ // 这儿是通过住院号区分吗（数组形式还是单个对象形式？）？住院费用清单, 没有时为null/空数组
        //     {
        //         inhospitalId: 123,// 住院号
        //         name: '乐俊杰', // 姓名
        //         date: new Date().toLocaleString(),// 住院日期
        //         totalExpense: 123, // 费用合计
        //         priceInfo: [{ // 罗列日期价格，选择后可改变list
        //             year: 2018,
        //             months: [
        //                 {
        //                     month: 1,
        //                     days: [
        //                         {
        //                             day: 23,
        //                             price: 600
        //                         },
        //                         {
        //                             day: 23,
        //                             price: 600
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },{ // 罗列日期价格，选择后可改变list
        //             year: 2017,
        //             months: [
        //                 {
        //                     month: 4,
        //                     days: [
        //                         {
        //                             day: 25,
        //                             price: 500
        //                         },
        //                         {
        //                             day: 25,
        //                             price: 300
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }],
        //         card: {
        //             '分类1':{
        //                 list: [
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药1233444云南白药1233444云南白药1233444',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'}
        //                 ],
        //                 totalExpense: 230,// 合计价钱 
        //                 isUnfold: false
        //             },
        //             '分类2':{
        //                 list: [
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药1233444云南白药1233444云南白药1233444',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'},
        //                     {project: '云南白药',price: 24,quantity: 23, amount: '100.00', category: '分类'}
        //                 ],
        //                 totalExpense: 230,// 合计价钱 
        //                 isUnfold: false
        //             },
        //         }
        //     }
        // ]
    },

    /**
    * 生命周期函数--监听页面加载 通过type来控制active页面
    */
    onLoad: function (options) {
        // this.initialPickerViewData()
        let {
            type
        } = options;
        this.initialData(type)
    },

    switchToHistory (e) {
        let type = e.currentTarget.dataset.type;
        if (this.data.type !== type) {
            this.setData({
                type
            }, () => this.initialData(type))
        }
        
    },
    // 组件里改变isUnfold，需要在父组件同步改变, 也是为了保持伸展状态
    // unfoldTable (e) {
    //     let {
    //         cardidx,
    //         type
    //     } = e.detail;
    //     let data = this.data[type];
    //     if (type === 'inhospitalBills') {
    //         data[cardidx].card.isUnfold = !data[cardidx].card.isUnfold;
    //     } else {
    //         data[cardidx].isUnfold = !data[cardidx].isUnfold;
    //     }
    //     this.setData({
    //         [type]: data
    //     })
    // },
    // 初始化picker-view所需日期数据
    initialPickerViewData (flag) { // flag表明是不是第一次
        const data = this.data;

        let {
            inhospitalBills,
            curPickerView
        } = data;

        let {
            curYear,
            curMonth,
            curDay,
            curPrice,
            years,
            months,
            days,
            prices,
            chargeTime
        } = inhospitalBills[curPickerView]

        const priceInfo = inhospitalBills[curPickerView]['priceInfo'];
        
        if (!priceInfo.length) return;

        let tempMonths;

        // 初次显示最后一条
        if (!inhospitalBills[curPickerView].showFlag) {
            tempMonths = priceInfo[priceInfo.length - 1]['months']; // 临时months
            years = priceInfo.map((years) => years['year']);
            months = tempMonths.map((months) => months['month']);
            days = tempMonths[tempMonths.length - 1]['days'].map(days => days['day']);
            prices = tempMonths[tempMonths.length - 1]['days'].map(days => days['price']);
            chargeTime = tempMonths[tempMonths.length - 1]['days'].map(days => days['chargeTime']);
            curYear = years.length - 1;
            curMonth = months.length - 1;
            curDay = days.length - 1;
            curPrice = prices.length -1;
        } else {
            tempMonths = priceInfo[curYear]['months']; // 临时months
            years = priceInfo.map((years) => years['year']);
            months = tempMonths.map((months) => months['month']);
            days = tempMonths[curMonth]['days'].map(days => days['day']);
            prices = tempMonths[curMonth]['days'].map(days => days['price']);
            chargeTime = tempMonths[curMonth]['days'].map(days => days['chargeTime']);
        }

        this.setData({
            ["inhospitalBills[" + curPickerView + "].curYear"]: curYear,
            ["inhospitalBills[" + curPickerView + "].curMonth"]: curMonth,
            ["inhospitalBills[" + curPickerView + "].curDay"]: curDay,
            ["inhospitalBills[" + curPickerView + "].curPrice"]: curPrice,
            ["inhospitalBills[" + curPickerView + "].years"]: years,
            ["inhospitalBills[" + curPickerView + "].months"]: months,
            ["inhospitalBills[" + curPickerView + "].days"]: days,
            ["inhospitalBills[" + curPickerView + "].prices"]: prices,
            ["inhospitalBills[" + curPickerView + "].pickerViewValue"]: [curYear, curMonth, curDay, curPrice],
            pickerViewHiddenFlag: false,
            ["inhospitalBills[" + curPickerView + "].chargeTime"]: chargeTime, // 切换时切换chargeTime
            ["inhospitalBills[" + curPickerView + "].priceDate"]: [years[curYear], months[curMonth], days[curDay]].join('-'),
            ["inhospitalBills[" + curPickerView + "].showFlag"]: true
        })
    },
    // 处理picker 的change事件
    bindChange (e) {
        let value = e.detail.value;
        const data = this.data;
        let {
            inhospitalBills,
            curPickerView
        } = data;
        let [
            tempCurYear,
            tempCurMonth,
            tempCurDay,
            tempCurPrice
        ] = value;

        let {
            curYear,
            curMonth,
            curDay,
            curPrice,
            years,
            months,
            days,
            prices,
            chargeTime
        } = inhospitalBills[curPickerView];

        const priceInfo = inhospitalBills[curPickerView]['priceInfo'];

        if (!priceInfo.length) return;

        if (tempCurYear !== curYear) { // 改变的是年
            let yearidx = priceInfo.findIndex(item => item.year === years[tempCurYear]);
            curYear = tempCurYear;
            // const years = priceInfo.map((years) => years['year']);
            curMonth = 0;
            months = priceInfo[yearidx].months.map((months) => months['month']);
            curDay = 0;
            days = priceInfo[yearidx].months[0]['days'].map(days => days['day']);
            curPrice = 0;
            prices = priceInfo[yearidx].months[0]['days'].map(days => days['price']);
            chargeTime = priceInfo[yearidx].months[0]['days'].map(days => days['chargeTime']);
        } else if (tempCurMonth !== curMonth) {
            curMonth = tempCurMonth;
            let monthidx = priceInfo[curYear].months.findIndex(item => item.month === months[tempCurMonth]);
            curDay = 0;
            days = priceInfo[curYear].months[monthidx]['days'].map(days => days['day']);
            curPrice = 0;
            prices = priceInfo[curYear].months[monthidx]['days'].map(days => days['price']);
            chargeTime = priceInfo[curYear].months[monthidx]['days'].map(days => days['chargeTime']);
        } else {
            curPrice = curDay = tempCurDay !== curDay ? tempCurDay: tempCurPrice; // 同时改变
        }
        this.setData({
            ["inhospitalBills[" + curPickerView + "].curYear"]: curYear,
            ["inhospitalBills[" + curPickerView + "].curMonth"]: curMonth,
            ["inhospitalBills[" + curPickerView + "].curDay"]: curDay,
            ["inhospitalBills[" + curPickerView + "].curPrice"]: curPrice,
            ["inhospitalBills[" + curPickerView + "].years"]: years,
            ["inhospitalBills[" + curPickerView + "].months"]: months,
            ["inhospitalBills[" + curPickerView + "].days"]: days,
            ["inhospitalBills[" + curPickerView + "].prices"]: prices,
            ["inhospitalBills[" + curPickerView + "].pickerViewValue"]: [curYear, curMonth, curDay, curPrice],
            ["inhospitalBills[" + curPickerView + "].chargeTime"]: chargeTime, // 切换时切换chargeTime
            ["inhospitalBills[" + curPickerView + "].priceDate"] : [years[curYear], months[curMonth], days[curDay]].join('-')
        })
    },
    // 显示蒙层，传入pickerView所需的日期数据,根据索引来查找日期数据，并重新initial
    showModal (e) {
        const curPickerView = e.currentTarget.dataset.curpickerview || 0; // 必须小写了
        this.setData({
            // inhospitalIdIndex: curPickerView, // 第几个大卡片
            serial_number_list: this.data.inhospitalIds[curPickerView].serial_number_list, // 第几个大卡片的serial_number_list
            curPickerView: curPickerView, // 第几个大卡片的时间表
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
        let {
            curPickerView,
            inhospitalBills,
        } = this.data;
        let {
            costList,
            chargeTime,
            curPrice
        } = inhospitalBills[curPickerView]
        let cloneCards = JSON.parse(JSON.stringify(inhospitalBills));
        cloneCards[curPickerView].card = this.getCard(chargeTime[curPrice], costList);
        this.setData({
            ["inhospitalBills[" + curPickerView + "].card"]: this.getCard(chargeTime[curPrice], costList)
        }, () => {
            this.selectComponent('#table' + curPickerView)._ready(); // 光setData不足以影响子组件,需要调用子组件方法
            this.setData({
                pickerViewHiddenFlag: true
            })
        })
    },
    // 初始化数据
    initialData (type) {
        if (type == 1) {
            if (this.data.outpatientBills && this.data.outpatientBills.length) return;
            WX.request({
                url: '/Order/getOutpatientOrderList',
                data: {
                    mini_open_id: wx.getStorageSync('mini_open_id'),
                    page_size: 1000,
                    page_num: "1"
                },
                success: (resData) => {
                    let list = resData.list;
                    let outpatientBills = [];
                    list.forEach((listItem) => {
                        let {
                            outpatient_number,
                            bill_number,
                            real_money,
                            patient_name,
                            project_list
                        } = listItem;
                        let item = {
                            outpatientId: outpatient_number,
                            billId: bill_number,
                            patient_name,
                            totalExpense: real_money,
                            list: []
                        };
                        item.list = project_list.map((item) => {
                            let {
                                project_name,
                                unit_price,
                                num,
                                sum_price
                            } = item;
                            return {
                                project: project_name,
                                price: unit_price,
                                quantity: num,
                                amount: sum_price
                            }
                        })
                        outpatientBills.push(item);
                    })
                    this.setData({
                        outpatientBills
                    })
                }
            })
        } else if (type == 2) {
            if (this.data.inhospitalDeposit && this.data.inhospitalDeposit.length) return;
            WX.request({
                url: '/Order/getInpatientOrderList',
                data: {
                    mini_open_id: wx.getStorageSync('mini_open_id'),
                    page_size: 1000,
                    page_num: "1"
                },
                success: (resData) => {
                    let list = resData.list;
                    let inhospitalDeposit = [];
                    inhospitalDeposit = list.map((item) => {
                        let {
                            inpatient_number,
                            order_number,
                            pay_money,
                            pay_time_date,
                            patient_name
                        } = item;
                        return {
                            inhospitalId: inpatient_number,
                            name: patient_name,
                            orderId: order_number,
                            expense: pay_money,
                            time: pay_time_date
                        }
                    })
                    this.setData({
                        inhospitalDeposit
                    })
                }
            })
        } else if (type == 3) {
            if (this.data.inhospitalBills && this.data.inhospitalBills.length) return;
            WX.request({
                url: '/Order/getInpatientNoAndTimeList',
                data: {
                    mini_open_id: wx.getStorageSync('mini_open_id')
                },
                success: (resData) => {
                    this.setData({
                        inhospitalIds: resData.map(item => ({...item, curInhospitalIndex: 0})),
                        curPickerView: 0
                    }, this.getInpationetNoAndTimeLists) // 首次进入，多个卡片，包含住院号的
                }
            })
            
        }
    },
    getInpationetNoAndTimeLists() {
        let {
            inhospitalIds
        } = this.data;
        let keys = inhospitalIds.map((item, idx) => {
            let data = {
                zyNo: item.inpatient_number,
                zyTimes: item.serial_number_list[item.curInhospitalIndex]
            };
            return new Promise((resolve, reject) => {
                WX.request({
                    // url: '/ThirdParty/getInpatientCostList' + idx,
                    url: '/ThirdParty/getInpatientCostList',
                    data,
                    success: (resData) => {
                        resolve(resData);
                    },
                    fail: (err) => {
                        reject(err);
                    }
                })
            })
        })
        Promise.all(keys)
            .then(res => {
                let inhospitalBills = [];
                res.forEach((resData) => {
                    let {
                        chargeTimeArr,
                        patientInfo,
                        costList
                    } = resData;
                    // 改变 chargeTimeArr： time：price

                    // 将key改成ms
                    let transChargeTimeArr = {};
                    let transCostList = {};
                    for (let key in chargeTimeArr) {
                        transChargeTimeArr[+key * 1000] = chargeTimeArr[key];
                        transCostList[+key * 1000] = costList[key];
                    }
                    chargeTimeArr = transChargeTimeArr;
                    costList = transCostList;

                    // 初次选择了的日期
                    let tempChargeTimeArr = Object.keys(chargeTimeArr);
                    tempChargeTimeArr.sort((prev, now) => +prev > +now);
                    let initialPriceDate = new Date(+tempChargeTimeArr[tempChargeTimeArr.length - 1]);
                    let priceDate = initialPriceDate.getFullYear() 
                                    + '-' 
                                    + (initialPriceDate.getMonth() + 1)
                                    + '-' 
                                    + initialPriceDate.getDate();

                    let chargeTimes = {}; // 对应时间戳的各个分类的总价
                    // Object.keys(tempChargeTimeArr).forEach(time => {
                    tempChargeTimeArr.forEach(time => {
                        let total = 0;
                        Object.keys(costList[time]).forEach(item => {
                            total = WX.add(total, +costList[time][item].category_total_cost);
                        })
                        chargeTimes[time] = total;
                    })
    
                    let {
                        name,
                        admission_time_date,
                        total_cost
                    } = patientInfo;
                    let inhospitalBill = {
                        showFlag: false, // 表示还没有触发modal，这个在之后会改变
                        name,
                        years: [],
                        months: [],
                        days: [],
                        prices: [],
                        chargeTime: [],
                        curYear: 0, // 表示years数组的选中项
                        curMonth: 0, // 表示months数组的选中项
                        curDay: 0, // 表示days数组的选中项
                        curPrice: 0, // 表示prices数组的选中项
                        pickerViewValue: [0, 0, 0, 0],
                        priceDate, 
                        date: admission_time_date,
                        totalExpense: total_cost,
                        costList,
                        priceInfo: this.getPriceInfo(chargeTimes) || [],
                        // card: this.getCard(Object.keys(tempChargeTimeArr)[0], costList)
                        card: this.getCard(tempChargeTimeArr[tempChargeTimeArr.length - 1], costList)
                    }
                    inhospitalBills.push(inhospitalBill)
                })
                this.setData({inhospitalBills, costList: inhospitalBills.length && inhospitalBills[0].card || []})
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getInpationetNoAndTimeList() {
        let {
            curPickerView,
            inhospitalId,
            inhospitalIds
        } = this.data
        WX.request({
            // url: '/ThirdParty/getInpatientCostList' + (inhospitalIds[curPickerView].serial_number_list[inhospitalId[0]] - 1),
            url: '/ThirdParty/getInpatientCostList',
            data: {
                zyNo: inhospitalIds[curPickerView].inpatient_number, // error
                zyTimes: inhospitalIds[curPickerView].serial_number_list[inhospitalId[0]]
            },
            success: (resData) => {
                let {
                    chargeTimeArr,
                    patientInfo,
                    costList
                } = resData;
                // 改变 chargeTimeArr： time：price

                let transChargeTimeArr = {};
                let transCostList = {};
                for (let key in chargeTimeArr) {
                    transChargeTimeArr[+key * 1000] = chargeTimeArr[key];
                    transCostList[+key * 1000] = costList[key];
                }
                chargeTimeArr = transChargeTimeArr;
                costList = transCostList;

                // 初次选择了的日期
                let tempChargeTimeArr = Object.keys(chargeTimeArr);
                tempChargeTimeArr.sort((prev, now) => +prev > +now);
                let initialPriceDate = new Date(+tempChargeTimeArr[tempChargeTimeArr.length - 1]);
                let priceDate = initialPriceDate.getFullYear() 
                                + '-' 
                                + (initialPriceDate.getMonth() + 1)
                                + '-' 
                                + initialPriceDate.getDate();

                let chargeTimes = {}; // 对应时间戳的各个分类的总价
                // Object.keys(tempChargeTimeArr).forEach(time => {
                tempChargeTimeArr.forEach(time => {
                    let total = 0;
                    Object.keys(costList[time]).forEach(item => {
                        // total += +costList[time][item].category_total_cost;
                        total = WX.add(total, +costList[time][item].category_total_cost);
                    })
                    chargeTimes[time] = total;
                })

                let {
                    name,
                    admission_time_date,
                    total_cost
                } = patientInfo;
                let inhospitalBill = {
                    // inhospitalId: 'zy1245',
                    showFlag: false, // 表示还没有触发modal，这个在之后会改变
                    name,
                    years: [],
                    months: [],
                    days: [],
                    prices: [],
                    chargeTime: [],
                    // curPickerView: 0, // 表示第几个inhospitalBills的索引
                    curYear: 0, // 表示years数组的选中项
                    curMonth: 0, // 表示months数组的选中项
                    curDay: 0, // 表示days数组的选中项
                    curPrice: 0, // 表示prices数组的选中项
                    pickerViewValue: [0, 0, 0, 0],
                    priceDate, 
                    date: admission_time_date,
                    totalExpense: total_cost,
                    costList,
                    priceInfo: this.getPriceInfo(chargeTimes) || [],
                    // card: this.getCard(Object.keys(tempChargeTimeArr)[0], costList)
                    card: this.getCard(tempChargeTimeArr[tempChargeTimeArr.length - 1], costList)
                }
                this.setData({
                    ["inhospitalBills[" + curPickerView + "]"]: inhospitalBill
                }, () =>  {
                    this.selectComponent('#table' + curPickerView)._ready()
                })
            }
        })
    },
    // 住院费用清单，时间改变，改变costList
    getCard (time, costList) { // 时间戳
        let cards = costList[time];
        let returnCard = {};
        Object.keys(cards).forEach(_class => {
            let item = cards[_class];
            let {
                category_total_cost,
                project_list
            } = item
            returnCard[_class] = {
                totalExpense: category_total_cost,
                list: project_list.map((project) => ({
                    project: project.project_name,
                    price: project.project_unit_price,
                    quantity: project.project_num,
                    amount: project.project_sum_price
                }))
            }
        })  
        return returnCard;
    },
    getPriceInfo (chargeTimeArr = {}) {
        let priceInfo = []
        // 先排序
        let tempChargeTimeArr = Object.keys(chargeTimeArr);
        tempChargeTimeArr.sort((prev, now) => +prev > +now);

        tempChargeTimeArr.forEach((chargeTime) => {
            let time = new Date(+chargeTime);
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let price = chargeTimeArr[chargeTime];

            let yearidx = priceInfo.findIndex(val => val.year == year);
            if (yearidx < 0) { // 没有当前year
                priceInfo.push({
                    year,
                    months: [
                        {
                            month,
                            days: [{
                                day,
                                price,
                                chargeTime
                            }]
                        }
                    ]
                })
            } else { // 有当前year
                let months = priceInfo[yearidx].months;
                let monthidx = months.findIndex(val => val.month == month);
                if (monthidx < 0) { // 没有当前year & month
                    priceInfo[yearidx].months.push({
                        month,
                        days: [{
                            day,
                            price,
                            chargeTime
                        }]
                    })
                } else {
                    let days = priceInfo[yearidx].months[monthidx].days;
                    days.length && days.push({
                        day,
                        price,
                        chargeTime
                    })
                }
            }
        })
        return priceInfo;
    },
    showInhospitalModal (e) { // 改变第几个inhospitalIds
        let idx = e.target.dataset.idx;
        this.setData({
            serial_number_list: this.data.inhospitalIds[idx].serial_number_list, // 第几个大卡片的serial_number_list
            curPickerView: idx, // 第几个大卡片的时间表
            inhospitalIdHiddenFlag: false
        })
    },
    bindChangeInhospitalId (e) {
        let [
            idx
        ] = e.detail.value;
        let {
            inhospitalIds,
            curPickerView
        } = this.data;
        this.setData({
            inhospitalId: [idx]
        })

    },
    confirmInhospitalIdModal () {

        this.setData({
            inhospitalIdHiddenFlag: true,
            ["inhospitalIds[" + this.data.curPickerView +"].curInhospitalIndex"]: this.data.inhospitalId[0],
        }, this.getInpationetNoAndTimeList)
    },
    cancelInhospitalIdModal () {
        this.setData({
            inhospitalIdHiddenFlag: true
        })
    }
})
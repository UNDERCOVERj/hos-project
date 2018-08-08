// pages/home/home.js
const app = getApp();
const WX = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden: false,
        noticeHeight: 35,
        userInfo: {},
        curPage: 0,
        textSize: 14, // 这是字体大小
        notice: [],
        animationData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) { // 如果已经授权
                    this.invokeGetUserInfo();
                }
            }
        })
        this.animation = wx.createAnimation({ // 往左滑动的动画
            timingFunction: 'linear',
            transformOrigin: '0 0 0'
        })

        WX.request.call(this, {
            url: '/Hospital/getEnableNotticeList',
            success: (data) => {
                let notice = data.map((item) => {
                    return {"text": item.notice_detail}
                });
                this.setData({
                    notice 
                }, () => {
                    this.transToOrigin();
                    this.run();
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
    onShow: function() {
        if (!this.data.notice.length) return;
        this.transToOrigin();
        this.run();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.transToOrigin();
        this.setData({
            curPage: 0
        })
        clearTimeout(this.upTimer);
        clearTimeout(this.leftTimer);
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

    // 允许授权
    permitGetUserInfo () {
        this.invokeGetUserInfo();
    },
    // 调用 getUserInfo 获取头像昵称
    getUserInfo (successCb, failCb) {
        wx.getUserInfo({
            success: res => {
                successCb && successCb(res.userInfo);
            },
            fail: () => {
                failCb && failCb()
            }
        })
    },
    // 调用getUserInfo
    invokeGetUserInfo () {
        this.getUserInfo((userInfo) => {
            this.setData({
                hidden: true,
                userInfo: userInfo || {}
            }, this.getMiniOpenId)
        }, () => {
            this.setData({
                hidden: false,
                userInfo: {}
            })
        });        
    },

    getMiniOpenId () { // 获取mini_open_id
        let miniOpenId = wx.getStorageSync('mini_open_id');
        if (miniOpenId && miniOpenId != null) {
            this.setUserInfo();
        } else {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        //发起网络请求
                        WX.request.call(this, {
                            url: '/User/getUserOpenid',
                            data: {
                                jscode: res.code
                            },
                            success: (data) => { // 获得openid后，设置用户信息
                                wx.setStorageSync('mini_open_id', data.openid);
                                this.setUserInfo()
                            }
                        });
                    } else {
                        wx.showToast({
                            title: '登录失败',
                            icon: 'none',
                            duration: 1000
                        })
                    }
                }
            })
        }
    },

    // 设置用户信息
    setUserInfo () {
        let mini_open_id = wx.getStorageSync('mini_open_id');
        let {
            avatarUrl,
            nickName,
            gender
        } = this.data.userInfo;
        WX.request.call(this, {
            url: '/User/createdUser',
            data: {
                user_name: nickName,
                head_img: avatarUrl,
                sex: gender,
                mini_open_id
            },
            success: () => {
                console.log('设置用户信息成功')
            },
        })
    },

    // 扫码
    scanCode () {
        // 在跳转时，先将信息转成第一条
        this.transToOrigin();
        this.setData({
            curPage: 0
        }, () => {
            wx.scanCode({
                success: (res) => {
                    console.log(res)
                }
            })
        })        
        
    },
    // 跳转到历史详情
    switchToHistory () {
        // 在跳转时，先将信息转成第一条
        this.transToOrigin();
        this.setData({
            curPage: 0
        }, () => {
            wx.navigateTo({
                url: '/pages/history/history?type=1'
            })
        })
        
    },

    // 将text回到原点
    transToOrigin () {
        this.animation.translateX(0).translateY(0).step({duration: 0});
        this.setData({
            animationData: this.animation.export()
        })
    },
    // 将text上移
    upText (noticeHeight, upTime) {
        // 先达到将text上移的效果
        this.animation.translateY(-noticeHeight).step({duration: upTime});
        this.setData({
            animationData: this.animation.export()
        })
    },
    // 将text左移
    leftText (textLength, leftTime) {
        this.animation.translateX(-textLength).step({duration: leftTime});
        this.setData({
            animationData: this.animation.export()
        })         
    },      

    // 运行跑马灯
    run () {
        const data = this.data;
        let {
            notice,
            noticeHeight,
            curPage,
            textSize
        } = data;
        let text = notice[curPage].text;
        let textLen = text.length;

        let matchedLen = text.match(/[a-zA-Z0-9]/g) && text.match(/[a-zA-Z0-9]/g).length || 0; // 数字和字母的个数
        let slideLength = textLen - matchedLen/2; // 统计字符个数，数字和字母除以2

        let textLength = textLen * textSize;

        let step = 300; // 每个字符滚动时间ms
        let leftTime = step*slideLength; // 往左滑动的时间
        let upTime = (noticeHeight/textSize)*step; // 往上滑动时间

        const getNextPage = () => {
            return curPage = curPage >= (notice.length - 1) ? 0 : curPage + 1;
        }
        
        // 结合upText和leftText，先后顺序应注意
        const run = () => {
            this.upText(noticeHeight, upTime);
            this.upTimer = setTimeout(() => {
                this.leftText(textLength, leftTime);
                this.leftTimer = setTimeout(() => {
                    // this.transToOrigin() // 在左移完后，立即移动到原点，并改动文字信息内容，之后重新计算并执行滑动
                    this.transToOrigin();
                    this.setData({
                        curPage: getNextPage()
                    }, () => {
                        setTimeout(() => {
                            this.run()
                        }, 500)
                        
                    })
                }, leftTime + 100) // 等待左滑完成，100为设定的延迟
            }, upTime + 1000) // 上滑过后等待一秒
        }
        run()
    },

})
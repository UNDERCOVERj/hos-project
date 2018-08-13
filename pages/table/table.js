// pages/table/table.js
Component({
    /**
    * 组件的属性列表
    */
    properties: {
        card: Object,
        cardidx: Number,
        type: String, // 指示那个数组，回调函数需要用到
        classification: Number // 是否分类 1 分类 0 不分类
    },

    /**
    * 组件的初始数据
    */
    data: {
        size: 6, // 是否展开的门限
        componentCard: {}
    },
    ready () {
        this._ready();
    },
    /**
    * 组件的方法列表
    */
    methods: {
        _ready () {
            const card = this.data.card;
            if (!this.properties.classification) {
                this.setData({
                    componentCard: card
                }, this.changeCloneCard)
            } else {
                // 分类时
                this.setData({
                    componentCards: card,
                    size: 3
                }, this.changeCloneCards)
            }
        },
        unfoldTable (e) {
            const componentCard = this.data.componentCard;
            componentCard.isUnfold = !componentCard.isUnfold;
            this.setData({
                componentCard
            }, this.changeCloneCard)

            const params = {
                cardidx: e.currentTarget.dataset.cardidx, 
                type: this.data.type
            }
            // this.triggerEvent('custumevent', params)
        },
        changeCloneCard () { // 克隆一个card，以便于改变list数组
            const componentCard = this.data.componentCard;
            const cloneCard = JSON.parse(JSON.stringify(componentCard));
            let list = componentCard.list;
            cloneCard.list = !componentCard.isUnfold ? list.slice(0, this.data.size) : list.slice();
            this.setData({
                cloneCard
            })
        },
        unfoldTableClassification (e) {
            const componentCards = this.data.componentCards;
            let {
                cardidx, // 第几个卡片
                _class // 分类
            } = e.currentTarget.dataset;
            componentCards[_class].isUnfold = !componentCards[_class].isUnfold;
            this.setData({
                componentCards
            }, this.changeCloneCards)

            const params = {
                cardidx,
                _class
            }
            // this.triggerEvent('custumevent', params)
        },
        changeCloneCards () {

            const componentCards = this.data.componentCards;
            const cloneCards = JSON.parse(JSON.stringify(componentCards));
            const _classes = Object.keys(this.data.componentCards);

            for (let _class of _classes) {
                let list = componentCards[_class].list;
                cloneCards[_class].list = !componentCards[_class].isUnfold ? list.slice(0, this.data.size) : list.slice();
            }
            this.setData({
                cloneCards,
                _classes
            })

        }
    }
})

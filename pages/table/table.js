// pages/table/table.js
Component({
    /**
    * 组件的属性列表
    */
    properties: {
        card: Object,
        cardidx: Number,
        type: String // 指示那个数组，回调函数需要用到
    },

    /**
    * 组件的初始数据
    */
    data: {
        size: 6, // 是否展开的门限
        componentCard: {}
    },
    ready () {
        const card = this.data.card;
        this.setData({
            componentCard: card
        }, this.changeCloneCard)
    },
    /**
    * 组件的方法列表
    */
    methods: {
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
            this.triggerEvent('custumevent', params)
        },
        changeCloneCard () { // 克隆一个card，以便于改变list数组
            const componentCard = this.data.componentCard;
            const cloneCard = JSON.parse(JSON.stringify(componentCard));
            let list = componentCard.list;
            cloneCard.list = !componentCard.isUnfold ? list.slice(0, this.data.size) : list.slice();
            this.setData({
                cloneCard
            })
        }
    }
})

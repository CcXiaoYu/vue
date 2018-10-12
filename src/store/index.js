import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        carPanelData: [],
        maxOff: false, // 控制弹框显示隐藏
        carShow: false,
        carTimer: null,
        // 小球
        ball: {
            show: false,
            el: null,
            img: ''
        },
        orderData: [], // 订单所有的信息
        receiveInfo: [{
            "name": "王某某",
            "phone": "13811111111",
            "areaCode": "010",
            "landLine": "64627856",
            "provinceId": 110000,
            "province": "北京市",
            "cityId": 110100,
            "city": "市辖区",
            "countyId": 110106,
            "county": "海淀区",
            "add": "上地十街辉煌国际西6号楼319室",
            "default": true
          },{
            "name": "李某某",
            "phone": "13811111111",
            "areaCode": "010",
            "landLine": "64627856",
            "provinceId": 110000,
            "province": "北京市",
            "cityId": 110100,
            "city": "市辖区",
            "countyId": 110106,
            "county": "海淀区",
            "add": "上地十街辉煌国际东6号楼350室",
            "default": false
          }]
      
    },
    getters: {
        // 总数
        totleCount (state) {
            let count = 0;
            state.carPanelData.forEach( (goods) => {
                count += goods.count;
            })
            return count;
        },
        // 总价
        totlePrice (state) {
            let price = 0;
            state.carPanelData.forEach( (goods) => {
                price += goods.price * goods.count;
            })
            return price;
        },
        // 全选
        allChecked (state) {
            let allChecked = true;
            state.carPanelData.forEach ( (goods) => {
                if( !goods.checked ) {
                    allChecked = false;
                    return;
                }
            })
            return allChecked;
        },
        // 选中的总数
        checkedCount (state) {
            let count = 0;
            state.carPanelData.forEach ( (goods) => {
                if( goods.checked ) {
                    count += goods.count;
                }
            })
            return count;
        },
        // 选中的总价
        checkedPrice (state) {
            let price = 0;
            state.carPanelData.forEach ( (goods) => {
                if( goods.checked ) {
                    price += goods.count * goods.price;
                }
            })
            return price;
        },

        // 选中的商品
        checkedGoods (state) {
            let checkedGoodsArr = [];
            state.carPanelData.forEach( (goods) => {
                if( goods.checked ) {
                    checkedGoodsArr.push(goods);
                }
            })
            return checkedGoodsArr;
        }
    },
    mutations: {
        // 添加
        addCarPanelData (state, data) {
            let bOff = true;
            if (!state.ball.show) {
                state.carPanelData.forEach( (goods) => {
                    if( goods.sku_id === data.info.sku_id ) {
                        goods.count += data.count;
                        bOff = false;
                        if( goods.count > goods.limit_num ) {
                            goods.count -= data.count;
                            state.maxOff = true;
                            return; 
                        }
                        state.carShow = true;
                        state.ball.show = true;
                        state.ball.img = data.info.ali_image;
                        state.ball.el = event.path[0]
                    }
                   
                })
                if(bOff) {
                    let goodsData = data.info;
                    Vue.set(goodsData, 'count', data.count);
                    Vue.set(goodsData, 'checked', true);
                    state.carPanelData.push(goodsData);
                    state.carShow = true;
                    state.ball.show = true;
                    state.ball.img = data.info.ali_image;
                    state.ball.el = event.path[0]
                }
            }
        },
        // 删除
        delCarPanelData (state, id) {
            state.carPanelData.forEach( (goods, index) => {
                if( goods.sku_id === id ) {
                    state.carPanelData.splice(index, 1);
                    return;
                }
            })
        },
        // 关闭弹窗
        closePrompt (state) {
            state.maxOff = false;
        },
        // 购物车显示隐藏
        showCar (state) {
            clearTimeout(state.carTimer)
            state.carShow = true;
        },
        hideCar (state) {
            state.carTimer = setTimeout(() => {
                state.carShow = false;
            }, 1000);
        },
        // 购物车 加减
        plusCarPanelData (state, id) {
            state.carPanelData.forEach( (goods) => {
                if( goods.sku_id === id ) {
                    if( goods.count >= goods.limit_num ) {
                        return;
                    }
                    goods.count ++;
                }
            })
        },
        subCarPanelData (state, id) {
            state.carPanelData.forEach( (goods) => {
                if( goods.sku_id  === id ) {
                    if( goods.count <= 1 ) {
                        return;
                    }
                    goods.count --;
                }
            })
        },
        // 购物车 单选 
        checkGoods (state, id) {
            state.carPanelData.forEach ( (goods) => {
                if( goods.sku_id === id ) {
                    goods.checked = !goods.checked;
                    return;
                }
            })
        },
        // 购物车 点击全选 
        allCheckGoods (state, allChecked) {
            state.carPanelData.forEach ( (goods) => {
                goods.checked = !allChecked;
            })
        },
        // 删除选中的商品
        dleCheckGoods (state) {
            let i = state.carPanelData.length;
            while(i--) {
                if( state.carPanelData[i].checked ) {
                    state.carPanelData.splice(i, 1);
                }
            }
            // state.carPanelData.forEach ( (goods, index) => {
            //     if( goods.checked ) {
            //         state.carPanelData.splice(index, 1);
            //     }
            // })
        },
        submitReceive (state, data) {
            if( data.default ) {
                state.receiveInfo.forEach ( receive => {
                    receive.default = false;
                })
            }
            state.receiveInfo.push(data);
        },


        // 提交订单
        submitOrder (state, data) {
            state.orderData.unshift(data);
            let i = state.carPanelData.length;
            while( i-- ) {
                if( state.carPanelData[i].checked ) {
                    state.carPanelData.splice(i,1);
                } 
            }
        },

        // 付款
        payNow (state, id) {
            state.orderData.forEach ( order => {
                if( order.orderId === id ) {
                    order.isPay = true;
                    return;
                }
            })
        },


        checkDefault (state,data) {
            state.receiveInfo.forEach((receive,index) => {
                if (receive==data) {
                receive.default = true
        //        state.receiveInfo.unshift(state.receiveInfo.splice(index,1)[0])
                } else {
                receive.default = false
                }
            })
        },

        submitReceive (state,data) {
            if(data[0].default){
              state.receiveInfo.forEach((receive,index) => {
                receive.default = false
                receive.checked = false
              })
      //      state.receiveInfo.unshift(data)
      //      return
            }
            if(data[1]==null){
              state.receiveInfo.push(data[0])
            }else{
              console.log(data[0])
              state.receiveInfo[data[1]] = data[0]
            }
        }
    }
})

export default store

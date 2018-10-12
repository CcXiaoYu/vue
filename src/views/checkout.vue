

<template>
    <div id="main">
        <div class="content page-order-checkout checkout">
            <div class="js-checkout-address-box">
                <div class="gray-box clear">
                    <div class="title columns-title pre-title">
                        <h2>收货信息</h2>
                    </div>
                    <div class="box-inner js-checkout-address-panel ">
                        <div class="address-common-table js-multiple-address-panel">
                            <ul class="address-item-list clear js-address-item-list">
                                <li 
                                    :class="{' selected-address-item': receiveIndex == index}" 
                                    class="js-choose-address"
                                    v-for="item,index in receiveInfo"
                                    @click="chooseReceive(index)"
                                >
                                    <div class="address-item">
                                        <div class="name-section">  {{item.name}}  </div>
                                        <div class="mobile-section">{{item.phone}}</div>
                                        <div class="detail-section"> {{item.province}} {{item.city}} {{item.county}}<br> {{item.add}} </div>
                                    </div>
                                    <div class="operation-section">
                                        <span class="update-btn js-edit-address">修改</span>
                                        <span class="delete-btn js-delete-address">删除</span>
                                    </div>
                                </li>
                                <li class="add-address-item js-add-address" @click="showPop()">
                                    <p>使用新地址</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gray-box">
                <div class="title">
                    <h2>发票信息</h2>
                </div>
                <div class="box-inner invoice-box js-invoice-box"> 
                    <p class="invoice-detail"> 发票类型：电子发票 </p> 
                    <div class="invoice-detail"> 发票抬头： 
                        <div class="radio-box"> 
                            <label> 
                                <input type="radio" class="hide"> 
                                <span 
                                    class="blue-radio"
                                    :class="{'blue-radio-on':invoice.prosonal}"
                                    @click="checkedInvoice(true)"
                                ><a></a></span>  个人
                            </label> 
                            <label> 
                                <input type="radio" class="hide"> 
                                <span 
                                    class="blue-radio"
                                    :class="{'blue-radio-on':!invoice.prosonal}"
                                    @click="checkedInvoice(false)"
                                ><a></a></span>  单位
                            </label> 
                        </div> 
                        <div 
                            class="module-form-row form-item fn-hide js-invoice-title"
                            v-if="!invoice.prosonal"
                        > 
                            <div class="module-form-item-wrapper no-icon small-item"> 
                                <i v-show="!invoice.name">请填写公司发票抬头</i> 
                                <input type="text" class="js-verify" v-model="invoice.name">
                            </div> 
                        </div> 
                    </div> 
                    <p class="invoice-detail">发票内容：购买商品明细</p> <p class="invoice-label"> 电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。 </p>
                </div>
            </div>
            <div class="gray-box">
                <div class="title pre-title">
                    <h2>购物清单</h2> 
                </div>
                <div class="box-inner ui-goods-cart">
                    <div class="gray-sub-title cart-table-title"> 
                        <span class="name">商品名称</span> 
                        <span class="subtotal">小计</span> 
                        <span class="num">数量</span> 
                        <span class="price">单价</span> 
                    </div>
                    <div class="cart-table">
                        <div class="cart-group js-cart-group">
                            <div class="cart-items" v-for="item,index in checkedGoods">
                                <div class="items-thumb">  
                                    <a href="javascript:;" target="_blank"><img :src="item.ali_image + '?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></a>  
                                </div>
                                <div class="name hide-row">
                                    <div class="name-cell"> 
                                        <a href="javascript:;" :title="item.title + '（'+item.spec_json.show_name+'）'" target="_blank">{{item.title}} （{{item.spec_json.show_name}}）</a>
                                    </div>
                                </div>
                                <div class="subtotal">
                                    <div class="subtotal-cell">  ¥ {{item.count * item.price}}  </div> 
                                </div>
                                <div class="goods-num">{{item.count}}</div>
                                <div class="price">¥ {{item.price}}</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="box-inner"> 
                    <div class="order-discount-line"> 
                        <p> 商品总计： <span>¥ {{checkedPrice}}</span> </p> 
                        <p> 运费： <span>+ ¥ {{freight}}</span> </p>  
                        <p class="discount-line js-discount-cash"> <em>现金券</em>： <span> - 0 </span> </p>  
                    </div> 
                </div>
                <div class="box-inner"> 
                    <div class="last-payment clear"> 
                        <span class="jianguo-blue-main-btn big-main-btn payment-blue-bt fn-right js-checkout" @click="submitOrderHandle"> <a>提交订单</a> </span> <span class="prices fn-right">应付金额： <em>¥ {{checkedPrice + freight}}</em></span> 
                    </div> 
                </div>
            </div>
        </div>
        <address-pop @close="closePop" v-if="popShow"></address-pop>
    </div>
</template>

<script>
    import addressPop from '@/components/address-pop';

    export default {
        data () {
            return {
                receiveIndex: 0,
                popShow: false,
                // 发票信息
                invoice: {
                    prosonal: true,
                    name: ''
                }
            }
        },
        created () {
            this.$store.state.receiveInfo.forEach( (receives,index) => {
                if( receives.default ) {
                    this.receiveIndex = index;
                    return;
                }
            })
        },
        components: {
            addressPop
        },
        computed: {
            checkedGoods () {
                return this.$store.getters.checkedGoods;
            }, 
            checkedPrice () {
                return this.$store.getters.checkedPrice;
            },
            // 运费
            freight () {
                let freight = 8;
                if( this.checkedPrice > 88 ) {
                    freight = 0;
                }
                return freight;
            },
            receiveInfo () {
                return this.$store.state.receiveInfo;
            }
        },
        methods: {
            chooseReceive (index) {
                this.receiveIndex = index;
            },
            closePop () {
                this.popShow = false;
                this.$store.state.receiveInfo.forEach( (receives,index) => {
                    if( receives.default ) {
                        this.receiveIndex = index;
                        return;
                    }
                })
            },
            showPop () {
                this.popShow = true;
            },
            // 选择的个人还是公司
            checkedInvoice (boole) {
                this.invoice.prosonal = boole;
            },

            // 提交订单
            submitOrderHandle () {
                if( !this.invoice.prosonal && !this.invoice.name ) return;
                let  receiveInfo = this.receiveInfo[this.receiveIndex];
                if( this.invoice.prosonal ) {
                    this.invoice.name = '个人';
                }
                let iDate = new Date();
                let month = iDate.getMonth();
                let day = iDate.getDate();
                if ( month >= 1 && month <= 9 ) {
                    month = '0' + month;
                }
                if ( day >= 1 && day <= 9 ) {
                    day = '0' + day;
                }
                let data = {
                    orderId: iDate.getTime(),
                    goodsData: this.checkedGoods,
                    price: this.checkedPrice,
                    freight: this.freight,
                    invoiceName: this.invoice.name,
                    iDate: iDate.getFullYear() + '-' + month + '-' + day,
                    receiveInfo: receiveInfo,
                    isPay: false
                }
                this.$store.commit('submitOrder', data);
                this.$router.push({name: 'Payment', query: {orderId: data.orderId}})
            }
        }
    }
</script>

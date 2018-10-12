<template>
  <div class="item">
    <div>
      <div class="item-img"><img :alt="item.name" :src="item.sku_info[itemIndex].ali_image" style="opacity: 1;">
      </div>
      <h6>{{item.name}}</h6>
      <h3>{{item.name_title}}</h3>
      <div class="params-colors">
        <ul class="colors-list">
          <li v-for="sku,index in item.sku_info">
            <a 
                href="javascript:;"
                @click="tableData(index)" 
                :data-index="index" 
                :title="sku.spec_json.show_name" 
                :class="{'active':index==itemIndex}"
            >
                <img :src="'http://img01.smartisanos.cn/'+ sku.spec_json.image +'/20X20.jpg'">
            </a>
          </li>
        </ul>
      </div>
      <div class="item-btns clearfix">
        <span class="item-gray-btn"><router-link :to="{name: 'Item', query: {itemId:item.sku_info[itemIndex].sku_id}}">查看详情</router-link> </span>
        <span @click="addCarPanelHandle(item.sku_info[itemIndex])" class="item-blue-btn">加入购物车 </span>
      </div>
      <div class="item-price clearfix">
        <i>¥</i><span>{{item.price}}</span>
      </div>
      <div class="discount-icon">false</div>
      <div class="item-cover">
        <router-link :to="{name: 'Item', query: {itemId:item.sku_info[itemIndex].sku_id}}"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        itemIndex: 0
        }
    },
    props: {
        item: {
        type: Object
        }
    },
    methods: {
        tableData (index) {
            this.itemIndex = index
        },
        addCarPanelHandle (data) {
            let itemData = {
              info: data,
              count: 1
            }
            this.$store.commit('addCarPanelData', itemData)
        }
    },
    
}
</script>

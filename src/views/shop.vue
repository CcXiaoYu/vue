<template>
	<div id="main">
		<div class="sku-box store-content">
			<div class="sort-option">
				<ul class="line clear">
					<li><a href="javascript:;" class="active">综合排序</a></li>
					<li><a href="javascript:;" class="">销量排序</a></li>
					<li><a href="javascript:;" class="">价格低到高</a></li>
					<li><a href="javascript:;" class="">价格高到低</a></li>
				</ul>
			</div>
			<div class="gray-box">
				<div class="item-box">
					<shop-item v-for="item,index in goodsList" :item="item"></shop-item>
				</div>
			</div>
		</div>
		<prompt></prompt>	
	</div>
</template>


<script>
import goodData from '@/lib/newGoodsData'
import shopItem from '@/components/shop-item'
import prompt from '@/components/prompt'


export default {
  data () {
    return {
      goodsList: goodData
    }
  },
  components: {
		shopItem,
		prompt
  },
 
}
</script>

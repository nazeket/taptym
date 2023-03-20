<template>
  <div>
    <div class="d-flex align-center">
      <the-text-input bindKey="term" class="mr-4 flex-shrink-1 flex-grow-1"
                      placeholder="Search..."/>
      <the-button :loading="store.state['isLoading']" class="searchBtn" name="Search" @click.prevent="searchProduct"/>

    </div>
    <div  v-for="product in products" class="vip__block d-block pt-4 px-4 pb-4 mb-4">
      <vip-block
          :product="product"/>
    </div>
<!--    <content-skeleton v-if="!productList.length && store.state.loaders.isContentLoading"/>-->
<!--    <no-content v-if="!productList.length && !store.state.loaders.isContentLoading" iconName="no-statement-icon" text="У вас пока нет заявок"/>-->
  </div>
</template>

<script setup>
import TheTextInput from "@/components/form/TheTextInput.vue";
import TheButton from "@/components/form/TheButton.vue";
import VipBlock from "@/components/VipBlock.vue";
import NoContent from "@/components/NoContent.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {provide, reactive, ref, watch} from "vue";
import ContentSkeleton from "@/components/skeleton/ContentSkeleton.vue";
provide('formName', 'search')
const route = useRoute()
const store = useStore()
let productList = reactive([])
watch(() => route.name,
    (value) => {
      if (value !== 'favoriteCategory') {
        productList = store.state[route.params.tradeType][value]
      } else {
        productList = store.state.buy[route.params.category]
      }
    },
    {deep: true, immediate: true})
const products = ref([])
const fetchProductList = async()=>{
  products.value = await store.dispatch('fetchProductList')
}
fetchProductList()
const searchProduct = async()=>{
  products.value = await store.dispatch('searchProduct')
}
</script>


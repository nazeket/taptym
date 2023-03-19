<template>
  <div v-if="product && product.id">
    <div class="product__page page position-relative">
      <div class="fixed__tools position-absolute d-flex align-center justify-space-between">
        <icon class="ml-4" name="return-back-bg" @click.prevent="$router.go(-1)"/>
        <icon v-if="tradeType === 'sell'" class="mr-4" name="edit" @click="store.state.editPanel = true"/>
        <icon v-if="tradeType === 'buy'" class="mr-4" :class="{saved: hasInFavorites}" name="save-to-favorites"
              @click="saveToFavorites(product.id)"/>
      </div>
      <v-carousel
          cycle
          :show-arrows="false"
          fade
          height="267"
      >
        <v-carousel-item v-for="image in product.images" :key="image" @click.prevent="viewImage(image)">
          <img :src="'https://taptym.hikaro.space/storage/' + image" alt="">
        </v-carousel-item>
      </v-carousel>
      <div class="product__body px-4 py-4" :class="{'mt-15': !product.images.length}">
        <div class="product__title mb-2">{{ product.title }}</div>
        <div class="product__detail d-flex align-center justify-space-between mb-4">
          <div class="product__price">{{ floatNumberWithSpaces(product.price) }} ₸</div>
          <div class="product__location">{{ product.city.name }}</div>
        </div>
        <div class="product__description mb-5">
          {{ product.description }}
        </div>
        <div class="product__tags tags d-flex flex-wrap mb-7">
          <div class="tag purple">#Продам</div>
          <div class="tag">#Срочно</div>
          <div class="tag">#TayotaCamry25</div>
          <div class="tag">#Черная</div>
        </div>
        <div class="product__published__info d-flex align-center justify-space-between mb-2">
          <div class="product__author d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <img src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" alt="" class="author__image mr-4"/>
              <div class="author__name">{{ product.user.name }}</div>
            </div>
          </div>
          <div class="published__date">{{ reformatDate(product['created_at']) }}</div>
        </div>
      </div>
      <div class="more__products py-4 px-4">
        <h4 class="mb-4">Найдено <span>4</span></h4>
        <vip-block
            v-if="moreProducts.length"
            v-for="item in moreProducts"
            :key="item.id"
            :product="item"
        >
          <template #default>
            <div class="product__author d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <img src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" alt=""
                     class="author__image mr-4"/>
                <div class="author__name">Kanagat Zhumagaliev</div>
              </div>
            </div>
            <div class="published__date">21 декабря 2000 г.</div>
          </template>
        </vip-block>
      </div>
    </div>
    <statement mode="edit" panel-name="editPanel"/>
    <v-dialog
        v-model="openModal"
        class="image__preview"
    >
      <div class="d-flex flex-column fill-height">
        <div class="d-flex align-center justify-space-between mb-14 pb-8">
          <icon name="return-back" @click="openModal = false"/>
          <icon name="favorites"/>
        </div>
        <v-carousel
            :show-arrows="false"
            height="267"
            fade
            class="flex-grow-1 flex-shrink-1"
        >
          <v-carousel-item v-for="image in product.images" :key="image" @click.prevent="viewImage(image)">
            <img :src="'https://taptym.hikaro.space/storage/' + image" alt="">
          </v-carousel-item>
        </v-carousel>
        <div class="d-flex align-center fill-width mt-8 mb-4">
          <the-button name="Написать" class="mr-4" @click="store.dispatch('startChat', route.params.id)"/>
          <the-button name="Позвонить" class="reverse__style"/>
        </div>
      </div>
    </v-dialog>
  </div>
  <content-detail-skeleton v-else/>
</template>

<script setup>
import Icon from "@/components/icon.vue";
import VipBlock from "@/components/VipBlock.vue";
import {computed, inject, onMounted, provide, ref, watch} from "vue";
import Statement from "@/pages/common/statement.vue";
import {useStore} from "vuex";
import {reformatDate} from '@/utils/helpers.js'
import {useRoute, useRouter} from "vue-router";
import TheButton from "@/components/form/TheButton.vue";
import {floatNumberWithSpaces} from '@/utils/helpers.js'
import ContentDetailSkeleton from "@/components/skeleton/ContentDetailSkeleton.vue";

provide('tradeType', 'sale')
const store = useStore()
const route = useRoute()
const router = useRouter()
const tradeType = computed(() => route.params.tradeType)
const category = route.params.category
const product = ref({})
onMounted(async () => {
  product.value = await store.dispatch('getAnnouncementById', route.params.id)
})
const saveToFavorites = async (id) => {
  await store.dispatch('addToFavorites', id)
  await store.dispatch('getFavorites')
}
const openModal = ref(false)
const currentImage = ref(null)
const viewImage = image => {
  currentImage.value = image
  openModal.value = true
}
const hasInFavorites = computed(() => store.state.favorites[category].find(item => item.id == route.params.id))
const moreProducts = []
watch(() => store.state.editPanel,
    (value) => {
      if (value === true) {
        store.state.Statement.description = product.value['description']
        store.state.Statement.city = product.value['city']['name']
        store.state.Statement.title = product.value['title']
        store.state.Statement.images = product.value['images']
        store.state.Statement.price = product.value['price']
        store.state.Statement.category = product.value['category']['name']
        store.state.Statement.tradeType = store.state.tradeType.find((trade) => trade.type === product.value.type).name
      }
    })
</script>
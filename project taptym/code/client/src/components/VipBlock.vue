<template>
  <div class="block__image">
    <img src="https://cdn.pixabay.com/photo/2020/06/27/13/20/hamburg-5345897_1280.jpg" alt="">
  </div>
  <div class="block__title pb-2 pt-4">
    {{ product.title }}
  </div>
  <div class="block__content__tags tags d-flex align-center flex-wrap">
<!--    <div v-for="tag in product.tags" :key="tag.title" :class="tag.class ? `tag ${tag.class}`: 'tag'">#{{-->
<!--        tag.title-->
<!--      }}-->
<!--    </div>-->
  </div>
  <div class="d-flex align-center justify-space-between pt-5">
    <slot>
      <div class="block__content__count">
        Description: <span>{{product.description}}</span>
      </div>
      <div class="block__content__date">
<!--        {{ reformatDate(product['created_at']) }}.-->
      </div>
    </slot>
  </div>
</template>

<script setup>
// import {reformatDate} from '@/utils/helpers.js'

const {product} = defineProps({
  product: {
    type: Object, default: null
  },
})
</script>
<script>
import DetailMenu from './DetailMenu.vue';

export default {
  name: 'DetailImage',
  props: {
    imgUrl: String,
    alt: String,
    isBookmarked: Boolean
  },
  components: {
    DetailMenu
  },
  emits: ['clickedRemoveBookmark', 'clickedAddBookmark', 'generateQR']
}
</script>

<template>

  <div class="detail-image">
    
    <img :src="imgUrl" :alt="alt" />

    <DetailMenu :isBookmarked="isBookmarked" />

  </div>  

</template>

<style scoped>
.detail-image > img {
  width: 100%;
  max-width: fit-content;
  min-height: fit-content;
  border-radius: 20px;
  box-shadow: 0px 8px 10px var(--txt-color);
}
.detail-image {
  display: flex;
  justify-content: center;
}
</style>
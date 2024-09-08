<script>
import { mapState, mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'DetailImage',
  props: {
    isBookmarked: Boolean
  },
  computed: {
    ...mapState(useSiteVarStore, ['isLoggedIn']),
  }
}
</script>

<template>

  <div class="ui inverted menu detail-hover-bar">

    <a class="item" v-if="isLoggedIn">

      <div v-if="isBookmarked" @click.prevent="this.$parent.$emit('clickedRemoveBookmark')">
        <i class="large link icons">
          <i class="bookmark icon"></i>
          <i class="corner minus icon"></i>
        </i>
        <span>Remove Bookmark</span>
      </div>

      <div v-else @click.prevent="this.$parent.$emit('clickedAddBookmark')">
        <i class="large link icons">
          <i class="bookmark outline icon"></i>
          <i class="corner add icon"></i>
        </i>
        <span>Add Bookmark</span>
      </div>

    </a>

    <!-- <a class="item" @click="this.$parent.$emit('generateQR')">
      <span class="material-icons-outlined">
        qr_code_2
      </span>
      <span>Share QR Link</span>
    </a> -->

  </div> 

</template>

<style scoped>
/* .detail-image:hover ~ .detail-hover-bar {
  visibility: visible;
} */
.detail-hover-bar {
  position: absolute;
  left: 50%;
  bottom: 0px;
  translate: -50%;
  opacity: 0.7;
  border-bottom: none;
  width: 100%;
  /* visibility: hidden; */
  /* background-color: var(--txt-color) !important; */
}
.detail-hover-bar * {
  color: white !important;
}
.item i.icons ~ span, .item .material-icons-outlined ~ span {
  margin-left: 5px !important;
}
</style>
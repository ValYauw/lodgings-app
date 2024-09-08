<script>
import { mapState, mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

import AddBookmarkIcon from './AddBookmarkIcon.vue';
import RemoveBookmarkIcon from './RemoveBookmarkIcon.vue';

export default {
  name: 'Card',
  props: {
    id: Number,
    name: String,
    facility: String,
    roomCapacity: Number,
    imgUrl: String,
    location: String,
    price: Number,
    isBookmarked: [Boolean, undefined],
    User: Object,
    Type: Object
  },
  components: {
    AddBookmarkIcon,
    RemoveBookmarkIcon
  },
  computed: {
    ...mapState(useSiteVarStore, ['isLoggedIn']),
    // priceAsText() {
    //   let str = '';
    //   let num;
    //   const numDigits = Math.floor(Math.log10(this.price)) + 1;
    //   console.log(this.price, numDigits);
    //   if (numDigits > 6) {
    //     num = Math.round((this.price / 1000000) * 100) / 100
    //     str = `Rp. ${num}jt`
    //   } else if (numDigits > 3) {
    //     num = Math.round((this.price / 1000) * 100) / 100
    //     str = `Rp. ${num}rb`
    //   } else {
    //     str = `Rp. ${price}`;
    //   }
    //   return str;
    // },
    priceAsText() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumSignificantDigits: 3
      }).format(this.price);
    }
  },
  emits: ['addedBookmark', 'removedBookmark'],
  methods: {
    ...mapActions(useSiteVarStore, ['addBookmark', 'removeBookmark']),
    handleAddBookmark() {
      this.addBookmark(this.id);
      this.$emit('addedBookmark');
    },
    handleRemoveBookmark() {
      this.removeBookmark(this.id);
      this.$emit('removedBookmark');
    },
  }
}
</script>

<template>

  <div class="card">

    <div class="card-image">
      <img :src="imgUrl">
    </div>

    <div class="content">
      <div class="header">
        <RouterLink :to="{ name: 'lodging', params: { id }}">
          {{ name }}
        </RouterLink>
      </div>
      <div class="meta">
        <a>
          <i class="dollar icon"></i>
          {{ priceAsText }}
        </a>
        <a>
          <span class="material-icons-outlined">groups</span>
          {{ roomCapacity }} people
        </a>
      </div>
      <div class="meta">
        <a>
          <i class="map marker alternate icon"></i>
          {{ location }}
        </a>
      </div>
      <div class="description">
        <p>{{ facility }}</p>
      </div>
    </div>

    <div class="extra content">

      <span v-if="isLoggedIn">
        <RemoveBookmarkIcon @clicked-remove="handleRemoveBookmark" v-if="isBookmarked" />
        <AddBookmarkIcon @clicked-add="handleAddBookmark" v-else />
      </span>

      <span class="right floated">
        <i>{{ Type.name }}</i>
      </span>
      
    </div>

  </div>

</template>
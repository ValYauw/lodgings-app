<script>
import Card from '../components/composables/Card.vue';
import PaginationMenu from '../components/composables/PaginationMenu.vue';

import { mapState, mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'BookmarkView',
  components: {
    Card,
    PaginationMenu
  },
  data() {
    return {
      currentPage: 1,
      toggledBookmarks: {}
    }
  },
  computed: {
    ...mapState(useSiteVarStore, ['bookmarks', 'isLoggedIn']),
    loadedLodgings() {
      if (this.currentPage === 0 || !this.bookmarks.total) return [];
      return this.bookmarks.data.slice((this.currentPage - 1) * 20, (this.currentPage) * 20);
    },
    totalPages() {
      return Math.ceil(this.bookmarks.total / 20);
    }
  },
  methods: {
    ...mapActions(useSiteVarStore, ['fetchBookmarks', 'fetchBookmarksNext']),
  },
  watch: {
    isLoggedIn(newValue, oldValue) {
      if (!newValue) {
        this.$router.push('/');
      }
    },
    currentPage(newValue, oldValue) {
      if ((newValue > oldValue) && (oldValue * 20 === this.bookmarks.fetched)) {
        this.fetchBookmarksNext();
      }
    }
  },
  created() {
    this.fetchBookmarks();
    this.currentPage = 1;
  }
}
</script>

<template>

<section>

  <h1>Your Bookmarks</h1>

  <div class="notify" v-if="loadedLodgings.length === 0">
    <h3>No bookmarks added.</h3>
  </div>

  <div class="ui cards">
    <Card 
      v-for="lodging in loadedLodgings" 
      v-bind="{
        ...lodging, 
        isBookmarked: toggledBookmarks[lodging.id] === undefined ? true : toggledBookmarks[lodging.id]
      }" 
      :key="lodging.id" 
      @added-bookmark="toggledBookmarks[lodging.id] = true"
      @removed-bookmark="toggledBookmarks[lodging.id] = false"
    />
  </div>

  <PaginationMenu 
    v-bind="{currentPage, totalPages}" 
    v-if="bookmarks.total" 
    @navigate-prev-page="currentPage--"
    @navigate-next-page="currentPage++"
  />

</section>

</template>

<style scoped>
.ui.cards {
  margin-left: auto !important;
  margin-right: auto !important;
}
.ui.accordion {
  background-color: var(--bg-color-1);
  border: solid 1px var(--txt-color);
  border-radius: 15px;
  padding: 20px 20px;
  margin-bottom: 40px;
  box-shadow: 0px 4px 15px var(--bg-color-1);
}

.notify {
  text-align: center;
}
</style>
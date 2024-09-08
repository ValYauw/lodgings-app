<script>
import Card from '../components/composables/Card.vue';
import Search from '../components/composables/Search.vue';
import PaginationMenu from '../components/composables/PaginationMenu.vue';

import { mapState, mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'LodgingsView',
  components: {
    Card,
    Search,
    PaginationMenu
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useSiteVarStore, ['lodgings', 'isLoggedIn']),
    loadedLodgings() {
      if (this.currentPage === 0 || !this.lodgings.total) return [];
      return this.lodgings.data.slice((this.currentPage - 1) * 6, (this.currentPage) * 6);
    },
    totalPages() {
      return Math.ceil(this.lodgings.total / 6);
    }
  },
  methods: {
    ...mapActions(useSiteVarStore, ['fetchLodgings', 'fetchLodgingsNext']),
    search(search, maxPrice, minRoomCapacity, roomType, status) {
      this.fetchLodgings(search, maxPrice, minRoomCapacity, roomType, status);
    }
  },
  watch: {
    isLoggedIn(newValue, oldValue) {
      // console.log("Re-fetching");
      this.fetchLodgings();
      this.currentPage = 1;
    },
    currentPage(newValue, oldValue) {
      if ((newValue > oldValue) && (oldValue * 6 === this.lodgings.fetched)) {
        this.fetchLodgingsNext();
      }
    }
  },
  created() {
    this.fetchLodgings();
    this.currentPage = 1;
  }
}
</script>

<template>

<section>

  <h1>Browse Our Lodgings</h1>

  <div 
    class="ui accordion"
  >
    <div class="active title">
      <i class="dropdown icon"></i>
      Search & filter
    </div>
    <div class="active content">
      <Search @submit="search" />
    </div>
  </div>

  <div class="notify" v-if="loadedLodgings.length === 0">
    <h3>Sorry, we could not find those lodgings.</h3>
    <span>Please try again.</span>
  </div>

  <div class="ui cards">
    <Card v-for="lodging in loadedLodgings" v-bind="lodging" />
  </div>

  <PaginationMenu 
    v-bind="{currentPage, totalPages}" 
    v-if="lodgings.total" 
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
.notify > h3 {
  font-weight: bold;
}
</style>
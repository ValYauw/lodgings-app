<script>
import Card from '../components/composables/Card.vue';

import { mapState, mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'HomeView',
  components: {
    Card
  },
  computed: {
    ...mapState(useSiteVarStore, ['recentlyAdded']),
  },
  methods: {
    ...mapActions(useSiteVarStore, ['fetchRecentlyAdded'])
  },
  created() {
    if (!this.recentlyAdded.length) {
      this.fetchRecentlyAdded();
    }
  }
}
</script>

<template>

<div class="image-container">
  <img src="../assets/header.png">
</div>

<section>  

  <h1 class="brand">Welcome to AeroBnB Lodgings~</h1>

  <h3 class="brand">Find your home away from home~</h3>

  <h2 class="ui dividing header">Recently added lodgings</h2>

  <div class="ui cards">
    <Card v-for="lodging in recentlyAdded" v-bind="lodging" />
  </div>

</section>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
.ui.cards {
  margin-left: auto !important;
  margin-right: auto !important;
}
.image-container, .image-container > img {
  width: 100vw;
  max-height: fit-content;
}
.image-container > h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.brand {
  font-family: 'Parisienne', 'Garamond', sans-serif;
  text-align: center;
}
h1.brand {
  font-size: 60px;
}
h3.brand{
  font-size: 32px;
}
</style>
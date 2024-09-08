<script>
import { RouterView } from 'vue-router';
import { mapWritableState } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapWritableState(useSiteVarStore, ['isLoggedIn']),
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.isLoggedIn = true;
    }
  }
}
</script>

<template>

  <Navbar />

  <RouterView />

</template>

<style>
</style>
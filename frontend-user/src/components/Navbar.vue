<script>
import { mapState, mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'Navbar',
  computed: {
    ...mapState(useSiteVarStore, ['isLoggedIn']),
    currentPage() {
      return this.$route.name;
    }
  },
  methods: {
    ...mapActions(useSiteVarStore, ['logout'])
  },
}
</script>

<template>
  <nav>

    <div class="ui menu">

      <div class="header item">
        <RouterLink to="/">AeroBnB Lodgings</RouterLink>
      </div>

      <a class="item">
        <RouterLink to="/lodgings">Browse Lodgings</RouterLink>
      </a>

      <a class="item" v-if="isLoggedIn">
        <RouterLink to="/bookmarks">My Bookmarks</RouterLink>
      </a>

      <div class="right menu">
    
        <a class="item" v-if="!isLoggedIn">
          <RouterLink to="/login">Login</RouterLink>
        </a>

        <a class="item" v-if="!isLoggedIn">
          <RouterLink to="/register">Sign Up</RouterLink>
        </a>

        <a class="right item" v-if="isLoggedIn" @click="logout">
          Logout
        </a>

      </div>

    </div>

    </nav>
  
</template>

<style>
nav {
  box-shadow: #53003884 0px 5px 10px;
  position: sticky;
  top: 0px;
  z-index: 9999;
}
nav > div {
  background-color: var(--txt-color) !important;
  border-radius: 0px !important;
}
nav a {
  color: var(--fg-color-1) !important;
}
nav .item {
  border-radius: 0px !important;
}
nav .active.item {
  background-color: var(--bg-color-2) !important;
}
nav .active.item > a {
  color: var(--txt-color) !important;
}
nav .item:hover {
  background-color: var(--bg-color-2) !important;
}
nav .item:hover, nav .item:hover > a {
  color: var(--txt-color) !important;
}
</style>
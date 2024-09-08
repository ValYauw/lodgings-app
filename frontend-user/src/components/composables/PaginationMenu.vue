<script>
export default {
  name: 'PaginationMenu',
  props: {
    currentPage: Number,
    totalPages: Number
  },
  emits: ['navigatePrevPage', 'navigateNextPage'],
  methods: {
    navigatePrevPage() {
      if (this.currentPage > 1) this.$emit('navigatePrevPage');
    },
    navigateNextPage() {
      if (this.currentPage < this.totalPages) this.$emit('navigateNextPage');
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="ui pagination menu">
      <a 
        class="item page-menu" 
        :class="currentPage === 1 ? 'disabled' : null"
        @click="navigatePrevPage"
      >
        &lt;&lt; Previous Page
      </a>
      <a class="item">
        {{ currentPage }}
      </a>
      <a 
        class="item page-menu right" 
        :class="currentPage === totalPages ? 'disabled' : null"
        @click="navigateNextPage"
      >
        Next Page &gt;&gt; 
      </a>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 30px;
}
.page-menu {
  width: 150px;
}
.right {
  text-align: right !important;
}
</style>
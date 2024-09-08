<script>
export default {
  name: 'StatusIcon',
  props: {
    status: String
  },
  computed: {
    statusMaterialIconSymbol() {
      switch (this.status) {
        case 'Active':
          return 'check_circle'
        case 'Inactive':
          return 'cancel'
        case 'Archived':
          return 'inventory_2'
      }
      return '';
    }
  }
}
</script>

<template>
  <span class="material-icons-outlined">
    {{ statusMaterialIconSymbol }}
  </span>
</template>
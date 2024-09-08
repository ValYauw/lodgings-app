<script>
export default {
  name: 'StatusButton',
  props: {
    status: String
  },
  computed: {
    buttonClass() {
      switch (this.status) {
        case 'Active':
          return 'green'
        case 'Inactive':
          return 'red'
        case 'Archived':
          return 'black'
      }
      return '';
    }
  }
}
</script>

<template>
  <div class="ui label" :class="buttonClass">
    {{ status }}
  </div>
</template>
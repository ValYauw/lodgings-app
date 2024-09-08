<script>
export default {
  name: "EditEntityButton",
  props: {
    entity: String
  },
  emits: ['click']
}
</script>

<template>
  <span 
    class="material-icons-outlined button" 
    :title="`Edit ${entity}`"
    @click="this.$emit('click')"
  >
    edit
  </span>
</template>
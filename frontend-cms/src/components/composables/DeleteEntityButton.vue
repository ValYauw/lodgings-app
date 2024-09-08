<script>
export default {
  name: "DeleteEntityButton",
  props: {
    entity: String
  },
  emits: ['click']
}
</script>

<template>
  <span 
    class="material-icons-outlined button" 
    :title="`Delete ${entity}`"
    @click="this.$emit('click')"
  >
    delete
  </span>
</template>
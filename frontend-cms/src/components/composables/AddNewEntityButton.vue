<script>
export default {
  name: "AddNewEntityButton",
  props: {
    entity: String
  },
  emits: ['clickButton']
}
</script>

<template>
  <div class="right">
    <button class="ui button main" @click="this.$emit('clickButton')">
      <i class="plus icon"></i>New {{ entity }}
    </button>
  </div>
</template>
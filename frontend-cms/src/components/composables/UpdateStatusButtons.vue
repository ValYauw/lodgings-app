<script>
export default {
  name: "UpdateStatusEntityButton",
  props: {
    status: String
  },
  emits: ['makeActive', 'makeInactive', 'makeArchived']
}
</script>

<template>

  <i 
    class="material-icons-outlined button status-active-toggle"
    v-if="status !== 'Active'"
    :title="'Set status to \'Active\''"
    @click="this.$emit('makeActive')"
  >
    check_circle
  </i>

  <i 
    class="material-icons-outlined button status-inactive-toggle"
    v-if="status !== 'Inactive'"
    :title="'Set status to \'Inactive\''"
    @click="this.$emit('makeInactive')"
  >
    cancel
  </i>

  <i 
    class="material-icons-outlined button status-archived-toggle"
    v-if="status !== 'Archived'"
    :title="'Set status to \'Archived\''"
    @click="this.$emit('makeArchived')"
  >
    inventory_2
  </i>

</template>
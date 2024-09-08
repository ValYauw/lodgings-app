<script>
export default {
  name: "FormSubmitCancelButton",
  emits: ['cancelButton']
}
</script>

<template>

  <div class="buttons right">
    <button 
      class="ui secondary button" 
      @click.prevent="this.$emit('cancelButton')"
    >
      Cancel
    </button>
    <button 
      class="ui primary button" 
      type="submit"
    >
      Submit
    </button>
  </div>

</template>
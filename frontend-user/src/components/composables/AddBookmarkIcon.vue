<script>
export default {
  emits: ['clickedAdd']
}
</script>

<template>
  <div @click.prevent="$emit('clickedAdd')">
    <i class="large link icons">
      <i class="bookmark outline icon"></i>
      <i class="corner add icon"></i>
    </i>
  </div>
</template>
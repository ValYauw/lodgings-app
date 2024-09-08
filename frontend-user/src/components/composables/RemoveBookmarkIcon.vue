<script>
export default {
  emits: ['clickedRemove']
}
</script>

<template>
  <div @click.prevent="$emit('clickedRemove')">
    <i class="large link icons">
      <i class="bookmark icon"></i>
      <i class="corner minus icon"></i>
    </i>
  </div>
</template>